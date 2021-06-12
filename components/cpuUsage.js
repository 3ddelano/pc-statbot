const info = require("systeminformation");
exports.update = async () => {
	const currentLoad = (await info.currentLoad().then(data => data.currentLoad)).toFixed(2);

	const payload = `:gear: **CPU Usage:** ${currentLoad}%`;
	return payload;
}