const info = require("systeminformation");
exports.update = async () => {
	let batteryData = await info.battery();
	let payload = ':battery: **Battery:**: No battery found.'
	if (batteryData.hasBattery) {
		payload = `:battery: **Battery:** ${batteryData.percent}% ${batteryData.isCharging ? '(Charging)' : '(Not Charging)'}`;
	}
	return payload;
}