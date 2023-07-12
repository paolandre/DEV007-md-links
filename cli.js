import chalk from 'chalk';
import { mdLinks } from './index.js';

// mdLinks verifica que una ruta que no existe 
mdLinks('/ruta/noexiste/')
  .then((rutaAbsoluta) => {
    console.log(rutaAbsoluta);
  })
  .catch((error) => {
    console.log(chalk.inverse.cyan(error));
  });

// mdLinks verifica que la ruta de mi README existe
mdLinks('./README.md')
  .then((rutaAbsoluta) => {
    console.log(chalk.bgMagenta(rutaAbsoluta));
  })
  .catch((error) => {
    console.error(chalk.bgMagenta('Error:', error));
  });