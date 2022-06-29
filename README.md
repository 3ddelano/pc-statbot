# PC STAT BOT
A self hosted Discord bot to display your pc stats.
<br>
<img alt="Nodejs" src="https://img.shields.io/badge/-Node.js-43853d?style=flat-square&logo=Node.js&logoColor=white" />
<br>
<img alt="screenshot" src="https://cdn.discordapp.com/attachments/360062738615107605/848939420622913556/unknown.png" />

# Features
- ### Displays periodically updated stats like CPU Usage, Memory, Storage and Battery stats
- ### View or share your pc stats to other devices
- ### Easy to host
- ### One of a kind
- ### Modular design


# Installation
Download the repo as a zip and extract it to a folder. Open a command prompt in that folder and and then run the command `npm install`  (needs [Node.js](https://nodejs.org/)).
- Rename the file `config_-_example.json` to `config.json`.
- Goto [Discord Developer Page](https://discord.com/developers/applications) and make a new application.
- Give it any name.
- Then go to the OAuth2 tab and copy the ClientID and paste it in the `config.json` file <img src="https://cdn.discordapp.com/attachments/360062738615107605/848953117269950534/unknown.png">
- Copy the token value from the Bot tab and paste it in the `config.json` file <img src="https://cdn.discordapp.com/attachments/360062738615107605/848953552876339248/unknown.png">


# Usage
Either run `start.cmd` or open a terminal and run `node server.js`
<br>
For the first run, click on the invite link in the terminal and add the bot to whichever server you want, then goto any channel in that server where you want the stats and type `s.start`

## Commands
- `s.help` - Shows a help message
- `s.ping` - Check API latency
- `s.start` - Start the bot (once only)


## config.json
This is the configuration file used by the program.

| Key        | Type    | Value                                                            |
| ---------- | ------- | ---------------------------------------------------------------- |
| token      | string  | The token of the bot from Discord Developer Page                 |
| clientID   | string  | The client ID of the bot from Discord Developer Page             |
| interval   | integer | The time in seconds to wait before updating the stats each time  |
| components | object  | An object with key as component name and value as enabled status |

## Available Components

| Name        | Description                                  |
| ----------- | -------------------------------------------- |
| battery     | Shows battery percentage and charging status |
| memoryUsage | Shows used memory and total memory           |
| cpuUsage    | Shows CPU usage percentage                   |
| storageUsage| Shows used storage and total storage       	 |

## Example config.json
```json
{
	"token": "your bot token",
	"clientID": "your bot client id",
	"interval": 30,
	"components": {
		"battery": true,
		"cpuUsage": true,
		"memoryUsage": true,
		"storageUsage": true
	}
}
```

## Bugs / Suggestions
Report any bugs / glitches, or make a suggestion using the github issues section or join the support server [Join Server](https://discord.gg/FZY9TqW).

## Other bots
Check out my other bots
- [Delano Tatusmi](https://delano-tatsumi.herokuapp.com)
- [House Builder](https://house-builder.herokuapp.com)

## Support
Join the Discord Server: [3ddelano Cafe](https://discord.gg/FZY9TqW)
<br>
Support the creator
<br>
<a href="https://www.buymeacoffee.com/3ddelano" target="_blank"><img height="41" width="174" src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" width="150" ></a>