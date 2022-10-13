const info = require("systeminformation");

exports.update = async () => {
  const batteryData = await info.battery();

  if (batteryData.hasBattery) {
    return `:battery: **Battery:** ${batteryData.percent}% ${
      batteryData.isCharging ? "(Charging)" : "(Not Charging)"
    }`;
  } else {
    return ":battery: **Battery:**: No battery found.";
  }
};
