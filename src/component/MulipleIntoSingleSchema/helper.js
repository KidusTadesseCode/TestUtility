export const parsePrismaFiles = (files) => {
  return new Promise((resolve, reject) => {
    const mergedContent = [];
    let processedFiles = 0;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        const cleanedContent = removeComments(content);
        mergedContent.push(cleanedContent);

        processedFiles += 1;
        if (processedFiles === files.length) {
          resolve(mergedContent.join("\n"));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  });
};

const removeComments = (content) => {
  return (
    content
      .split("\n")
      // .map((line) => line.trim())
      .filter((line) => !line.trim().startsWith("//"))
      .join("\n")
  );
};
