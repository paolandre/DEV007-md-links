import fs from 'fs';
import {
  getMdFilesInDirectories,
  convertToAbsolutePath,
  directory,
  mdFile,
} from './fileUtils.js';
import { readMdFiles, getLinks } from './mdLinkExtractor.js';
import validateLink from './validate.js';
import calculateStats from './stats.js';

// Función principal de mdLinks: Analiza y extrae los links de los archivos Markdown.
const mdLinks = (route, options = {}) => new Promise((resolve, reject) => {
  // Verificar si la ruta existe
  if (!fs.existsSync(route)) {
    reject(new Error('La ruta no existe'));
  }

  const absolutePath = convertToAbsolutePath(route);
  const isMdFile = mdFile(absolutePath);
  const isDir = directory(absolutePath);
  let linksMds = [];
  let mdFiles = [];

  // Verificar si la ruta es un archivo Markdown o un directorio
  if (!isMdFile && !isDir) {
    reject(new Error('No es un archivo .md ni un directorio'));
  }

  // Si es un directorio, obtener todos los archivos Markdown dentro
  if (isDir) {
    mdFiles = getMdFilesInDirectories(absolutePath);
  } else if (isMdFile) {
    mdFiles.push(absolutePath);
  }

  // Si no hay archivos Markdown, rechazar
  if (mdFiles.length === 0) {
    reject(new Error('No hay archivos .md'));
  }

  // Leer el contenido de los archivos Markdown y extraer los links
  if (mdFiles && mdFiles.length > 0) {
    const contentMdFiles = readMdFiles(mdFiles);
    linksMds = getLinks(contentMdFiles, mdFiles);
  }

  // Si no hay opciones proporcionadas, resolver con la información básica de los links
  if (!options.validate && !options.stats) {
    const noOptionsInfo = linksMds;
    resolve({ noOptionsInfo });
    //  Si hay opciones, validar los links y/o calcular estadísticas
  } else if (options.validate || options.stats) {
    Promise.all(linksMds.map((singleLink) => validateLink(singleLink.href)))
      .then((validatedLinks) => {
        const statsOutput = calculateStats(validatedLinks);
        const formattedLinks = validatedLinks.map((validatedLink, index) => ({
          text: `${linksMds[index].text}`,
          file: `${linksMds[index].file}`,
          href: `${validatedLink.href}`,
          status: `${validatedLink.status}`,
          ok: `${validatedLink.ok}`,
        }));

        resolve({ statsOutput, formattedLinks });
      })
      .catch((Error) => {
        reject(new Error('Hubo un problema al validar y obtener las estadisticas de los links'));
      });
  }
});

export default mdLinks;
