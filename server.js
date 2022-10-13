const fs = require("fs");
const moment = require("moment");
const Discord = require("discord.js");

const config = JSON.parse(fs.readFileSync("./config.json"));
const client = new Discord.Client();

let MESSAGE;

// load enabled components
const componentNames = fs.readdirSync("./components/");
const components = new Map();
componentNames.forEach((fileName) => {
  if (!fileName.endsWith(".js")) return;

  const script = require(`./components/${fileName}`);
  const componentName = fileName.split(".js").join("");

  if (config.components[componentName]) {
    components.set(componentName, script);
  }
});

// Called every interval (seconds) to update the message with stats
async function update() {
  if (!MESSAGE) return console.log("Unable to fetch message.");

  let payload = "";

  if (config.title) {
    payload += `__**${config.title}**__\n`;
  }

  const promises = Array.from(components.values()).map((component) =>
    component.update()
  );

  const values = await Promise.all(promises);

  payload += values.join("\n");

  switch (config.displayTimestamp) {
    case false:
      break;

    case "12h":
    case "12":
    case "":
    case true:
      payload += `\n:timer: **Last Updated:** ${moment().format(
        "hh:mm:ss A DD-MM-YYYY"
      )} `;
      break;

    case "24h":
    case "24":
      payload += `\n:timer: **Last Updated:** ${moment().format(
        "HH:mm:ss DD-MM-YYYY"
      )} `;
      break;
    default:
      console.log(
        "Invalid displayTimestamp config value expected one of 'false', '12h', '24h', 'true'."
      );
      break;
  }

  if (!MESSAGE) return;
  await MESSAGE.edit(payload);
  setTimeout(update, config.interval * 1000);
}

client.on("ready", async () => {
  if (config.displayActivity === true) {
    client.user.setPresence({
      activity: { name: "Watching s.help" },
      status: "active",
    });
  } else if (config.displayActivity) {
    client.user.setPresence({
      activity: { name: config.displayActivity },
      status: "active",
    });
  }
  console.log(`Logged in as ${client.user.tag} !`);

  let alreadyStarted = false;
  if (config.messageID && config.channelID) {
    try {
      const channel = await client.channels.fetch(config.channelID);
      MESSAGE = await channel.messages.fetch(config.messageID);
      console.log(`Updating every ${config.interval}s...`);
      alreadyStarted = true;
    } catch (err) {
      console.log("Unable to fetch previous message.");
      config.messageID = undefined;
      config.channelID = undefined;
      MESSAGE = undefined;
      fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));
    }
  }

  if (!alreadyStarted) console.log("Waiting for s.start");
  else update();
});

client.on("message", async (message) => {
  if (message.author.bot) return;

  if (message.content === "s.start") {
    if (MESSAGE) return message.reply("stats is already started.");

    const msg = await message.reply("starting stats...");
    config.messageID = msg.id;
    config.channelID = msg.channel.id;
    MESSAGE = msg;
    fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));
    update();
  } else if (message.content === "s.stop") {
    if (!MESSAGE) return message.reply("stats is not started.");

    const msg = await message.reply("stopping stats...");
    config.messageID = undefined;
    config.channelID = undefined;
    MESSAGE = undefined;
    fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));
    msg.edit(`<@${message.author.id}>, stats was stopped.`);
  } else if (message.content === "s.ping") {
    const msg = await message.channel.send("Ping?");
    msg.edit(
      `Pong! Latency is ${Math.round(
        msg.createdTimestamp - message.createdTimestamp
      )} ms. API Latency is ${Math.round(client.ws.ping)} ms`
    );
  } else if (message.content === "s.help") {
    const help = [
      "Welcome to PC STAT BOT",
      "",
      "Here are the list of commands: ",
      "`s.ping` - shows my latency",
      "`s.start` - start updating the stats",
      "`s.stop` - stop updating the stats",
      "`s.help` - shows this message",
      "",
      "About",
      "Created by @3ddelano#6033 - https://delano-lourenco.web.app",
      "For suggestions or bugs join support server - https://discord.gg/FZY9TqW",
    ].join("\n");
    return message.channel.send(help);
  }
});

try {
  console.log("Starting PC STAT BOT");
  if (config.clientID)
    console.log(
      `Invite Link: https://discord.com/oauth2/authorize?client_id=${config.clientID}&scope=bot&permissions=2048`
    );

  client.login(config.token);
} catch (err) {
  console.log("Error logging in.", err);
  client.login(config.token);
}

client.on("error", (err) => {
  console.log("Dicord Client Error:", err);
  client.login(config.token);
});

process.on("unhandledRejection", (err) => {
  console.log("Caught Error:", err);
});

