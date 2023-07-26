/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
import fs from 'fs';

// lee los archivos .md
export const readMdFiles = (mdFilesArray) => {
  // lee los archivos
  const fileContents = [];
  mdFilesArray.forEach((filePath) => {
    const readFile = fs.readFileSync(filePath);
    const fileContent = readFile.toString();
    fileContents.push(fileContent);
  });
  return fileContents;
};

// Función para obtener los enlaces desde el contenido de los archivos
export const getLinks = (contentArray, mdFilesArray) => {
  const links = [];
  // Define la expresión regular linkRegex para buscar enlaces en el contenido del archivo.
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;

  // Itera sobre cada contenido y su correspondiente archivo
  contentArray.forEach((content, index) => {
    // Utiliza el método replace() en el contenido de cada archivo con la expresión regular linkRegex.
    content.replace(linkRegex, (fullMatch, text, url) => {
      // Crea un objeto con las propiedades text, url y file, y lo agrega al array links.
      // file contiene la ruta del archivo donde se encontró el enlace.
      links.push({ text, url, file: mdFilesArray[index] });
      // Retorna un valor vacío para que la función replace no realice ninguna sustitución.
      return '';
    });
  });

  if (links.length === 0) {
    throw new Error('No se encontraron links.');
  }
  // Retorna el array links que contiene los objetos de los enlaces encontrados en los archivos.
  return links;
};
