const Discord = require('discord.js') 
const passenger = require("../../schemas/dolar");
const { altin, altin2, rewards } = require("../../configs/emojis.json")
let ms = require("parse-ms");

module.exports = {
    conf: {
      aliases: ["günlük"],
      name: "daily",
      help: "daily"
    },
  
run: async (client, message, args) => {

   if (!message.guild) return;

		let kanallar = ["coin-komut", "bot-commands"]
	if (!kanallar.includes(message.channel.name)) return message.lineReply(`${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`).then(x => x.delete({timeout: 10000}));
	
	let data = await passenger.findOne({userID: message.author.id, guildID: message.guild.id});
  if(!data) return message.lineReply(`Hey! Günlük hediye almak ve oyunlarımızı oynamak için coin hesabı oluşturman gerekiyor.\n**!hesapoluştur** yazarak kendi hesabını oluşturabilirsin.`)

    let timeout = 1000*60*60*24
    const sayi = Math.floor(Math.random() * 450) + 1
    let gunluk = data.dolarTime
    if (gunluk !== null && timeout - (Date.now() - gunluk) > 0) {
        let time = ms(timeout - (Date.now() - gunluk));
        message.channel.send(`:stopwatch: **|** Hata! **${message.author.username}** Bu komutu ${time.hours} saat ${time.minutes} dakika ${time.seconds} saniye sonra kullanabilirsin.`)
    } else {
        await passenger.findOneAndUpdate({userID: message.author.id, guildID: message.guild.id}, {$inc: {dolar: sayi}, $set: {dolarTime: Date.now()}}, {upsert: true})
        message.channel.send(`${rewards} **|** Başarılı bir şekilde günlük ödülünü aldın. (Ödülün: **${sayi}** ${altin2} )`)
    }  
}}