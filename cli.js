/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */

import chalk from 'chalk';
import process from 'process';
import mdLinks from './mdLinks.js';

const args = process.argv.slice(2);
const route = args[0];

const parseOptions = (opciones) => {
  const options = {
    validate: false,
    stats: false,
  };

  if (opciones.includes('--validate')) {
    options.validate = true;
  }

  if (opciones.includes('--stats')) {
    options.stats = true;
  }

  return options;
};

const options = parseOptions(args);

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

mdLinks(route, options)
  .then(({ statsOutput, formattedLinks }) => {
    console.log(chalk.cyan(formattedLinks));
    console.log(chalk.magenta(statsOutput));
  })
  .catch((error) => {
    console.error(chalk.magenta('Error:', error));
  });
