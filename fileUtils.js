import fs from 'fs';
import path from 'path';

//  Función para obtener los archivos de un directorio
export const getMdFilesInDirectories = (directory) => {
  const filesMD = [];

  // Función recursiva para explorar los archivos y directorios dentro del  directorio
  const inCurrentDirectory = (currentDirectory) => {
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
  return filesMD;
};

// Si la ruta es relativa, la convierte en absoluta
export const convertToAbsolutePath = (route) => {
  if (!path.isAbsolute(route)) {
    const absolutePath = path.resolve(route);
    return absolutePath;
  }
  return route; // Si ya es una ruta absoluta, retorna la ruta sin modificar
};

// Si la ruta es un archivo, lo almacena en un array
export const arrayFile = (absolutePath) => {
  let mdFileArray = [];
  if (path.extname(absolutePath) === '.md') {
    mdFileArray = [absolutePath];
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
  return isAmdFile;
};

// Función para truncar el texto
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};
