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
import validateLink from './validate.js';

const mdLinks = (route, options) => new Promise((resolve, reject) => {
  if (!fs.existsSync(route)) {
    reject(Error('La ruta no existe'));
    console.log(chalk.inverse.magenta('La ruta existe'));
    return;
  }
  const absolutePath = convertToAbsolutePath(route);
  const mdFileArray = arrayFile(absolutePath);
  const isMdFile = mdFile(absolutePath);
  const isDir = directory(absolutePath);
  let linksMds = [];
  let mdFiles = []; // Declara la variable fuera del bloque if.
  if (!isMdFile && !isDir) {
    reject(Error('No es un archivo .md ni un directorio'));
    console.log(chalk.inverse.magenta('No es directorio ni archivo'));
    return;
  }
  if (isDir) {
    console.log(chalk.inverse.magenta('Es directorio'));
    mdFiles = getMdFilesInDirectories(absolutePath); // Asigna el valor aquí.
  } else if (isMdFile) {
    mdFiles.push(absolutePath);
  }
  // Si no se encontraron archivos .md en el directorio, rechaza la promesa
  if (mdFiles.length === 0) {
    reject(Error('No hay arhivos .md'));
    console.log(chalk.inverse.magenta('No hay archivos md'));
  }
  // Verifica si mdFiles está definida antes de usarla.
  if (mdFiles && mdFiles.length > 0) {
    const contentMdFiles = readMdFiles(mdFiles);
    linksMds = getLinks(contentMdFiles, mdFiles);
  }

  if (options && options.validate) {
    // Usamos Promise.all para validar todos los links al mismo tiempo
    Promise.all(linksMds.map((singleLink) => validateLink(singleLink.url)))
      .then((validatedLinks) => {
        // Una vez que todos los links han sido validados, los resolvemos
        const formattedLinks = validatedLinks.map((validatedLink, index) => {
          const text = chalk.cyan(`Texto: ${linksMds[index].text}`);
          const url = chalk.magenta(`URL: ${linksMds[index].url}`);
          const file = chalk.blue(`Archivo: ${linksMds[index].file}`);
          const href = chalk.yellow(`Href: ${validatedLink.href}`);
          const status = chalk.greenBright(`Estado: ${validatedLink.status}`);
          const ok = chalk.cyan(`Ok: ${validatedLink.ok}`);
          return `${text}\n${url}\n${file}\n${href}\n${status}\n${ok}\n\n`;
        });
        resolve(formattedLinks);
      })
      .catch((error) => {
        // Si ocurre algún error durante la validación, lo rechazamos
        reject(error);
      });
    return;
  }
  resolve(linksMds);
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

mdLinks(noLinks, { validate: true })
  .then((rutaAbsoluta) => {
    console.log(chalk.cyan(rutaAbsoluta));
  })
  .catch((error) => {
    console.error(chalk.magenta('Error:', error));
  });

export default mdLinks;
