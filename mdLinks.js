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
import calculateStats from './stats.js';

const mdLinks = (route, options) => new Promise((resolve, reject) => {
  if (!fs.existsSync(route)) {
    console.log(chalk.inverse.magenta('La ruta no existe'));
    reject(new Error('La ruta no existe'));
  }

  const absolutePath = convertToAbsolutePath(route);
  const isMdFile = mdFile(absolutePath);
  const isDir = directory(absolutePath);
  let linksMds = [];
  let mdFiles = [];

  if (!isMdFile && !isDir) {
    console.log(chalk.inverse.magenta('No es directorio ni archivo'));
    reject(new Error('No es un archivo .md ni un directorio'));
  }

  if (isDir) {
    console.log(chalk.inverse.magenta('Es directorio'));
    mdFiles = getMdFilesInDirectories(absolutePath);
  } else if (isMdFile) {
    mdFiles.push(absolutePath);
  }

  if (mdFiles.length === 0) {
    console.log(chalk.inverse.magenta('No hay archivos md'));
    reject(new Error('No hay arhivos .md'));
  }

  if (mdFiles && mdFiles.length > 0) {
    const contentMdFiles = readMdFiles(mdFiles);
    linksMds = getLinks(contentMdFiles, mdFiles);
  }

  if (!options) {
    const noOptionsInfo = linksMds.map((link) => {
      const text = `Texto: ${link.text}`;
      const url = `URL: ${link.url}`;
      const file = `Archivo: ${link.file}`;
      return `${text}\n${url}\n${file}\n`;
    }).join('\n');
    resolve(noOptionsInfo);
  } else if (options.validate && options.stats) {
    Promise.all(linksMds.map((singleLink) => validateLink(singleLink.url)))
      .then((validatedLinks) => {
        const statsOutput = calculateStats(validatedLinks);
        const formattedLinks = validatedLinks.map((validatedLink, index) => {
          const text = `Texto: ${linksMds[index].text}`;
          const url = `URL: ${linksMds[index].url}`;
          const file = `Archivo: ${linksMds[index].file}`;
          const href = `Href: ${validatedLink.href}`;
          const status = `Estado: ${validatedLink.status}`;
          const ok = `Ok: ${validatedLink.ok}`;
          return `\n${text}\n${url}\n${file}\n${href}\n${status}\n${ok}\n`;
        });
        resolve({ statsOutput, formattedLinks });
      })
      .catch((error) => {
        reject(new Error('Hubo un problema al validar y obtener las estadisticas de los links'));
      });
  } else if (options.validate) {
    Promise.all(linksMds.map((singleLink) => validateLink(singleLink.url)))
      .then((validatedLinks) => {
        const formattedLinks = validatedLinks.map((validatedLink, index) => {
          const text = `Texto: ${linksMds[index].text}`;
          const url = `URL: ${linksMds[index].url}`;
          const file = `Archivo: ${linksMds[index].file}`;
          const href = `Href: ${validatedLink.href}`;
          const status = `Estado: ${validatedLink.status}`;
          const ok = `Ok: ${validatedLink.ok}`;
          return `\n${text}\n${url}\n${file}\n${href}\n${status}\n${ok}\n`;
        });
        resolve(formattedLinks);
      })
      .catch((error) => {
        reject(error);
      });
  } else if (options.stats) {
    const statsOutput = calculateStats(linksMds);
    resolve(statsOutput);
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
const archivoConPocosLinks = 'Directorio Uno/Directorio Tres/md-uno.md';

mdLinks(rutaAbsolutaDirectorioDos, { stats: true, validate: true })
  .then(({ statsOutput, formattedLinks }) => {
    console.log(chalk.cyan(formattedLinks));
    console.log(chalk.magenta(statsOutput));
  })
  .catch((error) => {
    console.error(chalk.magenta('Error:', error));
  });

export default mdLinks;
