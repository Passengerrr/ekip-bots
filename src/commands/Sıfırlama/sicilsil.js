const penals = require("../../schemas/penals");
const moment = require("moment")
moment.locale("tr");
const { red , green} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["sicilsıfırla","siciltemizle"],
    name: "sicilsil",
    help: "sicilsil",
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
message.lineReply("Sicilini sıfırlamamı istediğin kişiyi etiketle!").then(x=>x.delete({timeout:5000}))
message.react(red)
return;
}
const penalData = await penals.findOne({userID: member.user.id, guildID: message.guild.id}).sort({ date: -1 });
if(penalData === 1)
{
message.react(red)
message.lineReply(`${member} kişisinin sicili zaten temiz!`)
return;
}
message.react(green)
message.lineReply(`${green} ${member} üyesinin sicili ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`)
await penals.deleteMany({userID: member.user.id, guildID: message.guild.id})
}
};
