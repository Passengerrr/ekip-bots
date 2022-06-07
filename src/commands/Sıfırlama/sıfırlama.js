const moment = require("moment");
const cezapuans = require("../../schemas/cezapuan");
const ceza = require("../../schemas/ceza")
const name = require("../../schemas/names");
const penals = require("../../schemas/penals");
require("moment-duration-format");
const conf = require("../../configs/sunucuayar.json");
const { kirmiziok, green, red ,star } = require("../../configs/emojis.json");
const { TeamMember, MessageEmbed } = require("discord.js");
const { MessageButton,MessageActionRow } = require('discord-buttons');

module.exports = {
  conf: {
    aliases: ["sf","sıfırla"],
    name: "sıfırla",
    help: "sıfırla"
  },

  run: async (client, message, args, embed) => {
if (!message.member.hasPermission('ADMINISTRATOR'))
{
message.lineReply("Bu işlemi yapamazsın dostum!").then(x=>x.delete({timeout: 5000}))
message.react(red)
return;
}
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
     
    var DeleteName = new MessageButton()
    .setLabel("İsim Sıfırla")
    .setID("isim_sıfırla")
    .setStyle("blurple")

    var DeletePenalty = new MessageButton()
    .setLabel("Ceza Puan Sıfırla")
    .setID("cezapuan_sıfırla")
    .setStyle("green")

    var DeletePenal = new MessageButton()
    .setLabel("Sicil Sıfırla")
    .setID("sicil_sıfırla")
    .setStyle("red")

    var Iptal = new MessageButton()
    .setLabel("İptal")
    .setID("iptal_button")
    .setStyle("gray")
    .setEmoji("909485171240218634")

    const row = new MessageActionRow()
    .addComponents(DeleteName, DeletePenalty, DeletePenal, Iptal)

embed.setDescription(`
${message.author} Sıfırlama Paneline Hoşgeldiniz.

\`\`\`diff
- İsim Sıfırlama
- Ceza Puan Sıfırlama
- Sicil Sıfırlama
\`\`\`
${member.toString()} üyesine ait sıfırlamak istediğin veriyi aşağıdaki butonlar yardımıyla sıfırlayabilirsiniz.
`)
  

   

    let msg = await message.channel.send(embed, { components: [row] });
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 99999999 })
    collector.on("collect", async (button) => {

      if(button.id === "isim_sıfırla") {
        await button.reply.defer()
        await name.deleteMany({userID: member.user.id, guildID: message.guild.id})
      const isim = new MessageEmbed()
      .setDescription(`${green} ${member.toString()} üyesinin isim geçmişi ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`)

msg.edit({
  embed : isim,
  components : null
})
      
      }

  if(button.id === "cezapuan_sıfırla") {
    await button.reply.defer()
    await cezapuans.deleteMany({userID: member.user.id, guildID: message.guild.id})
    await ceza.deleteMany({userID: member.user.id, guildID: message.guild.id})
    const cezapuan = new MessageEmbed()
    .setDescription(`${green}  ${member.toString()} üyesinin ceza puanı ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 


msg.edit({
  embed: cezapuan,
  components : null
})  
    }
 if(button.id === "sicil_sıfırla") {   
    await button.reply.defer()
    await penals.deleteMany({userID: member.user.id, guildID: message.guild.id})
    const sicil = new MessageEmbed()
    .setDescription(`${green}  ${member.toString()} üyesinin sicili ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 

msg.edit({
  embed: sicil,
  components : null
})  
    }

 if(button.id === "iptal_button") {   
    await button.reply.defer()
    const iptal = new MessageEmbed()
    .setDescription(`${green} Sıfırlama işlemi iptal edildi`) 

msg.edit({
  embed: iptal,
  components : null
})  
    }


  })
  }
};