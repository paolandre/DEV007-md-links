/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */

const calculateStats = (linksMds) => {
  // Creamos un set para almacenar los links únicos
  const uniqueUrls = new Set();
  linksMds.forEach((link) => uniqueUrls.add(link.url));

  // Construimos el output
  let statsOutput = '';
  statsOutput += `Total: ${linksMds.length}\n`;
  statsOutput += `Unique: ${uniqueUrls.size}\n`;

  return statsOutput;
};

export default calculateStats;
