#!/usr/bin/env node
/* eslint-disable no-console */
import chalk from 'chalk';
import process from 'process';
import boxen from 'boxen';
import gradient from 'gradient-string';
import mdLinks from './mdLinks.js';

const args = process.argv.slice(2);
const route = args[0];

// Opción de --help
if (!route || args.includes('--help')) {
  const showWelcomeMessage = () => {
    const welcomeTitle = gradient.morning('¡Bienvenido/a a md-links!', { fontSize: 100 });
    const usage = chalk.green('Uso: md-links <path-to-file> [options]\n');
    const optionsHeader = chalk.magenta('Opciones:\n');
    const validateOption = `${chalk.cyan('--validate   ')}Valida si los links están funcionando.\n`;
    const statsOption = `${chalk.cyan('--stats      ')}Muestra estadísticas básicas sobre los links.\n`;
    const statsAndValidateOption = `${chalk.cyan('--stats --validate  ')}Valida los links y muestra sus estadísticas básicas.\n`;

    const message = `${welcomeTitle}\n\n${usage}${optionsHeader}${validateOption}${statsOption}${statsAndValidateOption}`;

    const formattedMessage = boxen(message, {
      padding: 1,
      borderStyle: 'double',
      borderColor: 'magenta',
    });

    console.log(formattedMessage);
    process.exit(0);
  };

  showWelcomeMessage();
}

const validOptions = ['--validate', '--stats', '--help'];

// Función para determinar las opciones y también la opción invalida
const parseOptions = (options) => {
  const parsedOptions = {
    validate: false,
    stats: false,
  };

  options.forEach((opt) => {
    if (!validOptions.includes(opt)) {
      const errorMessage = gradient.morning(`Error: Opción desconocida '${opt}'. Usa '--help' para ver las opciones válidas.`);
      const formattedMessage = boxen(errorMessage, {
        padding: 1,
        borderStyle: 'double',
        borderColor: 'cyan',
      });
      console.error(formattedMessage);
      process.exit(1);
    }
    if (opt === '--validate') {
      parsedOptions.validate = true;
    }
    if (opt === '--stats') {
      parsedOptions.stats = true;
    }
  });

  return parsedOptions;
};

const options = parseOptions(args.slice(1));

// Implementación de la función mdLinks
mdLinks(route, options)
  .then((result) => {
    const { formattedLinks, statsOutput, noOptionsInfo } = result;

    if (!options.validate && !options.stats) {
      noOptionsInfo.forEach((link) => {
        console.log(chalk.magentaBright(`Texto: ${link.text}`));
        console.log(chalk.magentaBright(`Href: ${link.href}`));
        console.log(chalk.magentaBright(`File: ${link.file}\n`));
      });
      console.log(gradient.teen('Nota: Para obtener más información de los links, seleccione una opción entre --validate o --stats'));
    } else if (options.validate && options.stats) {
      formattedLinks.forEach((link) => {
        console.log(chalk.magenta(`Texto: ${link.text}`));
        console.log(chalk.cyanBright(`Href: ${link.href}`));
        console.log(chalk.magentaBright(`File: ${link.file}`));
        console.log(chalk.magentaBright(`Status: ${link.status}`));
        console.log(gradient.summer(`Ok: ${link.ok}\n`));
      });
      console.log(chalk.yellow.bold(`Total: ${statsOutput.Total}`));
      console.log(chalk.yellowBright(`Unique: ${statsOutput.Unique}`));
      console.log(gradient.morning(`Broken: ${statsOutput.Broken}\n`));
    } else if (options.stats) {
      console.log(chalk.yellow.bold(`Total: ${statsOutput.Total}`));
      console.log(chalk.yellowBright(`Unique: ${statsOutput.Unique}`));
      console.log(gradient.morning(`Broken: ${statsOutput.Broken}\n`));
    } else if (options.validate) {
      formattedLinks.forEach((link) => {
        console.log(chalk.magenta(`Texto: ${link.text}`));
        console.log(chalk.cyanBright(`Href: ${link.href}`));
        console.log(chalk.magentaBright(`File: ${link.file}`));
        console.log(chalk.magentaBright(`Status: ${link.status}`));
        console.log(gradient.summer(`Ok: ${link.ok}\n`));
      });
    }
  })
  .catch((error) => {
    console.error(chalk.red('Error:', error.message));
  });
