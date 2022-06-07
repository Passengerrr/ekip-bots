const { MessageEmbed } = require("discord.js")
const { red , green } = require("../configs/emojis.json")
const Log = require("../configs/sunucuayar.json")
const roller = require("../schemas/rolveridb")
var moment = require('moment-timezone');
moment().tz("Europe/Istanbul").format('LL');
module.exports = async (oldMember, newMember) => {
await newMember.guild.fetchAuditLogs({
type: "MEMBER_ROLE_UPDATE"
}).then(async (audit) => {
let ayar = audit.entries.first()
let hedef = ayar.target
let yapan = ayar.executor
if (yapan.bot) return
newMember.roles.cache.forEach(async role => {
if (!oldMember.roles.cache.has(role.id)) {
const emed = new MessageEmbed()
.setAuthor(hedef.tag, hedef.displayAvatarURL({ dynamic: true }))
.setColor("RANDOM")
.setDescription(`Kişinin eklenen ve alınan tüm rollerine bakmak için \`!rollog @Passenger\` komutunu kullanın \n
**Rol Eklenen kişi**\n ${hedef} - **${hedef.id}** `)
.addField(`${green} Rolü Ekleyen Kişi`, `${yapan} - **${yapan.id}**`, false)
.addField(`${green} Eklenen Rol`, `${role} - **${role.id}**`, false)
.setFooter(yapan.tag, yapan.displayAvatarURL({ dynamic: true }))
.setTimestamp()
client.channels.cache.get(Log.rollogchannel).wsend(emed)
roller.findOne({
user: hedef.id
}, async (err, res) => {
if (!res) {
let arr = []
arr.push({
rol: role.id,
mod: yapan.id,
user: hedef.id,
tarih: moment(Date.now()).format("LLL"),
state: "Ekleme"
})
let newData = new roller({
user: hedef.id,
roller: arr
})
newData.save().catch(e => console.log(e))
} else {
res.roller.push({
rol: role.id,
mod: yapan.id,
user: hedef.id,
tarih: moment(Date.now()).format("LLL"),
state: "Ekleme"
})
res.save().catch(e => console.log(e))
}
})
}
});
oldMember.roles.cache.forEach(async role => {
if (!newMember.roles.cache.has(role.id)) {
const emeed = new MessageEmbed()
.setAuthor(hedef.tag, hedef.displayAvatarURL({ dynamic: true }))
.setColor("RANDOM")
.setDescription(`Kişinin alınan ve eklenen tüm rollerine bakmak için \`!rollog @Passenger\` komutunu kullanın \n
**Rolü Alınan kişi** \n${hedef} - **${hedef.id}**`)
.addField(`${red} Rolü Alan Kişi`, `${yapan} - **${yapan.id}**`, false)
.addField(`${red} Alınan Rol`, `${role} - **${role.id}**`, false)
.setFooter(yapan.tag, yapan.displayAvatarURL({ dynamic: true }))
.setTimestamp()
client.channels.cache.get(Log.rollogchannel).wsend(emeed)
roller.findOne({
user: hedef.id
}, async (err, res) => {
if (!res) {
let arr = []
arr.push({
rol: role.id,
mod: yapan.id,
user: hedef.id,
tarih: moment(Date.now()).format("LLL"),
state: "Kaldırma"
})
let newData = new roller({
user: hedef.id,
roller: arr
})
newData.save().catch(e => console.log(e))
} else {
res.roller.push({
rol: role.id,
mod: yapan.id,
user: hedef.id,
tarih: moment(Date.now()).format("LLL"),
state: "Kaldırma"
})
res.save().catch(e => console.log(e))
}
})
}
});
})
}
 module.exports.conf = {
name: "guildMemberUpdate",
  };