const moment = require("moment");
const cezapuan = require("../../schemas/cezapuan")
const ceza = require("../../schemas/ceza")
moment.locale("tr");
const conf = require("../../configs/sunucuayar.json")
const settings = require("../../configs/settings.json")
const { red, green } = require("../../configs/emojis.json");
const messageUserChannel = require("../../schemas/messageUserChannel");
module.exports = {
  conf: {
    aliases: ["cezapuan","cp"],
    name: "cezapuan",
    help: "cezapuan"
  },

  run: async (client, message, args, embed) => {
if (!message.member.hasPermission("BAN_MEMBERS") &&  !conf.banHammer.some(x => message.member.roles.cache.has(x))) { message.channel.send("Yeterli yetkin bulunmuyor!").then(x=>x.delete({timeout:5000}))
message.react(red)
return 
}
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
if (!member) { message.channel.send( "Böyle bir kullanıcı bulunamadı!").then(x=>x.delete({timeout:5000}))
message.react(red)
return 
}
const cezaData = await ceza.findOne({ guildID: settings.guildID, userID: member.id });
const cezapuanData = await cezapuan.findOne({ guildID: settings.guildID, userID: member.user.id });
message.react(green)
message.lineReply(`${member} kişisinin toplamda \`${cezapuanData ? cezapuanData.cezapuan : 0}\` ceza puanı ve (Toplam **${cezaData ? cezaData.ceza.length : 0}** Ceza) olarak gözükmekte!`)
},
};

