import axios from 'axios';

// Función validate
// Declaramos la función validateLink que toma un parámetro llamado 'link'
const validateLink = (link) => new Promise((resolve) => {
  axios.get(link)
    .then((response) => {
      resolve({
        href: link,
        status: response.status,
        ok: response.status === 200 ? 'ok' : 'fail',
      });
    })
    .catch((error) => {
      resolve({
        href: link,
        status: error.response ? error.response.status : 'ERROR',
        ok: 'fail',
      });
    });
});

export default validateLink;
