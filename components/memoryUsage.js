const os = require("os");
const conversionFactor = 9.3132 * 1e-10;

exports.update = async () => {
  const usedGB = ((os.totalmem() - os.freemem()) * conversionFactor).toFixed(2);
  const totalGB = (os.totalmem() * conversionFactor).toFixed(2);
  const usedPercentage = ((usedGB / totalGB) * 100).toFixed(2);

  return `:tools: **Memory Usage:** ${usedGB} GB / ${totalGB} GB • (${usedPercentage}%)`;
};
