const Discord = require("discord.js");
const { BOT_TOKEN } = require('./config')

const client = new Discord.Client();
const BOT_CHANNEL_ID_KS = '742771191185408100' 
const BOT_CHANNEL_ID_DEV = '261376661998534666'

client.on("ready", () => {
  console.log("WG Code URL Bot is ready.");
});

client.on("message", (message) => {

  // ignore messages from all bots
  if (message.author.bot) return;

  // ignore messages from all channels except for the specified bot channel
  if (message.channel.id !== BOT_CHANNEL_ID_KS && message.channel.id !== BOT_CHANNEL_ID_DEV) return;

  // regex will match on any string of capital letters and numbers that are more than 5 characters long
  let regex = /([A-Z0-9]{5,})/g

  // look for codes
  let codes = message.content.match(regex)

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

client.login(BOT_TOKEN);