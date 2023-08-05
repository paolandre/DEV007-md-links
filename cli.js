/* eslint-disable no-console */

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

const options = parseOptions(args.slice(1));

mdLinks(route, options)
  .then((result) => {
    if (!options.validate && !options.stats) {
      result.noOptionsInfo.forEach((link) => {
        console.log(chalk.cyanBright(`Texto: ${link.text}`));
        console.log(chalk.magentaBright(`Href: ${link.href}`));
        console.log(chalk.magentaBright(`File: ${link.file}\n`));
      });
      console.log(chalk.green('Nota: Para obtener más información de los links, seleccione una opción entre --validate o --stats'));
    } else if (options.validate && options.stats) {
      result.formattedLinks.forEach((link) => {
        console.log(chalk.cyanBright(`Texto: ${link.text}`));
        console.log(chalk.magentaBright(`Href: ${link.href}`));
        console.log(chalk.magentaBright(`File: ${link.file}`));
        console.log(chalk.magentaBright(`Status: ${link.status}`));
        console.log(chalk.magentaBright(`Ok: ${link.ok}\n`));
      });
      console.log(chalk.yellow.bold(`Total: ${result.statsOutput.Total}`));
      console.log(chalk.yellowBright(`Unique: ${result.statsOutput.Unique}`));
      console.log(chalk.yellowBright(`Broken: ${result.statsOutput.Broken}\n`));
    } else if (options.stats) {
      console.log(chalk.yellow.bold(`Total: ${result.statsOutput.Total}`));
      console.log(chalk.yellowBright(`Unique: ${result.statsOutput.Unique}`));
      console.log(chalk.yellowBright(`Broken: ${result.statsOutput.Broken}\n`));
    } else if (options.validate) {
      result.formattedLinks.forEach((link) => {
        console.log(chalk.cyanBright(`Texto: ${link.text}`));
        console.log(chalk.magentaBright(`Href: ${link.href}`));
        console.log(chalk.magentaBright(`File: ${link.file}`));
        console.log(chalk.magentaBright(`Status: ${link.status}`));
        console.log(chalk.magentaBright(`Ok: ${link.ok}\n`));
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });
