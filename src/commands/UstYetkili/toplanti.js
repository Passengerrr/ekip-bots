const moment = require("moment");
moment.locale("tr");
const { red, green } = require("../../configs/emojis.json")
const conf = require("../../configs/sunucuayar.json")
module.exports = {
  conf: {
    aliases: ["toplanti","toplantı","yoklama"],
    name: "toplantı",
    help: "toplantı"
  },

  run: async (client, message, args, embed) => {
if (!message.member.hasPermission('ADMINISTRATOR')) return;
let toplantiChannel = conf.toplantiSesChannel
let katıldıRolü = conf.katildiRole
let uyarıRolü = conf.uyariRole
let mazeretRolu = conf.mazaretliRole
let enaltyt = message.guild.roles.cache.get(conf.enAltYetkiliRole)
if(!args[0]) 
{
message.react(red)
message.channel.send(`Mazaretli birisini belirtmek için : **.toplantı mazeretli**. Toplantı başlatmak için **.toplantı başlat**.`).then(x=>x.delete({timeout: 5000}))
return
}
if(args[0] == "mazeretli" || args[0] == "mazeret")
{
let member = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
if(!member) {
message.react(red)
message.channel.send(`Kimin mazeretli olduğunu belirtmeyi unuttun dostum.`).then(x=>x.delete({timeout:5000}))
return
}
const reason = args.slice(2).join(" ");
if(!reason) 
{
message.react(red)
message.channel.send(`Bu üye neden mazeretli ? Belirtip tekrar dener misin ?`).then(x=> x.delete({timeout:5000}))
return
}
message.react(green)
message.channel.send(`${member} kişisi ${reason} sebebiyle mazeretli olarak kaydedildi.`).then(x=>x.delete({timeout:50000}))
client.channels.cache.get(conf.mazaretliLogChannel).wsend(`${member} yetkilisinin mazereti ${message.author} tarafından \`${reason}\` sebebiyle kabul edildi.`)
await member.roles.add(mazeretRolu).catch({ })
} 
if(args[0] == "başlat" || args[0] == "başla") {
let sestekiler = message.guild.members.cache.filter(x => x.roles.highest.position >= enaltyt.position).filter(s => s.voice.channelID === toplantiChannel)
let sesteolmayanlar = message.guild.members.cache.filter(x => x.roles.highest.position >= enaltyt.position).filter(s => s.voice.channelID !== toplantiChannel).filter(a => !a.roles.cache.has(mazeretRolu))
sestekiler.array().forEach((uye, index) => {
setTimeout(async() => {
uye.roles.add(katıldıRolü)
}, index * 750)
})
sesteolmayanlar.array().forEach((uye, index) => {
setTimeout(async() => {
uye.roles.add(uyarıRolü)
}, index * 750)
})
let mazeretli = message.guild.roles.cache.get(mazeretRolu).members.size
message.channel.send(embed.setDescription(`
Katıldı rolü verilecek yetkili sayısı: **${sestekiler.size}**
Katıldı rolü alınacak yetkili sayısı: **${sesteolmayanlar.size}**
Mazereti olan yetkilili sayısı : **${mazeretli}**

Seste olmayan yetkililere <@&${conf.uyariRole}> rolü dağıtılmaya başlandı! Seste olan yetkililere <@&${conf.katildiRole}> rolü dağıtılmaya başlandı!
Seste olmayan yetkililere dm atmak için lütfen \`.toplantı çağır\` komutunu kullanın!
`))
}
if(args[0] == "çağır") {
let sesteolmayanlar = message.guild.members.cache.filter(x => x.roles.highest.position >= enaltyt.position).filter(s => s.voice.channelID !== toplantiChannel).filter(a => !a.roles.cache.has(mazeretRolu))
if(sesteolmayanlar.length == 0 ) return message.channel.send(`Ses olmayan yetkili yok!`).then(x=>x.delete({timeout:6000}))
let mesaj = await message.channel.send(`Seste olmayan ${sesteolmayanlar.size} kişiye dmden bildirim geçiyorum!`)
var filter = m => m.author.id === message.author.id && m.author.id !== client.user.id && !m.author.bot;
sesteolmayanlar.forEach((yetkili, index) => {
setTimeout(() => {
yetkili.send(message.guild.name+' Sunucusunda toplantı başladı. Yetkili olduğun halde toplantıda değilsin. Eğer toplantıya girmezsen yetkilerin alınacaktır.').then(x => mesaj.edit(embed.setDescription(`${yetkili} yetkilisine özelden mesaj atıldı!`)).catch(err => message.channel.send(`${yetkili}, Sunucuda toplantı başladı. Yetkili olduğun halde toplantıda değilsin. Eğer toplantıya girmezsen yetkilerin alınacaktır.`).then(x => mesaj.edit(embed.setDescription(`${yetkili} yetkilisine özelden mesaj atılamadığı için kanalda etiketlendi!`)))));
}, index*1000);
})
}
  
}}
