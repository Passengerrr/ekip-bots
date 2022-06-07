const isim = require("../../schemas/names");
const moment = require("moment")
moment.locale("tr");
const { red , green} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["isimsıfırla","isimtemizle"],
    name: "isimsil",
    help: "isimsil",
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
message.lineReply("İsim geçmişini sıfırlamamı istediğin kişiyi etiketle!").then(x=>x.delete({timeout:5000}))
message.react(red)
return;
}
const isimData = await isim.findOne({userID: member.user.id, guildID: message.guild.id})
if(!isimData)
{
message.react(red)
message.lineReply(`${member} kişisinin isim geçmişi zaten yok!`)
return;
}
message.react(green)
message.lineReply(`${green} ${member} üyesinin isim geçmişi ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`)
await isim.deleteMany({userID: member.user.id, guildID: message.guild.id})
}
};
