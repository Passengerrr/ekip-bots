const conf = require("../../configs/sunucuayar.json")
const moment = require("moment")
moment.locale("tr");
const { red , green} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["tasarımcı","designer"],
    name: "tasarımcı",
    help: "tasarımcı",
  },

  run: async (client, message, args, embed, prefix) => {
if (!message.member.hasPermission("BAN_MEMBERS") &&  !conf.rolverici.some(x => message.member.roles.cache.has(x))) { message.channel.send("Yeterli yetkin bulunmuyor!").then(x=>x.delete({timeout:5000}))
message.react(red)
return }
let member = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
if (!member) { message.channel.send( "Böyle bir kullanıcı bulunamadı!").then(x=>x.delete({timeout:5000}))
message.react(red)
return }
if(!member.roles.cache.has(conf.tasarımcı)){
message.react(green)
message.lineReply(`${member} kişisine başarıyla <@&${conf.tasarımcı}> rolü verildi!`).then(x=>x.delete({timeout:5000}))
await member.roles.add(conf.tasarımcı)
} else {
message.react(green)
message.lineReply(`${member} kişisinden başarıyla <@&${conf.tasarımcı}> rolü alındı!`).then(x=>x.delete({timeout:5000}))
await member.roles.remove(conf.tasarımcı)
}}
};