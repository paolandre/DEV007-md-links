import chalk from 'chalk';
import { mdLinks } from './index.js';

mdLinks('/ruta/noexiste/').then(()=>{})
.catch((error) => {
    console.log(chalk.inverse.green(error))
});