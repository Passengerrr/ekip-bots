const disbut = require("discord-buttons");
 const { MessageEmbed } = require('discord.js');
const { star, kirmiziok } = require("../../configs/emojis.json")
let ayar = require("../../configs/sunucuayar.json"); 
let sunucu = require("../../configs/settings.json");  
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    conf: {
      aliases: ["control"],
      name: "control",
      help: "control"
    },
  
    run: async (client, message, args, durum, kanal) => {
let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author);

    if(!ayar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) 
    { 
    message.lineReply(`Yetkin bulunmamakta dostum. `).then(x=> x.delete({timeout: 5000})) 
    return }
 
       let ekipRolu = "982540417574789161"
 
    let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tag) && !s.roles.cache.has(ekipRolu))
    let et = message.guild.members.cache.filter(member => !member.roles.cache.has(ayar.cekilis) || !member.roles.cache.has(ayar.etkinlik)).size;
    let passengercim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

let ecdagit = new disbut.MessageButton().setStyle('red').setLabel('Etkinlik/Çekiliş Rol Dağıt').setID('ecdagit')
let tagrol = new disbut.MessageButton().setStyle('green').setLabel('Tag Rol Dağıt').setID('tagrol')
let kayıtsızdagit = new disbut.MessageButton().setStyle('blurple').setLabel('Kayıtsız Rol Dağıt').setID('kayıtsızdagit')

let passenger = new MessageEmbed()
.setDescription(`
${message.member.toString()}, \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` rolü olmayan üyelerin rol dağıtım tablosu aşağıda belirtilmiştir.
`)

.addFields(
{ name: "__**Etkinlik/Çekiliş Rol**__", value: `
\`\`\`fix
${et} kişi
\`\`\`
`, inline: true },
{ name: "__**Taglı Rol**__", value: `
\`\`\`fix
${taglilar.size} kişi
\`\`\`
`, inline: true },
{ name: "__**Kayıtsız Rol**__", value: `
\`\`\`fix
${passengercim.size} kişi
\`\`\`
`, inline: true }
)

.setColor("BLACK")
.setFooter(message.author.tag, message.author.avatarURL())
.setTimestamp()
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
 
 
  let msg = await message.channel.send({ buttons : [ecdagit,tagrol,kayıtsızdagit], embed: passenger})
 
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 30000 })

      collector.on("collect", async (button) => {

    if (button.id === 'ecdagit') {
 
    let passenger = message.guild.members.cache.filter(member => !member.roles.cache.has(ayar.etkinlik) || !member.roles.cache.has(ayar.cekilis))
    button.reply.send(`
Etkinlik/Çekiliş rolü olmayan ${passenger.size} kullanıcıya etkinlik, çekiliş rolleri verildi ! `)
        message.guild.members.cache.filter(member => !member.roles.cache.has(ayar.etkinlik) || !member.roles.cache.has(ayar.cekilis)).map(x=> x.roles.add([ayar.etkinlik, ayar.cekilis]));
    }


    if (button.id === 'tagrol') {
 
      let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tag) && !s.roles.cache.has(ekipRolu))

    button.reply.send(`
Tagı olup rolü olmayan ${taglilar.size} kullanıcıya rol verildi.

Tag Rolü verilen kullanıcılar;
${taglilar.map(x => x || "Rolü olmayan Kullanıcı bulunmamaktadır.")}`)

    message.guild.members.cache.filter(s => s.user.username.includes(ayar.tag) && !s.roles.cache.has(ekipRolu)).map(x=> x.roles.add(ayar.ekipRolu))                
    }

    if (button.id === 'kayıtsızdagit') {
 
    let passengercim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

    button.reply.send(`
Kayıtsız rolü olmayan ${passengercim.size} kullanıcıya kayıtsız rolü verildi !

Kayıtsız Rolü verilen kullanıcılar;
${passengercim.map(x => x || "Rolü olmayan Kullanıcı bulunmamaktadır.")} `)

    message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0).map(x=> x.roles.add(ayar.unregRoles))

    }

  });
}
}