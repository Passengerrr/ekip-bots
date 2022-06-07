const { MessageEmbed } = require("discord.js");
const { MessageButton,MessageActionRow } = require('discord-buttons');
const moment = require("moment");
moment.locale("tr");
const passengerayar = require('../../configs/sunucuayar.json')
const { green, red } = require("../../configs/emojis.json")

module.exports = {
    conf: {
      aliases: ["git"],
      name: "git",
      help: "git"
    },
  
run: async (client, message, args, embed, prefix) => {

  if (!message.member.voice.channelID) return message.lineReply("Bir ses kanalında olmalısın!", message.author, message.channel);
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  if (!member) return message.lineReply("Bir üye etiketle ve tekrardan dene!", message.author, message.channel);
  if (!member.voice.channelID) return message.lineReply("Bu kullanıcı herhangi bir ses kanalında bulunmuyor!", message.author, message.channel);
  if (message.member.voice.channelID === member.voice.channelID) return message.lineReply("Zaten aynı kanaldasınız!", message.author, message.channel);
  
   var onaylaa = new MessageButton()
      .setID("onay")
      .setLabel("Kabul Et")
      .setStyle("green")
      .setEmoji("915754671728132126")

      var reddett = new MessageButton()
      .setID("red")
      .setLabel("Reddet")
      .setStyle("red")
      .setEmoji("915754675742081076")

      var işlembaşarılı = new MessageButton()
      .setID("başarılı")
      .setLabel("İşlem Başarılı")
      .setStyle("green")
      .setDisabled(true);

      var işlembaşarısız = new MessageButton()
      .setID("başarısız")
      .setLabel("İşlem Başarısız")
      .setStyle("red")
      .setDisabled(true);

      const row = new MessageActionRow()
      .addComponent(onaylaa)
      .addComponent(reddett)

      const row2 = new MessageActionRow()
      .addComponent(işlembaşarılı)

      const row3 = new MessageActionRow()
      .addComponent(işlembaşarısız)

  if (message.member.permissions.has("ADMINISTRATOR")) {
      message.member.voice.setChannel(member.voice.channel)
      message.react(green)
      message.lineReply(embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author}, ${member} kişisinin yanınıza gittiniz.`))
      const log = embed
      .setColor("#2f3136")
      .setDescription(`
      Bir Transport işlemi gerçekleşti.
  
      Odaya Giden Kullanıcı: ${member} - \`${member.id}\`
      Odasına Gidilen Yetkili: ${message.author} - \`${message.author.id}\`
      `)
      .setFooter(`${moment(Date.now()).format("LLL")}`)
    message.guild.channels.cache.get(passengerayar.voiceLogChannel).wsend(log);
} else {    

let passenger = new MessageEmbed()
.setDescription(`${member}, ${message.author} \`${message.member.voice.channel.name}\` odasına gelmek istiyor. Kabul ediyor musun?`)
.setFooter(`Lütfen 30 saniye içerisinde işlem iptal edilecektir.`)
.setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true }))
 
let msg = await message.channel.send((member.toString()), { components : [ row ], embed: passenger})

    var filter = (button) => button.clicker.user.id === member.user.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 30000 })

      collector.on("collect", async (button) => {

if(button.id == "onay") {

await button.reply.defer()

const embeds = new MessageEmbed() 

    .setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setTimestamp()
    .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setDescription(`${message.author}, ${member} kişisinin yanına başarıyla gittiniz.`)
    message.member.voice.setChannel(member.voice.channel)

msg.edit({
embed: embeds,
components : row2
})

}

if(button.id == "red") {

await button.reply.defer()

const embedss = new MessageEmbed() 
.setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setTimestamp()
.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
.setDescription(`${message.author}, ${member} yanına gitme işlemi iptal edildi.`)

msg.edit({
embed: embedss,
components : row3
})
    }
 });

}
}
}