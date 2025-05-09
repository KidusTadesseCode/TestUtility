/**
 * Helper functions for parsing and merging Prisma schema files
 */

/**
 * Reads the content of multiple Prisma schema files and merges them into a single schema
 * @param {File[]} files - Array of File objects with .prisma extension
 * @returns {Promise<string>} - Merged Prisma schema content
 */
export const parsePrismaFiles = async (files) => {
  try {
    // Read all files content as text
    const fileContents = await Promise.all(
      files.map((file) => readFileAsText(file))
    );

    // Parse each schema into sections
    const schemaDetails = fileContents.map((content, index) => ({
      fileName: files[index].name,
      sections: parseSchemaContent(content),
    }));

    // Merge schema sections
    const mergedSchema = mergeSchemas(schemaDetails);

    return mergedSchema;
  } catch (error) {
    console.error("Error parsing Prisma files:", error);
    throw new Error(`Failed to parse Prisma files: ${error.message}`);
  }
};

/**
 * Reads a file as text using FileReader
 * @param {File} file - File object to read
 * @returns {Promise<string>} - File content as text
 */
const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

/**
 * Parse schema content into categorized sections
 * @param {string} content - Prisma schema content
 * @returns {Object} - Object containing categorized schema sections
 */
const parseSchemaContent = (content) => {
  // Initialize section containers
  const sections = {
    generators: [],
    datasources: [],
    models: [],
    enums: [],
    types: [],
    comments: [],
    other: [],
  };

  // Current parsing state
  let currentBlock = null;
  let blockContent = [];
  let blockType = null;

  // Process each line
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip empty lines at the beginning
    if (!currentBlock && line.trim() === "") continue;

    // Handle comments
    if (line.trim().startsWith("//")) {
      if (currentBlock) {
        blockContent.push(line);
      } else {
        sections.comments.push(line);
      }
      continue;
    }

    // Check for block start
    if (!currentBlock) {
      if (line.trim().startsWith("generator ")) {
        currentBlock = "generator";
        blockType = "generators";
        blockContent = [line];
      } else if (line.trim().startsWith("datasource ")) {
        currentBlock = "datasource";
        blockType = "datasources";
        blockContent = [line];
      } else if (line.trim().startsWith("model ")) {
        currentBlock = "model";
        blockType = "models";
        blockContent = [line];
      } else if (line.trim().startsWith("enum ")) {
        currentBlock = "enum";
        blockType = "enums";
        blockContent = [line];
      } else if (line.trim().startsWith("type ")) {
        currentBlock = "type";
        blockType = "types";
        blockContent = [line];
      } else if (line.trim() !== "") {
        sections.other.push(line);
      }
    } else {
      // Add content to current block
      blockContent.push(line);

      // Check for block end (closing brace)
      if (line.trim() === "}") {
        sections[blockType].push(blockContent.join("\n"));
        currentBlock = null;
        blockContent = [];
        blockType = null;
      }
    }
  }

  // Handle any remaining block
  if (currentBlock && blockContent.length > 0) {
    sections[blockType].push(blockContent.join("\n"));
  }

  return sections;
};

/**
 * Merge multiple schema details into a single schema
 * @param {Array<Object>} schemaDetails - Array of schema details objects
 * @returns {string} - Merged schema content
 */
const mergeSchemas = (schemaDetails) => {
  // Initialize containers for merged sections
  const mergedSections = {
    generators: {},
    datasources: {},
    models: {},
    enums: {},
    types: {},
    comments: new Set(),
    other: new Set(),
  };

  // Process each schema
  schemaDetails.forEach(({ fileName, sections }) => {
    // Process generators
    sections.generators.forEach((generator) => {
      const generatorName = extractName(generator, "generator");
      if (!mergedSections.generators[generatorName]) {
        mergedSections.generators[generatorName] = generator;
      }
    });

    // Process datasources
    sections.datasources.forEach((datasource) => {
      const datasourceName = extractName(datasource, "datasource");
      if (!mergedSections.datasources[datasourceName]) {
        mergedSections.datasources[datasourceName] = datasource;
      }
    });

    // Process models
    sections.models.forEach((model) => {
      const modelName = extractName(model, "model");
      if (!mergedSections.models[modelName]) {
        mergedSections.models[modelName] = model;
      } else {
        // If model exists, we might want to merge their fields instead of replacing
        // This would be a more complex implementation
        console.warn(
          `Duplicate model found: ${modelName} in ${fileName}. Using the first definition.`
        );
      }
    });

    // Process enums
    sections.enums.forEach((enumDef) => {
      const enumName = extractName(enumDef, "enum");
      if (!mergedSections.enums[enumName]) {
        mergedSections.enums[enumName] = enumDef;
      } else {
        console.warn(
          `Duplicate enum found: ${enumName} in ${fileName}. Using the first definition.`
        );
      }
    });

    // Process types
    sections.types.forEach((typeDef) => {
      const typeName = extractName(typeDef, "type");
      if (!mergedSections.types[typeName]) {
        mergedSections.types[typeName] = typeDef;
      } else {
        console.warn(
          `Duplicate type found: ${typeName} in ${fileName}. Using the first definition.`
        );
      }
    });

    // Process comments and other sections
    sections.comments.forEach((comment) => {
      mergedSections.comments.add(comment);
    });

    sections.other.forEach((other) => {
      mergedSections.other.add(other);
    });
  });

  // Build the final merged schema
  let mergedSchema = "";

  // Add comments at the top
  if (mergedSections.comments.size > 0) {
    mergedSchema += Array.from(mergedSections.comments).join("\n") + "\n\n";
  }

  // Add generators
  if (Object.keys(mergedSections.generators).length > 0) {
    mergedSchema +=
      Object.values(mergedSections.generators).join("\n\n") + "\n\n";
  }

  // Add datasources
  if (Object.keys(mergedSections.datasources).length > 0) {
    mergedSchema +=
      Object.values(mergedSections.datasources).join("\n\n") + "\n\n";
  }

  // Add other content
  if (mergedSections.other.size > 0) {
    mergedSchema += Array.from(mergedSections.other).join("\n") + "\n\n";
  }

  // Add enums
  if (Object.keys(mergedSections.enums).length > 0) {
    mergedSchema += Object.values(mergedSections.enums).join("\n\n") + "\n\n";
  }

  // Add types
  if (Object.keys(mergedSections.types).length > 0) {
    mergedSchema += Object.values(mergedSections.types).join("\n\n") + "\n\n";
  }

  // Add models (these usually come last in Prisma schemas)
  if (Object.keys(mergedSections.models).length > 0) {
    mergedSchema += Object.values(mergedSections.models).join("\n\n") + "\n\n";
  }

  return mergedSchema.trim();
};

/**
 * Extract the name from a schema block definition
 * @param {string} blockContent - Content of the schema block
 * @param {string} blockType - Type of block (model, enum, etc.)
 * @returns {string} - Extracted name
 */
const extractName = (blockContent, blockType) => {
  const firstLine = blockContent.split("\n")[0].trim();
  const regex = new RegExp(`^${blockType}\\s+([\\w]+)`);
  const match = firstLine.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return `unknown_${blockType}_${Math.random().toString(36).substring(2, 10)}`;
};
