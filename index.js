/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import getMdFilesInDirectory from './functions.js';

const mdLinks = (route) => new Promise((resolve, reject) => {
  let absolutePath = ''; // se deja vacía para reasignarla más adelante
  if (fs.existsSync(route)) {
    // Si la ruta existe...
    // Si no es absoluta...
    if (!path.isAbsolute(route)) {
      // Convierte la ruta en absoluta reasignando a absolutePath
      absolutePath = path.resolve(route);
      console.log(chalk.inverse.magenta('#14'));
    }

    // si la ruta que se recibe es absoluta, se asigna a absolutePath
    if (path.isAbsolute(route)) {
      absolutePath = route;
    }

    if (path.isAbsolute(absolutePath)) {
      // Si la ruta es un archivo
      if (path.extname(absolutePath) === '.md') {
        // lo almacena en un array
        const mdFilesArray = [absolutePath];
        resolve(mdFilesArray);
        console.log(chalk.inverse.magenta('#13'));
      }

      // Si no es un archivo ni un directorio
      if (
        path.extname(route) !== '.md'
        && !fs.statSync(absolutePath).isDirectory()
      ) {
        reject(Error('No es un archivo .md')); // No es archivo md
        console.log(chalk.inverse.magenta('#15'));
      }

      // Si es un directorio
      if (fs.statSync(absolutePath).isDirectory()) {
        console.log(chalk.inverse.magenta('#2'));
        // Obtiene los archivos .md en el directorio
        const mdFiles = getMdFilesInDirectory(absolutePath);
        console.log(chalk.inverse.magenta('#4'));

        // Si no se encontraron archivos .md en el directorio, rechaza la promesa
        if (mdFiles.length === 0) {
          reject(Error('No se encontraron archivos .md en el directorio'));
          console.log(chalk.inverse.magenta('#5'));
          return;
        }
        // Resuelve la promesa con el array de archivos .md
        resolve(mdFiles);
      }
    }
  } else {
    // Si la ruta no existe, rechaza la promesa
    reject(Error('La ruta no existe'));
    console.log(chalk.inverse.magenta('#11'));
  }
});

//  RUTAS
const rutaAbsolutaDirectorioDos = 'C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/Directorio Uno/Directorio Dos';
const directorioRutaRelativa = 'Directorio Uno';
const directorioVacio = 'Directorio Uno/Directorio Dos/Directorio Tres';
const archivoMD = 'README.md';
const archivoNoMD = 'cli.js';
const rutaAbsolutaArchivo = 'C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/README.md';
const rutaNoExiste = 'NoExiste.md';

mdLinks(rutaNoExiste)
  .then((rutaAbsoluta) => {
    console.log(chalk.inverse.cyan(rutaAbsoluta));
  })
  .catch((error) => {
    console.error(chalk.magenta.bold('Error:', error));
  });

export default mdLinks;
