/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';

//  Función para obtener los archivos de un directorio
export const getMdFilesInDirectories = (directory) => {
  const filesMD = [];

  // Función recursiva para explorar los archivos y directorios dentro del  directorio
  const inCurrentDirectory = (currentDirectory) => {
    console.log(chalk.inverse.magenta('entra a la función recursiva'));
    // Obtiene la lista de archivos en el directorio actual
    const files = fs.readdirSync(currentDirectory);
    // Itera sobre los archivos
    files.forEach((file) => {
      // Construye la ruta absoluta del archivo
      const filePath = path.join(currentDirectory, file);
      // Si es un directorio
      if (fs.statSync(filePath).isDirectory()) {
        // se llama recursivamente a la función inDirectory
        inCurrentDirectory(filePath);
      } else if (path.extname(file) === '.md') {
        // Si es un archivo .md, se agrega al array
        filesMD.push(filePath);
      }
      return filesMD;
    });
  };

  // Llamada inicial a la función inDirectory
  inCurrentDirectory(directory);
  console.log(chalk.inverse.magenta('Llama a la función recursiva'));
  return filesMD;
};

// Si la ruta es relativa, la convierte en absoluta
export const convertToAbsolutePath = (route) => {
  if (!path.isAbsolute(route)) {
    // Convierte la ruta en absoluta y la asigna a absolutePath
    const absolutePath = path.resolve(route);
    console.log(chalk.inverse.magenta('Convierte a ruta absoluta'));
    return absolutePath;
  }
  return route; // Si ya es una ruta absoluta, retorna la ruta sin modificar
};

// Si la ruta es un archivo, lo almacena en un array
export const arrayFile = (absolutePath) => {
  let mdFileArray = [];
  if (path.extname(absolutePath) === '.md') {
    mdFileArray = [absolutePath];
    console.log(chalk.inverse.magenta('Almacena el archivo en un array'));
  }
  return (mdFileArray);
};

// Verifica si es un directorio
export const directory = (absolutePath) => {
  const isAdirectory = fs.statSync(absolutePath).isDirectory();
  return isAdirectory;
};

// Verificar si es un archivo .md
export const mdFile = (absolutePath) => {
  const isAmdFile = path.extname(absolutePath) === '.md';
  console.log(chalk.inverse.magenta('Es un archivo md'));
  return isAmdFile;
};
