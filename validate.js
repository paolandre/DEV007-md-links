import axios from 'axios';

// Función validate
// Declaramos la función validateLink que toma un parámetro llamado 'link'
const validateLink = (link) => axios
  .get(link)
  .then((response) => ({
    href: link,
    status: response.status,
    ok: response.status === 200 ? 'ok' : 'fail',
  }))
  .catch((error) => ({
    href: link,
    status: error.response ? error.response.status : 'ERROR',
    ok: 'fail',
  }));

export default validateLink;
