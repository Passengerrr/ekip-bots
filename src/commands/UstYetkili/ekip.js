const { green, red } = require("../../configs/emojis.json")
const ekipSchema = require('../../schemas/ekip');
const moment = require("moment")
const Guild = require("../../configs/sunucuayar.json");
const { MessageFlags } = require("discord.js");
module.exports = {
    conf: {
      aliases: ["ekip"],
      name: "ekip",
      help: "ekip"
    },
  
    run: async (client, message, args, embed) => {
if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).then(x=>x.delete({timeout:5000}));
const crews = await ekipSchema.findOne({ guildID: message.guild.id })

let secim = args[0];
if (!secim) { message.channel.send(embed.setDescription(`
**ekip:** Yardım menüsünü görürsünüz. 
**ekip ekle** Sunucuya yeni bir ekip eklersiniz.
**ekip liste** Sunucuda bulunan tüm ekipleri listelersiniz.
**ekip bilgi** Belirtilen ekibin bilgilerini görürsünüz.
**ekip kontrol** Belirtilen ekibin anlık aktifliklerine bakarsınız.
**ekip sil** Sunucuda olan bir ekibi çıkartırsınız.
`)).then(x => x.delete({ timeout: 10000 }));;
message.react(red)
return
}
let tag = args[1];
let sayitagi = args[2];
let yönetici = message.mentions.members.first() || message.guild.members.cache.get(args[3]);
        
        
        
if (secim === "ekle") {
if (!tag) 
{
message.channel.send(embed.setDescription(`Geçerli Bir kullanım şekli belirtmelisin. **!ekip ekle Tag - Etiket tagı - Ekip Yöneticisi** \n Örnek: !ekip ekle Shew 1404 @Passenger/Shew)`))
message.react(red)
return
}
if (!sayitagi || isNaN(sayitagi)) 
{
message.channel.send(embed.setDescription(`Etiket tagını eklemeyi unuttun **!ekip ekle Tag - Etiket tagı - Ekip Yöneticisi** \n Örnek: !ekip ekle ${Guild.Tag} 1404 @Passenger/Shew)`)).then(x => x.delete({ timeout: 3500 }));
message.react(red)
return
}
if (!yönetici) 
{
message.channel.send(embed.setDescription(`Ekip Yöneticisi Eklemeyi Unuttun. **!ekip ekle Tag - Etiket tagı - Ekip Yöneticisi** \n Örnek: !ekip ekle ${Guild.Tag} 1404 @Passenger/Shew))`)).then(x => x.delete({ timeout: 3500 }));
Message.react(red)
return
}        
message.guild.roles.create({
data: {
name: `${tag} #${sayitagi}`,
color: "RANDOM",
mentionable: false
},
reason: "Ekip Rolü"
}).then(async (role) => {
await ekipSchema.findOneAndUpdate({ guildID: role.guild.id }, { $push: { crewHouse: { EkipAdı: tag, Sayısı: sayitagi || "Yok", Yöneticisi: yönetici.id, tarih: moment(Date.now()).format("LLL"), EkipRolu: role.id } } }, { upsert: true });
message.channel.send(embed.setDescription(`
**Ekip başarı ile oluşturuldu! (${tag}, #${sayitagi}, ${yönetici}.)**
**Ekip Bilgileri**
Ekip Tagı:** ${tag}**
Ekip Etiket Tagı:** ${sayitagi}**
Ekip Sorumlusu-Yöneticisi:** ${yönetici}**
Ekibin Sunucuya Katıldığı Tarih:** ${moment(Date.now()).format("LLL")}**
Ekip Rolü** <@&${role.id}>**   
**Ekip tagındaki üyeler:**
Tagda (${tag}) bulunan kişi sayısı:** ${message.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(tag)).size}** kişi!
Etiket tagında (${sayitagi}) bulunan kişi sayısı** ${message.guild.members.cache.filter(m => m.user.discriminator.includes(sayitagi)).size}** kişi!
        
Toplam tag ve etiket tagında bulunan **${message.guild.members.cache.filter(m => m.user.discriminator.includes(sayitagi)).size + message.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(tag)).size}** kişi tespit edildi. Kişilere <@&${role.id}> Rolü dağıtılıyor!
`))
message.guild.members.cache.forEach(qwe => {
if (qwe.user.username.includes(tag)) {
qwe.roles.add(role.id)
}
})
message.guild.members.cache.forEach(qwe => {
if (qwe.user.discriminator.includes(sayitagi)) {
qwe.roles.add(role.id)
}
})
})
}
if (secim === "liste") {
let crewPage = crews.crewHouse.length > 0 ? crews.crewHouse.map((value) => `
**Ekip :** <@&${value.EkipRolu}>
**Ekip Kişi Sayısı :** ${message.guild.members.cache.filter(b => b.roles.cache.has(value.EkipRolu)).size}
**Ekip Kurucusu:** <@!${value.Yöneticisi}>
**Sunucumuza Katıldığı Tarih: **${value.tarih}
**Ekip Ses Aktifliği:** ${message.guild.members.cache.filter(s => s.user.discriminator.includes(value.Sayısı)).filter(s => s.voice.channel).size + message.guild.members.cache.filter(s => s.user.username.includes(value.EkipAdı)).filter(s => s.voice.channel).size || 0}
`).join("\n") : `Sunucumuzda henüz bir ekip yok`;
message.channel.send(embed.setFooter(`Sunucumuzda toplam ailemize katılmış ${crews.crewHouse.length} ekip var!`).setAuthor(`${message.guild.name}`, message.author.avatarURL({ dynamic: true })).setDescription(`${crewPage}`))
}
if (secim === "bilgi") {
if (!tag) 
{
message.channel.send(embed.setDescription("Sunucumuz da olan ekibin tagını belirtmelisin")).then(x => x.delete({ timeout: 3500 }));
message.react(red)
return 
}
const crews = await ekipSchema.findOne({ guildID: message.guild.id })         
const ekipler = crews.crewHouse.filter(a => a.EkipAdı == tag).map(a => `              
Aşağıda **${a.EkipAdı}** ekibinin tüm bilgileri gösteriliyor!
**Ekibin Tagı:** ${a.EkipAdı}
**Ekibin Sayı Tagı:** ${a.Sayısı}
**Ekibin Sorumlusu-Yöneticisi:** ${message.guild.members.cache.get(a.Yöneticisi) || message.guild.members.cache.get(a.Yöneticisi).user.tag}
**Ekibin Sunucuya Katılım Tarihi:** ${a.tarih}
**Ekibin Rolü:** <@&${a.EkipRolu}>`)
if (!ekipler) 
{
message.channel.send(embed.setDescription("Sunucumuz da olan ekibin tagını belirtmelisin")).then(x => x.delete({ timeout: 3500 }));
message.react(red)
return 
}
message.channel.send(embed.setDescription(`${ekipler}`))
}
if (secim === "kontrol") {
if (!tag) 
{
message.channel.send(embed.setDescription("Bir tag belirtmelisin.")).then(x => x.delete({ timeout: 3500 }));
message.react(red)
return
}
const crews = await ekipSchema.findOne({ guildID: message.guild.id })
const ekipler = crews.crewHouse.filter(a => a.EkipAdı == tag).map(a => `
Aşağıda **${a.EkipAdı}** Ekibinin Anlık Ses Aktiflikleri Ve Taglarındaki Üye Sayıları Gösteriliyor!

**Ekip Yöneticisi** ${message.guild.members.cache.get(a.Yöneticisi) || message.guild.members.cache.get(a.Yöneticisi).user.tag}
**Ekip Yöneticisi Ekibinin Başında mı?** \`${message.guild.members.cache.get(a.Yöneticisi).voice.channelID ? "Yönetici Seste" : "Yönetici Seste Değil"}
**İsminde Tag (${a.EkipAdı}) Olup Seste Olan Kişi Sayısı:** ${message.guild.members.cache.filter(s => s.user.username.toLowerCase().includes(a.EkipAdı)).filter(s => s.voice.channel).size || "0"}
**İsminde Etiket (#${a.Sayısı}) Tag Olup Seste Olan Kişi Sayısı:** ${message.guild.members.cache.filter(s => s.user.discriminator.includes(a.Sayısı)).filter(s => s.voice.channel).size || "0"}              
**Toplam Ses Aktifliği: (${a.EkipAdı} - #${a.Sayısı})** ${message.guild.members.cache.filter(s => s.user.discriminator.includes(a.Sayısı)).filter(s => s.voice.channel).size + message.guild.members.cache.filter(s => s.user.username.includes(a.EkipAdı)).filter(s => s.voice.channel).size || 0}`)
if (!ekipler) 
{
message.channel.send(embed.setDescription("Sunucumuzda olan geçerli bir ekip belirtmelisin."))
message.react(red)
return
}
message.channel.send(embed.setDescription(`${ekipler}`))
}
        
if (secim === "sil") {
if (!tag) 
{
message.channel.send(embed.setDescription("Sunucumuzda olan geçerli bir ekip tagı belirtmelisin")).then(x => x.delete({ timeout: 3500 }));
message.react(red)
return
}
const crews = await ekipSchema.findOne({ guildID: message.guild.id })
        
const ekipler = crews.crewHouse.filter(a => a.EkipAdı == tag).map(e => e.EkipAdı)
const amdin = crews.crewHouse.filter(a => a.EkipAdı == tag).map(e => e.Yöneticisi)
const role = crews.crewHouse.filter(a => a.EkipAdı == tag).map(e => e.EkipRolu)
if (!ekipler) 
{
message.channel.send(embed.setDescription("Sunucumuzda olan geçerli bir ekip belirtmelisin."))
message.react(red)
return
}
await message.guild.members.cache.get(`${amdin}`); message.channel.send(embed.setDescription(`Kurucusu olduğunuz (**${ekipler}**) **${message.guild.name}** Sunucudan çıkartıldı. Emekleriniz için teşekkürler, hayatınızın geri kalanında başarılar.`)).catch(e => { })
await message.channel.send(embed.setDescription(`**${ekipler}** **(${message.guild.members.cache.get(`${amdin}`)})** ekibi sunucumuzdan çıkartıldı.`)).catch(e => { })
await message.guild.roles.cache.get(`${role}`).delete({ reason: "Ekip Olarak Sunucudan Çıkarıldı" }).catch(e => { })
setTimeout(async () => { await ekipSchema.updateOne({ guildID: message.guild.id }, { $pull: { crewHouse: { EkipAdı: tag } } }) }, 4000);
}
}}
    
  
  