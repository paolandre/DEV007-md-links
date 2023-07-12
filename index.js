import fs from 'fs';
import path from 'path';

export const mdLinks = (route, options) => { //mdLinks devuelve una promesa
  return new Promise((resolve, reject) => { //Resolve y reject son funciones
    if (fs.existsSync(route)) { // ¿Existe la ruta? (si la ruta existe...)
      if (!path.isAbsolute(route)) { // ¿Es absoluta? (Si es absoluta...)
        const absolutePath = path.resolve(route); //Convierte la ruta en absoluta
        resolve(absolutePath); // el resultado es la ruta absoluta de la ruta
      } else {
        resolve(route); // Si la ruta ya es absoluta, resuelve la promesa con la misma ruta
        console.log(route);
      }
    } else {
      reject('la ruta no existe'); // Si la ruta no existe, rechaza la promesa
    }
  });
};
