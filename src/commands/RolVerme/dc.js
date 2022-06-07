const { red , green} = require("../../configs/emojis.json")
const conf = require("../../configs/sunucuayar.json")
module.exports = {
  conf: {
    aliases: ["dc","dogrulukcesaretlik"],
    name: "dc",
    help: "dc",
  },

  run: async (client, message, args, embed, prefix) => {
if (!message.member.hasPermission("BAN_MEMBERS") &&  !conf.rolverici.some(x => message.member.roles.cache.has(x))) { message.channel.send("Yeterli yetkin bulunmuyor!").then(x=>x.delete({timeout:5000}))
message.react(red)
return }
const user = message.mentions.users.first() || await client.fetchUser(args[0]);
if (!user) { message.channel.send( "Böyle bir kullanıcı bulunamadı!").then(x=>x.delete({timeout:5000}))
message.react(red)
return }
if(args[1] == "sorumlu") {
if (!user.roles.cache.has(conf.dcsorumlu)) {
message.react(green)
message.lineReply(`${user} üyesine <@&${conf.dcsorumlu}> rolü başarıyla verildi!`).then(x=>x.delete({timeout:5000}))
await user.roles.add(conf.dcsorumlu)
} else {
message.react(green)
message.lineReply(`${user} üyesinden başarıyla <@&${conf.dcsorumlu}> rolü alındı!`).then(x=>x.delete({timeout:5000}))
await user.roles.remove(conf.dcsorumlu)
}}
if(args[1] == "denetleyici") {
if(!user.roles.cache.has(conf.dcdenetleyici)) {
message.react(green)
message.lineReply(`${user} üyesine <@&${conf.dcdenetleyici}> rolü başarıyla verildi!`).then(x=>x.delete({timeout:5000}))
await user.roles.add(conf.dcdenetleyici)
} else {
message.react(green)
message.lineReply(`${user} üyesinden başarıyla <@&${conf.dcdenetleyici}> rolü alındı!`).then(x=>x.delete({timeout:5000}))
await user.roles.remove(conf.dcdenetleyici)
}}
if(args[1] == "cezalı") {
if(!user.roles.cache.has(conf.dccezalı)){
message.react(green)
message.lineReply(`${user} üyesine <@&${conf.dccezalı}> rolü başarıyla verildi!`).then(x=>x.delete({timeout:5000}))
await user.roles.add(conf.dccezalı)
} else {
message.react(green)
message.lineReply(`${user} üyesinden başarıyla <@&${conf.dccezalı}> rolü alındı!`).then(x=>x.delete({timeout:5000}))
await user.roles.remove(conf.dccezalı)
}
}
}
};
