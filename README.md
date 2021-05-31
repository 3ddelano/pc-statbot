# PC STAT BOT
A self hosted Discord bot to display your pc stats.
<br>
<img alt="Nodejs" src="https://img.shields.io/badge/-Node.js-43853d?style=flat-square&logo=Node.js&logoColor=white" />
<br>
<img alt="screenshot" src="https://cdn.discordapp.com/attachments/360062738615107605/848939420622913556/unknown.png" />

# Features
- #### Displays stats like CPU Usage, Memory and Battery stats
- #### Easy to host
- #### One of a kind


# Installation
Download the repo as a zip and extract it to a folder. Open a command prompt in that folder and and then run the command `npm install`  (needs [Node.js](https://nodejs.org/)).
- Rename the file `config_-_example.json` to `config.json`.
- Goto [Discord Developer Page](https://discord.com/developers/applications) and make a new application.
- Give it any name and then click on the Bot tab on the left.
- Copy the token value and put it in the `config.json` file.


# Usage
Either run `start.cmd` or open a terminal and run `node server.js`
For the first run, goto any channel you want the stats to appear and type `s.start`

## Commands
- `s.help` - Shows a help message
- `s.ping` - Check API latency
- `s.start` - Start the bot (once only)


## config.json
This is the configuration file used by the program.

| Key      | Type    | Value                                                           |
| -------- | ------- | --------------------------------------------------------------- |
| token    | string  | The token of the bot from Discord Developer Page                |
| interval | integer | The time in seconds to wait before updating the stats each time |

## Bugs / Suggestions
Report any bugs / glitch, or make a suggestion using the github issues section or join the support server [Join Server](https://discord.gg/FZY9TqW).

## Support
Join the Discord Server: [3ddelano Cafe](https://discord.gg/FZY9TqW)
<br>
Support the creator
<br>
<a href="https://www.buymeacoffee.com/3ddelano" target="_blank"><img height="41" width="174" src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" width="150" ></a>