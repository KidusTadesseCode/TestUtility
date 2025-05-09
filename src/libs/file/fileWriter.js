"use server";
// src/lib/file/fileWriter.js
import fs from "fs";
import path from "path";

export default async function writeFile(fileName, content) {
  try {
    if (!content) throw new Error("No content provided");
    if (!fileName) throw new Error("No file name provided");
    const contentType = typeof content;
    // if the content is an object, add .json extension, if not then add .txt
    const ext = contentType === "object" ? ".json" : ".txt";
    // if the content is an object, convert it to JSON
    const fileContent =
      contentType === "object" ? JSON.stringify(content, null, 2) : content;
    const filename = `${fileName}${ext}`;
    const dir = path.join(process.cwd(), "src", "tempFiles", filename);
    if (!fs.existsSync(dir))
      fs.mkdirSync(path.dirname(dir), { recursive: true });
    fs.writeFileSync(dir, fileContent);
    console.log("dir", dir);
    return dir;
  } catch (error) {
    console.error("Error writing file:", error);
    throw error;
  }
}
