const fs = require("fs");
const moment = require("moment");

const config = JSON.parse(fs.readFileSync("./config.json"));
const Discord = require('discord.js');
const client = new Discord.Client();

let MESSAGE;

// load enabled components
const component_names = fs.readdirSync('./components/');
const components = new Map();
component_names.forEach(file_name => {
	if (!file_name.endsWith('.js')) return;

	const file = require(`./components/${file_name}`);

	const component_name = file_name.split('.js').join('');

	if (config.components[component_name])
		components.set(component_name, file);
});

async function update() {
	if (!MESSAGE) return console.log('Unable to fetch channel or message.');

	let payload = '';

	const promises = [];
	components.forEach(component => promises.push(component.update()));

	const values = await Promise.all(promises);
	payload = values.join('\n');

	payload += `\n:timer: **Last Updated:** ${moment().format("hh:mm:ss A DD-MM-YYYY")} `;
	MESSAGE.edit(payload);
	setTimeout(update, config.interval * 1000);
}

client.on('ready', async () => {
	client.user.setPresence({ activity: { name: 'Watching s.help' }, status: 'active' })
	console.log(`Logged in as ${client.user.tag} !`);

	if (config.messageID && config.channelID) {
		let channel = await client.channels.fetch(config.channelID);
		MESSAGE = await channel.messages.fetch(config.messageID);
		update();
	} else {
		console.log("Waiting for s.start");
	}
});

client.on('message', async (message) => {
	if (message.author.bot) return;
	if (message.content === 's.start') {
		if (config.messageID) return message.reply("stats has already started.");

		let msg = await message.channel.send("Updatig stats...");
		config.messageID = msg.id;
		config.channelID = msg.channel.id;
		MESSAGE = msg;
		fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));
		update();
	}
	if (message.content === 's.ping') {
		const msg = await message.channel.send('Ping?')
		msg.edit(`Pong! Latency is ${Math.round(msg.createdTimestamp - message.createdTimestamp)} ms. API Latency is ${Math.round(client.ws.ping)} ms`)
	}
	if (message.content === 's.help') {
		const help = [
			'Welcome to PC STAT BOT',
			'',
			'Here are the list of commands: ',
			'`s.ping` - shows my latency',
			'`s.start` - start updating the stats',
			'`s.help` - shows this message',
			'',
			'About me',
			'I am made by Delano Lourenco - https://delano-lourenco.web.app',
			'For suggestions or bugs join my support server - https://discord.gg/FZY9TqW'
		].join('\n');
		return message.channel.send(help);
	}
});

try {
	console.log("Starting PC STAT BOT");
	if (config.clientID) console.log(`Invite Link: https://discord.com/oauth2/authorize?client_id=${config.clientID}&scope=bot&permissions=8`)

	client.login(config.token);
} catch (err) {
	console.log('Error logging in.', err);
	client.login(config.token);
}
client.on("error", (err) => {
	console.log('Dicord Client Error:', err);
	client.login(config.token);
})
process.on('unhandledRejection', err => { console.log('Caught Error:', err) })