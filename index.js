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

client.login(BOT_TOKEN);