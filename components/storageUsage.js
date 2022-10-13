// Code by LukasL28: github.com/LukasL28

const checkDiskSpace = require("check-disk-space").default;
const os = require("os");

const conversionFactor = 0.000000001;

exports.update = async () => {
  let path = "C:";
  if (os.platform() == "linux" || os.platform() == "darwin") {
    path = "/";
  }

  const data = await checkDiskSpace(path);

  if (data == null)
    return `:floppy_disk: **Storage Usage:**: No Storage found.`;

  const usedGB = ((data.size - data.free) * conversionFactor).toFixed(2);
  const totalGB = (data.size * conversionFactor).toFixed(2);
  const usedPercentage = ((usedGB / totalGB) * 100).toFixed(2);

  return `:floppy_disk: **Storage Usage:** ${usedGB} GB / ${totalGB} GB • (${usedPercentage}%)`;
};
