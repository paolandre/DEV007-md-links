/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
import fs from 'fs';
import chalk from 'chalk';
import {
  getMdFilesInDirectories,
  convertToAbsolutePath,
  arrayFile,
  directory,
  mdFile,
} from './fileUtils.js';
import { readMdFiles, getLinks } from './mdLinkExtractor.js';

const mdLinks = (route, options) => new Promise((resolve, reject) => {
  if (fs.existsSync(route)) {
    const absolutePath = convertToAbsolutePath(route);
    const mdFileArray = arrayFile(absolutePath);
    const isMdFile = mdFile(absolutePath);
    const isDir = directory(absolutePath);

    if (isMdFile) {
      const contentMdFile = readMdFiles(mdFileArray);
      const linksMd = getLinks(contentMdFile, mdFileArray);
      const formattedLinks = linksMd.map((link) => {
        const text = chalk.yellow(`Text: ${link.text}`);
        const url = chalk.cyan(`URL: ${link.url}`);
        const file = chalk.greenBright(`File: ${link.file}`);
        return `${text}\n${url}\n${file}\n\n`;
      });

      resolve(formattedLinks);
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
        }
        // Resuelve la promesa con el array de archivos .md
        if (mdFiles.length > 0) {
          const contentMdFiles = readMdFiles(mdFiles);
          const linksMds = getLinks(contentMdFiles, mdFiles);
          const formattedLinks = linksMds.map((link) => {
            const text = chalk.cyan(`Text: ${link.text}`);
            const url = chalk.magenta(`URL: ${link.url}`);
            const file = chalk.blue(`File: ${link.file}`);
            return `${text}\n${url}\n${file}\n\n`;
          });

          resolve(formattedLinks);
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
const directorioVacio = 'Directorio Uno/Directorio Dos/Directorio Cuatro';
const archivoMD = 'README.md';
const archivoNoMD = 'example.js';
const rutaAbsolutaArchivo = 'C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/README.md';
const rutaNoExiste = 'NoExiste.md';
const rutaUnaCarpetaConArchivo = 'Directorio Uno/Directorio Tres';
const noLinks = 'Directorio Uno/Directorio Tres/sinlinks.md';

mdLinks(noLinks)
  .then((rutaAbsoluta) => {
    console.log(chalk.cyan(rutaAbsoluta));
  })
  .catch((error) => {
    console.error(chalk.magenta('Error:', error));
  });

export default mdLinks;
