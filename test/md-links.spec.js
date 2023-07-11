import { mdLinks } from '../index.js';

describe('mdLinks', () => {
  /*it('Debería devolver una objeto', () => {
    expect(typeof mdLinks()).toBe('object');
  });

  it('Debería devolver una promesa', () => {
    expect(mdLinks() instanceof Promise).toBe(true);
  });*/

  it('Debería rechazar la promesa cuando el path no existe', () => {
    return (mdLinks('./hola/mundo.md')).catch((error) => {
      expect(error).toBe('la ruta no existe');
    });
  });
});
