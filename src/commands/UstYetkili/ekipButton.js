const { MessageEmbed, MessageAttachment } = require("discord.js");
const disbut = require('discord-buttons')
const conf = require("../../configs/settings.json")
module.exports = {
    conf: {
      aliases: ["ekip"],
      name: "ekip",
      help: "ekip"
    },
 run: async (client, message, args, durum, kanal) => {
  
let botcomamnds = "855159731176865812"
let tag = "†" 
  let ekiprol = ["855159733048311818","","","","","","","",""]
  let ekipetikettag = ["1983","","","","","","",""]
  let ekipisimtag = ["Shéw","","","","","","","",""]

  let rdagıt = new disbut.MessageButton().setStyle('green').setLabel(`Rol Dağıt`).setID('rdagıt')
  let sesteolmayanlar = new disbut.MessageButton().setStyle('green').setLabel(`Seste olmayanlar`).setID('sesteolmayanlar')
  let ekiptekiler = new disbut.MessageButton().setStyle('green').setLabel(`Ekip Üyeleri`).setID('ekiptekiler')

  let rdagıt2 = new disbut.MessageButton().setStyle('green').setLabel(`Rol Dağıt`).setID('rdagıt2')
  let sesteolmayanlar2 = new disbut.MessageButton().setStyle('green').setLabel(`Seste olmayanlar`).setID('sesteolmayanlar2')
  let ekiptekiler2 = new disbut.MessageButton().setStyle('green').setLabel(`Ekip Üyeleri`).setID('ekiptekiler2')

  let rdagıt3 = new disbut.MessageButton().setStyle('green').setLabel(`Rol Dağıt`).setID('rdagıt3')
  let sesteolmayanlar3 = new disbut.MessageButton().setStyle('green').setLabel(`Seste olmayanlar`).setID('sesteolmayanlar3')
  let ekiptekiler3 = new disbut.MessageButton().setStyle('green').setLabel(`Ekip Üyeleri`).setID('ekiptekiler3')

  let rdagıt4 = new disbut.MessageButton().setStyle('green').setLabel(`Rol Dağıt`).setID('rdagıt4')
  let sesteolmayanlar4 = new disbut.MessageButton().setStyle('green').setLabel(`Seste olmayanlar`).setID('sesteolmayanlar4')
  let ekiptekiler4 = new disbut.MessageButton().setStyle('green').setLabel(`Ekip Üyeleri`).setID('ekiptekiler4')
    
    if (!message.guild) return;
    if (durum) {

if (["bak"].includes(args[0])) {
    let ekip = new disbut.MessageMenuOption().setValue("ekip").setLabel(message.guild.roles.cache.get(ekiprol[0]).name).setEmoji("899290755703640084")
    let ekip2 = new disbut.MessageMenuOption().setValue("ekip2").setLabel(message.guild.roles.cache.get(ekiprol[1]).name).setEmoji("899290755703640084")
    let ekip3 = new disbut.MessageMenuOption().setValue("ekip3").setLabel(message.guild.roles.cache.get(ekiprol[2]).name).setEmoji("899290755703640084")
    let ekip4 = new disbut.MessageMenuOption().setValue("ekip4").setLabel(message.guild.roles.cache.get(ekiprol[3]).name).setEmoji("899290755703640084")
    /*let ekip5 = new disbut.MessageMenuOption().setValue("ekip5").setLabel(message.guild.roles.cache.get(ekiprol[4]).name).setEmoji("899290755703640084")
*/
    const menu = new disbut.MessageMenu()
.setID('menu')
.setPlaceholder('Ekipler.')
.setMaxValues(1)
.setMinValues(1)
.addOptions(ekip,ekip2,ekip3,ekip4)
    message.channel.send('Bilgisini görmek istediğiniz ekibin seçeneğine tıklayınız.',menu)
return;
}
  let embed = new MessageEmbed().setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(conf.botDurum).setColor("RANDOM")
  .setDescription(`Aşağıdaki ekip üyelerini'ı daha detaylı bir şekilde görmek için aşağıdaki komutu yazınız.
\`.ekip bak\`
  `)
  
  .addField(`${message.guild.roles.cache.get(ekiprol[0]).name}`,`\n
Toplam Üye: \`${message.guild.roles.cache.get(ekiprol[0]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${message.guild.roles.cache.get(ekiprol[0]).members.filter(x => x.presence.status !== "offline").size} kişi\`
Sesteki Üye: \`${message.guild.roles.cache.get(ekiprol[0]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
──────────────`, true)
.addField(`${message.guild.roles.cache.get(ekiprol[1]).name}`,`\n
Toplam Üye: \`${message.guild.roles.cache.get(ekiprol[1]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${message.guild.roles.cache.get(ekiprol[1]).members.filter(x => x.presence.status !== "offline").size} kişi\`
Sesteki Üye: \`${message.guild.roles.cache.get(ekiprol[1]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
──────────────`,true)
.addField(`${message.guild.roles.cache.get(ekiprol[2]).name}`,`\n
Toplam Üye: \`${message.guild.roles.cache.get(ekiprol[2]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${message.guild.roles.cache.get(ekiprol[2]).members.filter(x => x.presence.status !== "offline").size} kişi\`
Sesteki Üye: \`${message.guild.roles.cache.get(ekiprol[2]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
──────────────`,true)

.addField(`${message.guild.roles.cache.get(ekiprol[3]).name}`,`\n
Toplam Üye: \`${message.guild.roles.cache.get(ekiprol[3]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${message.guild.roles.cache.get(ekiprol[3]).members.filter(x => x.presence.status !== "offline").size} kişi\`
Sesteki Üye: \`${message.guild.roles.cache.get(ekiprol[3]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
──────────────`,true)
/*
.addField(`${message.guild.roles.cache.get(ekiprol[4]).name}`,`\n
Toplam Üye: \`${message.guild.roles.cache.get(ekiprol[4]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${message.guild.roles.cache.get(ekiprol[4]).members.filter(x => x.presence.status !== "offline").size} kişi\`
Sesteki Üye: \`${message.guild.roles.cache.get(ekiprol[4]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
──────────────`,true)
*/
  message.channel.send(embed)
}

  client.on("clickMenu", async menu  => {

    let führer = "840609792778567701"
    let owner = "855159702408396821"
    let soul = "855159703293919282"
    let hand = "855159707572371496"
    let çifttag = "855159708640608256"
    if (menu.clicker.member.permissions.has(8) || menu.clicker.member.roles.cache.get(führer)|| menu.clicker.member.roles.cache.get(owner)|| menu.clicker.member.roles.cache.get(soul)|| menu.clicker.member.roles.cache.get(hand)|| menu.clicker.member.roles.cache.get(çifttag)) {
        
    if (menu.values.includes("ekip")) {
        menu.reply.send(new MessageEmbed().setColor("RANDOM").setDescription(`
        **${menu.guild.roles.cache.get(ekiprol[0]).name}** Ekip Bilgileri:
        
Toplam Üye: \`${menu.guild.roles.cache.get(ekiprol[0]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${menu.guild.roles.cache.get(ekiprol[0]).members.filter(x => x.presence.status !== "offline").size || "0"} kişi\`
Sesteki Üye: \`${menu.guild.roles.cache.get(ekiprol[0]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
Seste Olmayan Üye: \`${menu.guild.roles.cache.get(ekiprol[0]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).size || "0"} kişi\`
        
Taglı Üye: \`${menu.guild.roles.cache.get(ekiprol[0]).members.filter(member => member.user.username.includes(tag)).size} kişi\`
Yetkili Üye: \`${menu.guild.roles.cache.get(ekiprol[0]).members.filter(member => member.roles.cache.get(botcomamnds)).size} kişi\`
        `) , {
            buttons: [rdagıt,sesteolmayanlar,ekiptekiler]
        })
    
    }
        
        if (menu.values.includes("ekip2")) {
            menu.reply.send(new MessageEmbed().setColor("RANDOM").setDescription(`
            **${menu.guild.roles.cache.get(ekiprol[1]).name}** Ekip Bilgileri:
            
Toplam Üye: \`${menu.guild.roles.cache.get(ekiprol[1]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${menu.guild.roles.cache.get(ekiprol[1]).members.filter(x => x.presence.status !== "offline").size || "0"} kişi\`
Sesteki Üye: \`${menu.guild.roles.cache.get(ekiprol[1]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
Seste Olmayan Üye: \`${menu.guild.roles.cache.get(ekiprol[1]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).size || "0"} kişi\`
            
Taglı Üye: \`${menu.guild.roles.cache.get(ekiprol[1]).members.filter(member => member.user.username.includes(tag)).size} kişi\`
Yetkili Üye: \`${menu.guild.roles.cache.get(ekiprol[1]).members.filter(member => member.roles.cache.get(botcomamnds)).size} kişi\`
            `) , {
                buttons: [rdagıt2,sesteolmayanlar2,ekiptekiler2]
            })}

            if (menu.values.includes("ekip3")) {
                menu.reply.send(new MessageEmbed().setColor("RANDOM").setDescription(`
                **${menu.guild.roles.cache.get(ekiprol[2]).name}** Ekip Bilgileri:
                
Toplam Üye: \`${menu.guild.roles.cache.get(ekiprol[2]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${menu.guild.roles.cache.get(ekiprol[2]).members.filter(x => x.presence.status !== "offline").size || "0"} kişi\`
Sesteki Üye: \`${menu.guild.roles.cache.get(ekiprol[2]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
Seste Olmayan Üye: \`${menu.guild.roles.cache.get(ekiprol[2]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).size || "0"} kişi\`
                
Taglı Üye: \`${menu.guild.roles.cache.get(ekiprol[2]).members.filter(member => member.user.username.includes(tag)).size} kişi\`
Yetkili Üye: \`${menu.guild.roles.cache.get(ekiprol[2]).members.filter(member => member.roles.cache.get(botcomamnds)).size} kişi\`
                `) , {
                    buttons: [rdagıt3,sesteolmayanlar3,ekiptekiler3]
                })}

                if (menu.values.includes("ekip4")) {
                    menu.reply.send(new MessageEmbed().setColor("RANDOM").setDescription(`
                    **${menu.guild.roles.cache.get(ekiprol[3]).name}** Ekip Bilgileri:
                    
Toplam Üye: \`${menu.guild.roles.cache.get(ekiprol[3]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${menu.guild.roles.cache.get(ekiprol[3]).members.filter(x => x.presence.status !== "offline").size || "0"} kişi\`
Sesteki Üye: \`${menu.guild.roles.cache.get(ekiprol[3]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
Seste Olmayan Üye: \`${menu.guild.roles.cache.get(ekiprol[3]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).size || "0"} kişi\`
                    
Taglı Üye: \`${menu.guild.roles.cache.get(ekiprol[3]).members.filter(member => member.user.username.includes(tag)).size} kişi\`
Yetkili Üye: \`${menu.guild.roles.cache.get(ekiprol[3]).members.filter(member => member.roles.cache.get(botcomamnds)).size} kişi\`
                    `) , {
                        buttons: [rdagıt4,sesteolmayanlar4,ekiptekiler4]
                    })}
                                
                            }})

client.on('clickButton', async (button) => {
   

    let führer = "840609792778567701"
    let owner = "855159702408396821"
    let soul = "855159703293919282"
    let hand = "855159707572371496"
    let çifttag = "855159708640608256"
    if (button.clicker.member.permissions.has(8) ||button.clicker.member.roles.cache.get(führer)|| button.clicker.member.roles.cache.get(owner)|| button.clicker.member.roles.cache.get(soul)|| button.clicker.member.roles.cache.get(hand)|| button.clicker.member.roles.cache.get(çifttag)) {
       
 

                if (button.id === 'rdagıt') {
                    let dagit = button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[0])+member.user.discriminator.includes(ekipetikettag[0])&& !member.roles.cache.has(ekiprol[0]))
button.reply.send(`Ekip tagı olup rolü olmayan ${dagit.size} kullanıcıya rol verildi.
                    
Rol verilen kullanıcılar;
${dagit.map(x => x || "Rolü olmayan bulunamadı.")}`)
button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[0])+member.user.discriminator.includes(ekipetikettag[0])&& !member.roles.cache.has(ekiprol[0])).map(x=>x.roles.add(ekiprol[0]))                
                }
 if (button.id === 'sesteolmayanlar') {
button.reply.send(`Aktif olup seste olmayan kişiler;
                    
${button.guild.roles.cache.get(ekiprol[0]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).map(x=> x)}`)
                }
                if (button.id === 'ekiptekiler') {
                    let rol = button.guild.roles.cache.get(ekiprol[0])
button.reply.send(`Ekip üyeleri ${rol.members.size} kişi;
                    
${rol.members.size < 200 ? rol.members.map(x => `${x} (\`${x.id}\`)`).join("\n") : "200'den fazla kişi olduğu için listeleyemiyorum."}`,{
    split: true
})
}


if (button.id === 'rdagıt2') {
    let dagit = button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[1])+member.user.discriminator.includes(ekipetikettag[1])&& !member.roles.cache.has(ekiprol[1]))
button.reply.send(`Ekip tagı olup rolü olmayan ${dagit.size} kullanıcıya rol verildi.
    
Rol verilen kullanıcılar;
${dagit.map(x => x || "Rolü olmayan bulunamadı.")}`)
button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[1])+member.user.discriminator.includes(ekipetikettag[1])&& !member.roles.cache.has(ekiprol[1])).map(x=>x.roles.add(ekiprol[1]))                
}
if (button.id === 'sesteolmayanlar2') {
button.reply.send(`Aktif olup seste olmayan kişiler;
    
${button.guild.roles.cache.get(ekiprol[1]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).map(x=> x)}`)
}
if (button.id === 'ekiptekiler2') {
    let rol = button.guild.roles.cache.get(ekiprol[1])
button.reply.send(`Ekip üyeleri ${rol.members.size} kişi;
    
${rol.members.size < 200 ? rol.members.map(x => `${x} (\`${x.id}\`)`).join("\n") : "200'den fazla kişi olduğu için listeleyemiyorum."}`,{
split: true
})
}

if (button.id === 'rdagıt3') {
    let dagit = button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[2])+member.user.discriminator.includes(ekipetikettag[2])&& !member.roles.cache.has(ekiprol[2]))
button.reply.send(`Ekip tagı olup rolü olmayan ${dagit.size} kullanıcıya rol verildi.
    
Rol verilen kullanıcılar;
${dagit.map(x => x || "Rolü olmayan bulunamadı.")}`)
button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[2])+member.user.discriminator.includes(ekipetikettag[2])&& !member.roles.cache.has(ekiprol[2])).map(x=>x.roles.add(ekiprol[2]))                
}
if (button.id === 'sesteolmayanlar3') {
button.reply.send(`Aktif olup seste olmayan kişiler;
    
${button.guild.roles.cache.get(ekiprol[2]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).map(x=> x)}`)
}
if (button.id === 'ekiptekiler3') {
    let rol = button.guild.roles.cache.get(ekiprol[2])
button.reply.send(`Ekip üyeleri ${rol.members.size} kişi;
    
${rol.members.size < 200 ? rol.members.map(x => `${x} (\`${x.id}\`)`).join("\n") : "200'den fazla kişi olduğu için listeleyemiyorum."}`,{
split: true
})
}

if (button.id === 'rdagıt4') {
    let dagit = button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[3])+member.user.discriminator.includes(ekipetikettag[3])&& !member.roles.cache.has(ekiprol[3]))
button.reply.send(`Ekip tagı olup rolü olmayan ${dagit.size} kullanıcıya rol verildi.
    
Rol verilen kullanıcılar;
${dagit.map(x => x || "Rolü olmayan bulunamadı.")}`)
button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[3])+member.user.discriminator.includes(ekipetikettag[3])&& !member.roles.cache.has(ekiprol[3])).map(x=>x.roles.add(ekiprol[3]))                
}
if (button.id === 'sesteolmayanlar4') {
button.reply.send(`Aktif olup seste olmayan kişiler;
    
${button.guild.roles.cache.get(ekiprol[3]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).map(x=> x)}`)
}
if (button.id === 'ekiptekiler4') {
    let rol = button.guild.roles.cache.get(ekiprol[3])
button.reply.send(`Ekip üyeleri ${rol.members.size} kişi;
    
${rol.members.size < 200 ? rol.members.map(x => `${x} (\`${x.id}\`)`).join("\n") : "200'den fazla kişi olduğu için listeleyemiyorum."}`,{
split: true
})
}

    }    });
}}