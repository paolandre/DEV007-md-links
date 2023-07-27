/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import axios from 'axios';

//  Función para obtener los archivos de un directorio
export const getMdFilesInDirectories = (directory) => {
  const filesMD = [];

  // Función recursiva para explorar los archivos y directorios dentro del  directorio
  const inCurrentDirectory = (currentDirectory) => {
    console.log(chalk.inverse.magenta('#12'));
    // Obtiene la lista de archivos en el directorio actual
    const files = fs.readdirSync(currentDirectory);
    // Itera sobre los archivos
    files.forEach((file) => {
      // Construye la ruta absoluta del archivo
      const filePath = path.join(currentDirectory, file);
      // Si es un directorio
      if (fs.statSync(filePath).isDirectory()) {
        console.log(chalk.inverse.magenta('#43'));
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
  console.log(chalk.inverse.magenta('#14'));
  return filesMD;
};

// Si la ruta es relativa, la convierte en absoluta
export const convertToAbsolutePath = (route) => {
  if (!path.isAbsolute(route)) {
    // Convierte la ruta en absoluta y la asigna a absolutePath
    const absolutePath = path.resolve(route);
    console.log(chalk.inverse.magenta('#20'));
    return absolutePath;
  }
  return route; // Si ya es una ruta absoluta, retorna la ruta sin modificar
};

// Si la ruta es un archivo, lo almacena en un array
export const arrayFile = (absolutePath) => {
  let mdFileArray = [];
  if (path.extname(absolutePath) === '.md') {
    mdFileArray = [absolutePath];
    console.log(chalk.inverse.magenta('#13'));
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
  console.log(chalk.inverse.magenta('#30'));
  return isAmdFile;
};

// Función validate
// Declaramos la función validateLink que toma un parámetro llamado 'link'
export function validateLink(link) {
  // Retornamos una nueva Promesa. Las Promesas son objetos que representan el resultado eventual
  // de una operación asíncrona. Esta Promesa recibe una función como argumento que tiene dos parámetros:
  // 'resolve' y 'reject', que son funciones que se llamarán cuando la Promesa se resuelva o rechace respectivamente.
  return new Promise((resolve, reject) => {
    // Hacemos una petición HTTP GET al 'link' usando axios. Axios es una biblioteca de JavaScript
    // que nos permite hacer peticiones HTTP fácilmente. Cuando la petición se complete, entonces se llamará
    // a la función que pasamos al método 'then'.
    axios.get(link)
      .then((response) => {
        // Cuando la petición se completa exitosamente, se llama a esta función.
        // 'response' es un objeto que contiene información sobre la respuesta HTTP,
        // incluyendo el estado (response.status).
        // Resolvemos la promesa con un objeto que contiene el 'link' (href), el estado de la respuesta HTTP
        // y un campo 'ok' que será 'ok' si el estado es HttpStatus.OK, y 'fail' en caso contrario.
        resolve({
          href: link,
          status: response.status,
          ok: response.status === 200 ? 'ok' : 'fail',
        });
      })
      .catch((error) => {
        // Si hubo algún error en la petición (como una falla de red, o si el servidor retorna un error),
        // entonces se llama a esta función. 'error' es un objeto que contiene información sobre el error.
        // Nota que resolvemos la promesa incluso en caso de error. Esto es porque aún en caso de error,
        // queremos retornar un resultado que indique el 'link', un estado 'ERROR', y 'ok' como 'fail'.
        resolve({
          href: link,
          status: error.response ? error.response.status : 'ERROR',
          ok: 'fail',
        });
      });
  });
}
