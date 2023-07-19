import mdLinks from '../index.js';

describe('mdLinks', () => {
  /* it('Debería devolver una objeto', () => {
    expect(typeof mdLinks()).toBe('object');
  });

  it('Debería devolver una promesa', () => {
    expect(mdLinks() instanceof Promise).toBe(true);
  }); */

  // verifica el comportamiento de mdLinks cuando el path que no existe.
  it(
    'Debería rechazar la promesa cuando el path no existe',
    () => (mdLinks('./hola/mundo.md')).catch((error) => {
      expect(error.message).toEqual('La ruta no existe');
    }),
  );

  // verifica el comportamiento de mdLinks cuando el path existe.
  it(
    'Debería aceptar la promesa cuando el path existe',
    () => (mdLinks('./README.md')).catch((error) => {
      expect(error).toBe('la ruta no existe');
    }),
  );
});
