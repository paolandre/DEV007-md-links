/* eslint-disable max-len */
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';

// Función para obtener los archivos .md en un directorio dado
const getMdFilesInDirectory = (directory) => {
  // Lee los archivos en el directorio
  const files = fs.readdirSync(directory);

  // Filtra los archivos para obtener solo los archivos .md
  const mdFiles = files
    .filter((file) => path.extname(file) === '.md')
    // Construye la ruta completa de cada archivo .md
    .map((file) => path.join(directory, file));

  // Retorna el array de archivos .md
  console.log(chalk.inverse.magenta('#12'));
  return mdFiles;
};

const mdLinks = (route) => new Promise((resolve, reject) => {
  if (fs.existsSync(route)) { // ¿Existe la ruta? (si la ruta existe...)
    if (!path.isAbsolute(route)) { // ¿Es absoluta? (Si no es absoluta...)
      // Convierte la ruta en absoluta
      const absolutePath = path.resolve(route);
      console.log(chalk.inverse.magenta('#1'));

      if (path.extname(absolutePath) === '.md') {
        // Si la ruta es un archivo .md, lo almacena en un array y resuelve la promesa
        const mdFilesArray = [absolutePath];
        resolve(mdFilesArray);
        console.log(chalk.inverse.magenta('#13'));
      } else {
        // Si la ruta no es un archivo .md, rechaza la promesa con un error
        reject(Error('No es un archivo .md'));
        console.log(chalk.inverse.magenta('#14'));
      }
      // Verifica si es un directorio
      // Devuelve un boolean true si es un directorio
      if (fs.statSync(absolutePath).isDirectory()) {
        console.log(chalk.inverse.magenta('#2'));
        try {
          // Obtiene los archivos .md en el directorio
          const mdFiles = getMdFilesInDirectory(absolutePath);
          console.log(chalk.inverse.magenta('#4'));

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
      } else {
        // No es un directorio
        reject(Error('La ruta no es un directorio'));
        console.log(chalk.inverse.magenta('#6'));
      }
    } else {
      // Si la ruta ya es absoluta, busca los archivos .md en la misma ruta
      console.log(chalk.inverse.magenta('#8'));
      try {
        const mdFiles = getMdFilesInDirectory(route);
        console.log(chalk.inverse.magenta('#9'));

        if (mdFiles.length === 0) {
          reject(Error('No se encontraron archivos .md en el directorio'));
          console.log(chalk.inverse.magenta('#10'));
          return;
        }
        resolve(mdFiles); // Resuelve la promesa con el array de archivos .md
      } catch (error) {
        reject(Error('Error de lectura del directorio'));
        console.log(chalk.inverse.magenta('#7'));
      }
    }
  } else {
    // Si la ruta no existe, rechaza la promesa
    reject(Error('La ruta no existe'));
    console.log(chalk.inverse.magenta('#11'));
  }
});

// DIRECTORIO CON RUTA ABSOLUTA
// eslint-disable-next-line max-len
/* mdLinks('C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/Directorio Markdown/Directorio Markdown dos/Directorio Markdown tres')
  .then((rutaAbsoluta) => {
    console.log(chalk.inverse.cyan(rutaAbsoluta));
  })
  .catch((error) => {
    console.error(chalk.magenta.bold('Error:', error));
  }); */

// DIRECTORIO CON RUTA RELATIVA
/* mdLinks('Directorio Markdown')
  .then((rutaAbsoluta) => {
    console.log(chalk.inverse.cyan(rutaAbsoluta));
  })
  .catch((error) => {
    console.error(chalk.magenta.bold('Error:', error));
  }); */

// DIRECTORIO VACIO
// eslint-disable-next-line max-len, max-len
mdLinks('Directorio Markdown/Directorio Markdown dos/Directorio Markdown tres')
  .then((rutaAbsoluta) => {
    console.log(chalk.inverse.cyan(rutaAbsoluta));
  })
  .catch((error) => {
    console.error(chalk.magenta.bold('Error:', error));
  });

// ARCHIVO .MD
/* mdLinks('README.md')
  .then((rutaAbsoluta) => {
    console.log(chalk.inverse.cyan(rutaAbsoluta));
  })
  .catch((error) => {
    console.error(chalk.magenta.bold('Error:', error));
  }); */

// ARCHIVO .JS
/* mdLinks('cli.js')
  .then((rutaAbsoluta) => {
    console.log(chalk.inverse.cyan(rutaAbsoluta));
  })
  .catch((error) => {
    console.error(chalk.magenta.bold('Error:', error));
  }); */

export default mdLinks;
