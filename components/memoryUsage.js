const os = require("os");
const conversionFactor = 9.3132 * 1e-10;

exports.update = async () => {

	let totalMem = (os.totalmem() * conversionFactor).toFixed(2);
	let usedMem = (totalMem - (os.freemem() * conversionFactor)).toFixed(2);

	let payload = `:tools: **Memory Usage:** ${usedMem} GB / ${totalMem} GB`;
	return payload;
}