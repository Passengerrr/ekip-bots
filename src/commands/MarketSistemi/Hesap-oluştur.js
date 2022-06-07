const Discord = require('discord.js') 
const passenger = require("../../schemas/dolar");
const { altin, altin2, rewards } = require("../../configs/emojis.json")
let ms = require("parse-ms");

module.exports = {
    conf: {
      aliases: ["hesapoluştur","hesap-oluştur"],
      name: "hesapoluştur",
      help: "hesapoluştur"
    },
  
run: async (client, message, args) => {

   if (!message.guild) return;

		let kanallar = ["coin-komut", "bot-commands"]
	if (!kanallar.includes(message.channel.name)) return message.lineReply(`${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`).then(x => x.delete({timeout: 10000}));
	
	let data = await passenger.findOne({userID: message.author.id, guildID: message.guild.id});

  if(data) {
    message.lineReply("Zaten daha önceden bir hesap oluşturmuşsun!")
     } 
     else
  if(!data) {
    await passenger.findOneAndUpdate({userID: message.author.id, guildID: message.guild.id}, {$inc: {dolar: 500}}, {upsert: true})
    message.lineReply(`başarı ile coin hesabını oluşturdun, oyunlarımızı deneyimlemen için hesabına **500** hediye coin yolladım. İyi eğlenceler!`)
 }
}}