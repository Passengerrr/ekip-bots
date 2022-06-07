const cezapuan = require("../../schemas/cezapuan");
const ceza = require("../../schemas/ceza")
const moment = require("moment")
moment.locale("tr");
const { red , green} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["cezapuansıfırla","cezapuantemizle","cezapsil","cezaptemizle","cptemizle","cptemizle","cpsil"],
    name: "cezapuansil",
    help: "cezapuansil",
  },

  run: async (client, message, args, embed, prefix) => {
if (!message.member.hasPermission('ADMINISTRATOR'))
{
message.lineReply("Bu işlemi yapamazsın dostum!").then(x=>x.delete({timeout: 5000}))
message.react(red)
return;
}
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member)
{
message.lineReply("Ceza puanını sıfırlamamı istediğin kişiyi etiketle!").then(x=>x.delete({timeout:5000}))
message.react(red)
return;
}
const cezapuanData = await cezapuan.findOne({userID: member.user.id, guildID: message.guild.id})
const cezaData = await ceza.findOne({userID: member.user.id, guildID: message.guild.id})
if(!cezapuanData && !cezaData)
{
message.react(red)
message.lineReply(`${member} kişisinin ceza puanı zaten yok!`)
return;
}
message.react(green)
message.lineReply(`${green} ${member} üyesinin ceza puanı ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`)
await cezapuan.deleteMany({userID: member.user.id, guildID: message.guild.id})
await ceza.deleteMany({userID: member.user.id, guildID: message.guild.id})
}
};
