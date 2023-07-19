/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';

//  Función para obtener los archivos .md en un directorio dado
const getMdFilesInDirectory = (directory) => {
  // Lee los archivos en el directorio
  const files = fs.readdirSync(directory);

  // Filtra los archivos para obtener solo los archivos .md
  const mdFiles = files
    .filter((file) => path.extname(file) === '.md');
  // Construye la ruta completa de cada archivo .md
  // .map((file) => path.join(directory, file));

  // Retorna el array de archivos .md
  console.log(chalk.inverse.magenta('#12'));
  return mdFiles;
};

const mdLinks = (route) => new Promise((resolve, reject) => {
  let absolutePath = ''; // se deja vacía para reasignarla más adelante
  if (fs.existsSync(route)) { // Si la ruta existe...
    // Si no es absoluta...
    if (!path.isAbsolute(route)) {
      // Convierte la ruta en absoluta reasignando a absolutePath
      absolutePath = path.resolve(route);
      console.log(chalk.inverse.magenta('#13'));
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
      if (path.extname(route) !== '.md' && !fs.statSync(absolutePath).isDirectory()) {
        reject(Error('No es un archivo .md')); // No es archivo md
      }

      // Verifica si es un directorio
      if (fs.statSync(absolutePath).isDirectory()) {
        console.log(chalk.inverse.magenta('#2'));
        try {
          // Obtiene los archivos .md en el directorio
          const mdFiles = getMdFilesInDirectory(absolutePath);
          console.log(chalk.inverse.magenta('#4'));

          // Si no se almacenan archivos....
          if (mdFiles.length === 0) {
            reject(Error('No se encontraron archivos .md en el directorio'));
            console.log(chalk.inverse.magenta('#5'));
            return;
          }
          resolve(mdFiles); // Resuelve la promesa con el array de archivos .md
        } catch (error) {
          reject(Error('Error de lectura del directorio'));
          console.log(chalk.inverse.magenta('#3'));
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
const rutaAbsolutaCarpeta = 'C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/Directorio Markdown/Directorio Markdown dos';
const directorioRutaRelativa = 'Directorio Markdown/Directorio Markdown dos';
const directorioVacio = 'Directorio Markdown/Directorio Markdown dos/Directorio Markdown tres';
const archivoMD = 'README.md';
const archivoNoMD = 'cli.js';
const rutaAbsolutaArchivo = 'C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/README.md';
const rutaNoExiste = 'NoExiste.md';

mdLinks(directorioRutaRelativa)
  .then((rutaAbsoluta) => {
    console.log(chalk.inverse.cyan(rutaAbsoluta));
  })
  .catch((error) => {
    console.error(chalk.magenta.bold('Error:', error));
  });

export default mdLinks;
