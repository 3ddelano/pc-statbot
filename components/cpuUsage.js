const info = require("systeminformation");

exports.update = async () => {
  const currentLoad = (
    await info.currentLoad().then((data) => data.currentLoad)
  ).toFixed(2);

  return `:gear: **CPU Usage:** ${currentLoad}%`;
};
