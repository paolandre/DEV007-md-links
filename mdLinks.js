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

const mdLinks = (route, options) => new Promise((resolve, reject) => {
  if (!fs.existsSync(route)) {
    reject(new Error('La ruta no existe'));
  }

  const absolutePath = convertToAbsolutePath(route);
  const isMdFile = mdFile(absolutePath);
  const isDir = directory(absolutePath);
  let linksMds = [];
  let mdFiles = [];

  if (!isMdFile && !isDir) {
    reject(new Error('No es un archivo .md ni un directorio'));
  }

  if (isDir) {
    mdFiles = getMdFilesInDirectories(absolutePath);
  } else if (isMdFile) {
    mdFiles.push(absolutePath);
  }

  if (mdFiles.length === 0) {
    reject(new Error('No hay archivos .md'));
  }

  if (mdFiles && mdFiles.length > 0) {
    const contentMdFiles = readMdFiles(mdFiles);
    linksMds = getLinks(contentMdFiles, mdFiles);
  }

  if (!options.validate && !options.stats) {
    const noOptionsInfo = linksMds;
    resolve({ noOptionsInfo });
    // eslint-disable-next-line max-len
  } else if ((options.validate && options.stats) || (options.validate && !options.stats) || (options.stats && !options.validate)) {
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
