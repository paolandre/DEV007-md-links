import chalk from 'chalk';
import fs from 'fs';

// console.log(chalk.inverse.green('Hello, world!'));

export const mdLinks = (path, options) => {
  // mdLinks nos devuelve una promesa
  return new Promise((resolve, reject) => {
    // resolve y reject son funciones (callbacks)
    // identifica si la ruta existe 
    if (fs.existsSync(path)) {
      // implementar lo que pasa si la ruta existe 
      // revisar y convertir a una ruta absoluta
      // probar si la ruta es archivo o directorio
      // si es un directorio 
    } else {
      // si la ruta no existe, rechazamos la promesa 
      reject(chalk.inverse.green('la ruta no existe'))
    }
  });
};



