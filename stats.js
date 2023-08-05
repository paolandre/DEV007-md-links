const calculateStats = (linksMds) => {
  // Creamos un set para almacenar los links únicos
  const uniqueLinks = new Set();
  let brokenLinks = 0;

  linksMds.forEach((link) => {
    uniqueLinks.add(link.href);
    if (link.status >= 400) brokenLinks += 1;
  });

  // Construimos el objeto output
  const statsOutput = {
    Total: linksMds.length,
    Unique: uniqueLinks.size,
    Broken: brokenLinks,
  };

  return statsOutput;
};

export default calculateStats;
