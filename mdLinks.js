/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
import fs from 'fs';
import chalk from 'chalk';
import pkg from 'terminal-kit';
import {
  getMdFilesInDirectories,
  convertToAbsolutePath,
  arrayFile,
  directory,
  mdFile,
} from './fileUtils.js';
import extractLinksFromMdFiles from './mdLinkExtractor.js';

const { terminal: term } = pkg; // Esto es para la tabla de colores

const mdLinks = (route) => new Promise((resolve, reject) => {
  if (fs.existsSync(route)) {
    const absolutePath = convertToAbsolutePath(route);
    const mdFileArray = arrayFile(absolutePath);
    const isMdFile = mdFile(absolutePath);
    const isDir = directory(absolutePath);

    // Si es un archivo.md, lo almacena en un array
    if (isMdFile) {
      const links = extractLinksFromMdFiles(mdFileArray);
      resolve(links);
    }

    if (absolutePath) {
      // Si no es un archivo ni un directorio
      if (!isMdFile && !isDir) {
        reject(Error('No es un archivo .md')); // No es archivo md
        console.log(chalk.inverse.magenta('#15'));
      }

      // Si es un directorio
      if (isDir) {
        console.log(chalk.inverse.magenta('#2'));
        // Obtiene los archivos .md en el directorio
        const mdFiles = getMdFilesInDirectories(absolutePath);

        // Si no se encontraron archivos .md en el directorio, rechaza la promesa
        if (mdFiles.length === 0) {
          reject(Error('No se encontraron archivos .md en el directorio'));
          console.log(chalk.inverse.magenta('#5'));
          return;
        }
        // Resuelve la promesa con el array de archivos .md
        if (mdFiles.length > 0) {
          const links = extractLinksFromMdFiles(mdFiles);
          console.log(chalk.inverse.magenta('#56'));
          resolve(links);
        }
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

mdLinks('Directorio Uno/Directorio Tres')
  .then((rutaAbsoluta) => {
    console.log(chalk.inverse.cyan(rutaAbsoluta));
  })
  .catch((error) => {
    console.error(chalk.magenta.bold('Error:', error));
  });

export default mdLinks;

// console.log(chalk.inverse.cyan(rutaAbsoluta));

/* const data = [
  ['header #1', 'header #2', 'header #3'],
  ['row #1', 'a much bigger cell, a much bigger cell, a much bigger cell... ', 'cell'],
  ['row #2', 'cell', 'a medium cell'],
  ['row #3', 'cell', 'cell'],
  ['row #4', 'cell\'Hola'],
];

const tableOptions = {
  hasBorder: true,
  contentHasMarkup: true,
  borderChars: 'lightRounded',
  borderAttr: { color: 'cyan' },
  textAttr: { bgColor: 'default' },
  firstCellTextAttr: { bgColor: 'black' },
  firstRowTextAttr: { bgColor: 'green' },
  firstColumnTextAttr: { bgColor: 'yellow' },
  width: 60,
  fit: true,
};

term.table(data, tableOptions); */
