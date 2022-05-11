const Discord = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on("ready", () => {
  console.log("WG Code URL Bot is ready.");
});

client.on("messageCreate", (message) => {

  // ignore messages from all bots
  if (message.author.bot) return;

  // ignore messages from all channels except for the specified bot channel
  if (message.channel.id !== process.env.BOT_CHANNEL_ID_KS && message.channel.id !== process.env.BOT_CHANNEL_ID_DEV) return;

  // ignore messages that have more than 5 digits in a row, as these are probably just id numbers for emoji/reactions/etc
  let idRegex = /([0-9]{5,})/g

  // look for id numbers
  let idNums = message.content.match(idRegex)

  // store the message content for later use
  let messageContentNoIds = message.content

  // if id numbers were found, we will slice those out of the message content so that any WG codes will still be transformed
  if (idNums) {

    // iterate through all found id numbers 
    for (let id of idNums) {
      
      // find the id's start and end index
      let start = messageContentNoIds.indexOf(id)
      let end = start + id.length

      // slice those id numbers out
      messageContentNoIds = messageContentNoIds.slice(0, start) + messageContentNoIds.slice(end)
    }
  }

  // regex will match on any string of capital letters and numbers that are more than 5 characters long
  let regex = /([A-Z0-9]{5,})/g

  // look for codes
  let codes = messageContentNoIds.match(regex)

  // return if no codes found
  if (!codes) return;

  // Declare starting text for the bot's message
  let botMsg = `WG code detected...here's your link:\n`

  // loop through all matches
  for (const code of codes) {
    botMsg += `https://na.wargaming.net/shop/redeem/?bonus_mode=${code}\n`
  }

  // send the bot's message
  message.channel.send(botMsg)

});

client.login(process.env.BOT_TOKEN);