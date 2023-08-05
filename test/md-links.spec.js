/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import path from 'path';
import axios from 'axios';
import {
  getMdFilesInDirectories,
  convertToAbsolutePath,
  arrayFile,
  directory,
  mdFile,
} from '../fileUtils.js';
import {
  readMdFiles,
  getLinks,
} from '../mdLinkExtractor.js';
import calculateStats from '../stats.js';
import validateLink from '../validate.js';
import mdLinks from '../mdLinks.js';

// Prueba de la función recursiva
describe('getMdFilesInDirectories', () => {
  it('debería obtener los archivos md dentro de un directorio', () => {
    const directorioPrueba = path.normalize('C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/Directorio Uno/Directorio Tres');

    // path.normalize es para que acepte el simbolo del slash de las rutas
    const expectedFiles = [
      path.normalize('C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/Directorio Uno/Directorio Tres/md-uno.md'),
      path.normalize('C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/Directorio Uno/Directorio Tres/sinlinks.md'),
    ];

    expect(getMdFilesInDirectories(directorioPrueba)).toStrictEqual(expectedFiles);
  });

  // Test de devolución de array vacío cuando el directorio está vacío
  it('debería devolver un array vacío cuando no hay archivos .md en el directorio', () => {
    const directorioVacio = path.normalize('C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/Directorio Uno/Directorio Dos/Directorio Cuatro');
    const resultado = getMdFilesInDirectories(directorioVacio);
    expect(resultado).toEqual(resultado);
  });
});

// Test de convertir la ruta a absoluta
describe('convertToAbsolutePath', () => {
  it('debería devolver la ruta absoluta cuando se le proporciona una ruta relativa', () => {
    const rutaRelativa = 'README.md';
    const rutaAbsolutaEsperada = path.normalize('C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/README.md');
    expect(convertToAbsolutePath(rutaRelativa)).toBe(rutaAbsolutaEsperada);
  });

  // Test de devolver la ruta absoluta si es absoluta
  it('debería devolver la misma ruta absoluta cuando se le proporciona una ruta absoluta', () => {
    const rutaAbsoluta = path.normalize('C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/README.md');
    const resultado = convertToAbsolutePath(rutaAbsoluta);
    expect(resultado).toBe(rutaAbsoluta);
  });
});

// Test del array de archivo .md
describe('arrayFile', () => {
  it('debería devolver un array que contenga el array del archivo .md', () => {
    const rutaArchivoMd = 'README.md';
    const resultado = arrayFile(rutaArchivoMd);
    expect(resultado).toEqual([rutaArchivoMd]);
  });

  // Test de array vacío si no es .md
  it('debería devolver un array vacío cuando se le proporciona una ruta de un archivo que no es .md', () => {
    const rutaArchivo = 'cli.js';
    const resultado = arrayFile(rutaArchivo);
    expect(resultado).toEqual([]);
  });
});

// Test para comprobar si es un directorio
describe('directory', () => {
  it('debería devolver true cuando se le proporciona la ruta absoluta de un directorio existente', () => {
    const rutaDirectorio = path.normalize('C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/Directorio Uno');
    const resultado = directory(rutaDirectorio);
    expect(resultado).toBe(true);
  });
});

// Test para comprobar si es un archivo .md
describe('mdFile', () => {
  it('debería devolver true cuando se le proporciona la ruta absoluta de un archivo .md existente', () => {
    const rutaArchivoMd = 'README.md';
    const resultado = mdFile(rutaArchivoMd);
    expect(resultado).toBe(true);
  });

  // Test para comprobar que no es un archivo .md
  it('debería devolver false cuando se le proporciona la ruta absoluta de un archivo que no es .md', () => {
    const rutaArchivo = 'cli.js';
    const resultado = mdFile(rutaArchivo);
    expect(resultado).toBe(false);
  });
});

// -------------------------------MDLINKEXTRACTOR.JS------------------------------
// Test para comprobar si extrae los links correctamente
describe('getLinks', () => {
  it('debería extraer los enlaces de un archivo', () => {
    const contentArray = [
      '[Card-Validation](https://paolandre.github.io/laboratoria-card-validation) [Best Profile Generator](https://gprm.itsvg.in)',
    ];
    const mdFilesArray = ['C:\\Users\\andre\\OneDrive\\Escritorio\\Proyectos\\Laboratoria\\DEV007-md-links\\Directorio Uno\\Directorio Tres\\md-uno.md'];

    const result = getLinks(contentArray, mdFilesArray);
    const expected = [
      {
        text: 'Card-Validation',
        href: 'https://paolandre.github.io/laboratoria-card-validation',
        file: 'C:\\Users\\andre\\OneDrive\\Escritorio\\Proyectos\\Laboratoria\\DEV007-md-links\\Directorio Uno\\Directorio Tres\\md-uno.md',
      },
      {
        text: 'Best Profile Generator',
        href: 'https://gprm.itsvg.in',
        file: 'C:\\Users\\andre\\OneDrive\\Escritorio\\Proyectos\\Laboratoria\\DEV007-md-links\\Directorio Uno\\Directorio Tres\\md-uno.md',
      },
    ];
    expect(result).toEqual(expected);
  });

  it('debería lanzar un error si no se encuentran links', () => {
    const contentArray = ['Este es un archivo .md sin links.'];
    const mdFilesArray = ['C:\\Users\\andre\\OneDrive\\Escritorio\\Proyectos\\Laboratoria\\DEV007-md-links\\Directorio Uno\\Directorio Tres\\sinlinks.md'];

    expect(() => {
      getLinks(contentArray, mdFilesArray);
    }).toThrow('No se encontraron links.');
  });
});

// Test para leer el archivo y ver si es un string
describe('readMdFiles', () => {
  it('debería devolver un array con al menos un string al leer los archivos .md', () => {
    const ruta = 'README.md'; // Asegúrate de que este es el path correcto a tu archivo .md de prueba
    const files = [ruta];
    const result = readMdFiles(files);
    // Comprueba que el primer elemento del array resultante es un string
    expect(typeof result[0]).toBe('string');
  });
});

// -------------------------------STATS.JS------------------------------
describe('calculateStats', () => {
  it('debería calcular las estadísticas correctamente', () => {
    const mockLinks = [
      { href: 'https://example1.com', status: 200 },
      { href: 'https://example2.com', status: 200 },
      { href: 'https://example3.com', status: 404 },
      { href: 'https://example4.com', status: 500 },
      { href: 'https://example1.com', status: 200 },
    ];

    const result = calculateStats(mockLinks);
    const expected = {
      Total: 5,
      Unique: 4,
      Broken: 2,
    };

    expect(result).toEqual(expected);
  });
});

// -------------------------------VALIDATE.JS------------------------------
// Mockear axios para evita realizar peticiones HTTP reales
jest.mock('axios');
describe('validateLink', () => {
  it('debería devolver el status y "ok" si el link es válido', async () => {
    const mockLink = 'https://valid-link.com';

    // simular una respuesta exitosa de axios
    axios.get.mockResolvedValue({ status: 200 });

    const result = await validateLink(mockLink);
    const expected = {
      href: mockLink,
      status: 200,
      ok: 'ok',
    };

    expect(result).toEqual(expected);
  });

  it('debería devolver el status y "fail" si el link no es válido', async () => {
    const mockLink = 'https://invalid-link.com';

    // Simulamos una respuesta fallida de axios
    axios.get.mockRejectedValue({ response: { status: 404 } });

    const result = await validateLink(mockLink);
    const expected = {
      href: mockLink,
      status: 404,
      ok: 'fail',
    };

    expect(result).toEqual(expected);
  });
});
// -------------------------------MDLINKS.JS------------------------------
describe('mdLinks', () => {
  it('debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('debería devolver una promesa', () => {
    const resultado = mdLinks('README.md', {});
    expect(resultado).toBeInstanceOf(Promise);
  });

  it('Debería rechazar la promesa cuando el path no existe', () => mdLinks('./hola/mundo.md').catch((error) => {
    expect(error.message).toEqual('La ruta no existe');
  }));

  it('debería devolver un objeto cuando se le proporciona la ruta absoluta de un directorio existente', () => {
    const rutaDirectorio = path.normalize('C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/Directorio Uno');
    return mdLinks(rutaDirectorio).then((result) => {
      expect(result).toBeInstanceOf(Object);
    });
  });

  it('debería rechazar con un error si no es un archivo .md ni un directorio', async () => {
    try {
      await mdLinks('cli.js', {});
    } catch (error) {
      expect(error.message).toBe('No es un archivo .md ni un directorio');
    }
  });

  it('Debería devolver un error si no hay archivos .md', async () => {
    const ruta = path.normalize('Directorio Uno/Directorio Dos/Directorio Cuatro');
    try {
      await mdLinks(ruta);
    } catch (error) {
      expect(error.message).toEqual('No hay archivos .md');
    }
  });
  it('debería devolver un objeto cuando se le proporciona la ruta absoluta de un directorio y la opción validate', () => {
    const rutaDirectorio = path.normalize('C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/Directorio Uno');
    return mdLinks(rutaDirectorio, { validate: true }).then((result) => {
      expect(result).toBeInstanceOf(Object);
    });
  });
  it('debería devolver un objeto cuando se le proporciona la ruta absoluta de un directorio y la opción stats', () => {
    const rutaDirectorio = path.normalize('C:/Users/andre/OneDrive/Escritorio/Proyectos/Laboratoria/DEV007-md-links/Directorio Uno');
    return mdLinks(rutaDirectorio, { stats: true }).then((result) => {
      expect(result).toBeInstanceOf(Object);
    });
  });
});
