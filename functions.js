/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';

//  Función para obtener los archivos de un directorio
const getMdFilesInDirectory = (directory) => {
  const filesMD = [];

  // Función recursiva para explorar los archivos y directorios
  const inDirectory = (currentDirectory) => {
    console.log(chalk.inverse.magenta('#12'));
    // Obtiene la lista de archivos en el directorio actual
    const files = fs.readdirSync(currentDirectory);
    // Itera sobre los archivos
    files.forEach((file) => {
      // Construye la ruta absoluta del archivo
      const filePath = path.join(currentDirectory, file);
      // Si es un directorio
      if (fs.statSync(filePath).isDirectory()) {
        console.log(chalk.inverse.magenta('#13'));
        // se llama recursivamente a la función inDirectory
        inDirectory(filePath);
      } else if (path.extname(file) === '.md') {
        // Si es un archivo .md, se agrega al array
        filesMD.push(filePath);
      }
    });
  };

  // Llamada inicial a la función inDirectory
  inDirectory(directory);
  console.log(chalk.inverse.magenta('#14'));
  return filesMD;
};

export default getMdFilesInDirectory;
