/* eslint-disable no-console */
/* eslint-disable max-len */
import chalk from 'chalk';
import mdLinks from './index.js';

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

// Cuando la ruta es absoluta
mdLinks('C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/Directorio Markdown/Directorio Markdown dos/Directorio Markdown tres')
  .then((rutaAbsoluta) => {
    console.log(chalk.inverse.cyan(rutaAbsoluta));
  })
  .catch((error) => {
    console.error(chalk.magenta.bold('Error:', error));
  });

// Cuando la ruta es un directorio (relativo)
mdLinks('Directorio Markdown')
  .then((rutaAbsoluta) => {
    console.log(chalk.inverse.cyan(rutaAbsoluta));
  })
  .catch((error) => {
    console.error(chalk.magenta.bold('Error:', error));
  });

// Cuando la ruta es de un directorio dentro de un directorio (relativa)
mdLinks('Directorio Markdown/Directorio Markdown dos/Directorio Markdown tres')
  .then((rutaAbsoluta) => {
    console.log(chalk.inverse.cyan(rutaAbsoluta));
  })
  .catch((error) => {
    console.error(chalk.magenta.bold('Error:', error));
  });
