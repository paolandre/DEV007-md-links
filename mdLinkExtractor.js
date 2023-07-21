/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
import fs from 'fs';

// lee los archivos .md y extrae los links
const extractLinksFromMdFiles = (mdFilesArray) => {
  // lee los archivos
  const fileContents = [];
  mdFilesArray.forEach((filePath) => {
    const readFile = fs.readFileSync(filePath);
    const fileContent = readFile.toString();
    fileContents.push(fileContent);
  });
  return fileContents;
};

export default extractLinksFromMdFiles;
