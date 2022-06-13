const { Client, Collection, Discord } = require("discord.js");
require("discord-reply")
const client = (global.client = new Client({ fetchAllMembers: true }));
require('discord-buttons')(client)
const settings = require("./src/configs/settings.json");
const conf = require("./src/configs/sunucuayar.json");
const { Mute2, Unmute} = require("./src/configs/emojis.json");
const fs = require("fs");
client.commands = new Collection();
client.aliases = new Collection();
client.invites = new Collection();
client.cooldown = new Map();

const map = new Map();
const lımıt = 5;
const TIME = 180000;
const DIFF = 2000;

//RANK KISMI//
client.ranks = []
//KOMUT ÇALIŞTIRMA
fs.readdir('./src/commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`[Passenger] ${files.length} komut yüklenecek.`);
  files.forEach(f => {
    fs.readdir("./src/commands/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./src/commands/${f}/` + file);
        console.log(`[Passenger KOMUT] ${props.conf.name} komutu yüklendi!`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.conf.name);
        });
      })
    })
  });
});
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client
  .login(settings.token)
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", async (msg) => {
  if (!msg.guild || msg.author.id === client.user.id) return;
  let reklamKoruma = true;

  if (reklamKoruma) {
      const kelime = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
      if (kelime.some(reklam => msg.content.includes(reklam))) {
        if (msg.member.permissions.has(8)) return
        msg.channel.send(`Hey ${msg.author}, sunucuda reklam yapamazsın!`).then(passengerxd => passengerxd.delete({ timeout: 3000 }));
        if (msg.deletable) msg.delete({
          timeout: 200
        }).catch(err => {});
      }
  }
})

client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (!newMsg.guild || newMsg.author.id === client.user.id) return;
      if (newMsg.member.permissions.has(8)) return
      const kelime = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
     if (kelime.some(reklam => newMsg.content.includes(reklam))) {
        newMsg.channel.send(`Hey ${newMsg.author}, sunucuda reklam yapamazsın!`).then(passengerxd => passengerxd.delete({ timeout: 3000 }));
        if (newMsg.deletable) newMsg.delete({
          timeout: 200
        }).catch(err => {});
      }
  })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.guild) return
    if (message.member.hasPermission("ADMINISTRATOR")) return;
    if (message.member.roles.cache.get(conf.chatMute)) return;
      if (map.has(message.author.id)) {
        const userData = map.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;

        if (difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                map.delete(message.author.id);
            }, TIME);
            map.set(message.author.id, userData)
        }
        else {
            msgCount++;
            if (parseInt(msgCount) === lımıt) {
          let messages = await message.channel.messages.fetch({ limit: 100 });
          let filtered = messages.filter((x) => x.author.id === message.author.id).array().splice(0, 7);
          message.channel.bulkDelete(filtered);
                message.member.roles.add(conf.chatMute);
                message.channel.send(`${Mute2} Sohbet kanallarını kirletme sebebiyle \`3 dakika\` süresince susturuldunuz, mesajlar temizlendi. Lütfen yavaşlayın. ${message.author}`).then(passengerxd => passengerxd.delete({ timeout: 5000 }))

                setTimeout(() => {
                   if (!conf.chatMute.some(x => message.member.roles.cache.has(x))) return
                    message.member.roles.remove(conf.chatMute);
                    message.channel.send(`${Unmute} Sohbet kanallarını kirletme sebebiyle 3 dakika süresince susturmanız bitti. Lütfen tekrarlamayınız. ${message.author}`).then(passengerxd => passengerxd.delete({ timeout: 5000 }))
                }, 180000);//9000000
            } else {
                userData.msgCount = msgCount;
                map.set(message.author.id, userData)
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            map.delete(message.author.id)
        }, TIME);
        map.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: fn
        })
    }
});
  
const mentionRegex = /<@!?&?\d+>/g;

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return
    if (message.member.hasPermission('ADMINISTRATOR')) return;

 if (mentionRegex.test(message.content) && message.content.match(mentionRegex).length >= 4) {
        message.member.roles.add(conf.chatMute);
        message.channel.send(`${Mute2} Birden çok kişiyi etiketlediğin için \`15 dakika\` boyunca susturuldun. ${message.author}`);
        setTimeout(() => {
            message.member.roles.remove(conf.chatMute);
       message.channel.send(`${Unmute} Birden çok kişiyi etiketleme sebebiyle olan, Muten açıldı lütfen tekrar insanları etiketleme. ${message.author}`)
        }, 900000);//9000000
        if (message.deletable) message.delete({ timeout: 5000 }).catch(console.error);
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////   tag rol   //////////////////////////////////////

client.on("userUpdate", async function(eskiii, yeniii) {
  const guildID = "980077177318047784"
  const roleID = "982540417574789161"//taglı_rol
  const tag = conf.tags
  const tag2 = conf.tags2
  const tag3 = conf.tags3
  const tag4 = conf.tags4
  const tag5 = conf.tags5
  const tag6 = conf.tags6
  const tag7 = conf.tags7
  const etiket = conf.etikets
  const log2 = '982540599372677170'

  const guildd22 = client.guilds.cache.get(guildID)
  const role = guildd22.roles.cache.find(roleInfo => roleInfo.id === roleID)
  const member = guildd22.members.cache.get(yeniii.id)
  if (yeniii.username !== eskiii.username) {
    
    if (eskiii.username.includes(tag) && !yeniii.username.includes(tag)) {
      if (yeniii.discriminator === etiket) return client.channels.cache.get(log2).send(`${yeniii} İsim tagımızı bıraktı ama hala üzerinde etiket olduğu için \`Tagges\` rolünü almadım`);
  
        member.roles.remove(roleID)
        client.channels.cache.get(log2).send(`${yeniii} isminden tagımızı çıkartarak ailemizden ayrıldı`)
    } else if (!eskiii.username.includes(tag) && yeniii.username.includes(tag)) {
        member.roles.add(roleID)
        client.channels.cache.get(log2).send(` ${yeniii} ismine tagımızı alarak ailemize katıldı`)
    }
}

if (yeniii.discriminator !== eskiii.discriminator) {
  if (eskiii.discriminator == "etiketiniz" && yeniii.discriminator !== "etiketiniz") {
    if (yeniii.username.includes(tag)) return client.channels.cache.get(log2).send(`${yeniii} Etiketimizi tagımızı bıraktı ama hala üzerinde isim tagımızı olduğu için \`Tagges\` rolünü almadım`);
      member.roles.remove(roleID)
     client.channels.cache.get(log2).send(`${yeniii} etiketimizi çıkartarak ailemizden ayrıldı!`)
  } else if (eskiii.discriminator !== "etiketiniz" && yeniii.discriminator == "etiketiniz") {
      member.roles.add(roleID)
      client.channels.cache.get(log2).send(`${yeniii} etiketimizi alarak ailemize katıldı`)
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////
if (yeniii.username !== eskiii.username) {
    
  if (eskiii.username.includes(tag2) && !yeniii.username.includes(tag2)) {
    if (yeniii.discriminator === etiket) return client.channels.cache.get(log2).send(`${yeniii} İsim tagımızı bıraktı ama hala üzerinde etiket olduğu için \`Tagges\` rolünü almadım`);

      member.roles.remove(roleID)
      client.channels.cache.get(log2).send(`${yeniii} isminden tagımızı çıkartarak ailemizden ayrıldı`)
  } else if (!eskiii.username.includes(tag2) && yeniii.username.includes(tag2)) {
      member.roles.add(roleID)
      client.channels.cache.get(log2).send(` ${yeniii} ismine tagımızı alarak ailemize katıldı`)
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (yeniii.username !== eskiii.username) {
    
  if (eskiii.username.includes(tag3) && !yeniii.username.includes(tag3)) {
    if (yeniii.discriminator === etiket) return client.channels.cache.get(log2).send(`${yeniii} İsim tagımızı bıraktı ama hala üzerinde etiket olduğu için \`Tagges\` rolünü almadım`);

      member.roles.remove(roleID)
      client.channels.cache.get(log2).send(`${yeniii} isminden tagımızı çıkartarak ailemizden ayrıldı`)
  } else if (!eskiii.username.includes(tag3) && yeniii.username.includes(tag3)) {
      member.roles.add(roleID)
      client.channels.cache.get(log2).send(` ${yeniii} ismine tagımızı alarak ailemize katıldı`)
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
if (yeniii.username !== eskiii.username) {
    
  if (eskiii.username.includes(tag4) && !yeniii.username.includes(tag4)) {
    if (yeniii.discriminator === etiket) return client.channels.cache.get(log2).send(`${yeniii} İsim tagımızı bıraktı ama hala üzerinde etiket olduğu için \`Tagges\` rolünü almadım`);

      member.roles.remove(roleID)
      client.channels.cache.get(log2).send(`${yeniii} isminden tagımızı çıkartarak ailemizden ayrıldı`)
  } else if (!eskiii.username.includes(tag4) && yeniii.username.includes(tag4)) {
      member.roles.add(roleID)
      client.channels.cache.get(log2).send(` ${yeniii} ismine tagımızı alarak ailemize katıldı`)
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (yeniii.username !== eskiii.username) {
    
  if (eskiii.username.includes(tag5) && !yeniii.username.includes(tag5)) {
    if (yeniii.discriminator === etiket) return client.channels.cache.get(log2).send(`${yeniii} İsim tagımızı bıraktı ama hala üzerinde etiket olduğu için \`Tagges\` rolünü almadım`);

      member.roles.remove(roleID)
      client.channels.cache.get(log2).send(`${yeniii} isminden tagımızı çıkartarak ailemizden ayrıldı`)
  } else if (!eskiii.username.includes(tag5) && yeniii.username.includes(tag5)) {
      member.roles.add(roleID)
      client.channels.cache.get(log2).send(` ${yeniii} ismine tagımızı alarak ailemize katıldı`)
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (yeniii.username !== eskiii.username) {
    
  if (eskiii.username.includes(tag6) && !yeniii.username.includes(tag6)) {
    if (yeniii.discriminator === etiket) return client.channels.cache.get(log2).send(`${yeniii} İsim tagımızı bıraktı ama hala üzerinde etiket olduğu için \`Tagges\` rolünü almadım`);

      member.roles.remove(roleID)
      client.channels.cache.get(log2).send(`${yeniii} isminden tagımızı çıkartarak ailemizden ayrıldı`)
  } else if (!eskiii.username.includes(tag6) && yeniii.username.includes(tag6)) {
      member.roles.add(roleID)
      client.channels.cache.get(log2).send(` ${yeniii} ismine tagımızı alarak ailemize katıldı`)
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (yeniii.username !== eskiii.username) {
    
  if (eskiii.username.includes(tag7) && !yeniii.username.includes(tag7)) {
    if (yeniii.discriminator === etiket) return client.channels.cache.get(log2).send(`${yeniii} İsim tagımızı bıraktı ama hala üzerinde etiket olduğu için \`Tagges\` rolünü almadım`);

      member.roles.remove(roleID)
      client.channels.cache.get(log2).send(`${yeniii} isminden tagımızı çıkartarak ailemizden ayrıldı`)
  } else if (!eskiii.username.includes(tag7) && yeniii.username.includes(tag7)) {
      member.roles.add(roleID)
      client.channels.cache.get(log2).send(` ${yeniii} ismine tagımızı alarak ailemize katıldı`)
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

})

client.on("guildMemberAdd", member => {
  const guildID = "980077177318047784"
  const roleID = "982540417574789161"//taglı_rol
  const tag = conf.tags
  const tag2 = conf.tags2
  const tag3 = conf.tags3
  const tag4 = conf.tags4
  const tag5 = conf.tags5
  const tag6 = conf.tags6
  const tag7 = conf.tags7
  const log2 = '982540599372677170'
  const guildd22 = client.guilds.cache.get(guildID)
  const role = guildd22.roles.cache.find(roleInfo => roleInfo.id === roleID)
  if(member.user.username.includes(tag)){
    setTimeout(function(){  
    client.channels.cache.get(log2).send(`Sunucumuza katıldı. ${member} isminde tagımız olduğu için \`tagges\` rolü verdim`)
  }, 2000);
    setTimeout(function(){  
    member.roles.add(role)
  }, 5000);
  
  if(member.user.username.includes(tag2)){
    setTimeout(function(){  
    client.channels.cache.get(log2).send(`Sunucumuza katıldı. ${member} isminde tagımız olduğu için \`tagges\` rolü verdim`)
  }, 2000);
    setTimeout(function(){  
    member.roles.add(role)
  }, 5000);
  
  
  }

  if(member.user.username.includes(tag3)){
    setTimeout(function(){  
    client.channels.cache.get(log2).send(`Sunucumuza katıldı. ${member} isminde tagımız olduğu için \`tagges\` rolü verdim`)
  }, 2000);
    setTimeout(function(){  
    member.roles.add(role)
  }, 5000);
  
  
  }

  if(member.user.username.includes(tag4)){
    setTimeout(function(){  
    client.channels.cache.get(log2).send(`Sunucumuza katıldı. ${member} isminde tagımız olduğu için \`tagges\` rolü verdim`)
  }, 2000);
    setTimeout(function(){  
    member.roles.add(role)
  }, 5000);
  
  
  }

  if(member.user.username.includes(tag5)){
    setTimeout(function(){  
    client.channels.cache.get(log2).send(`Sunucumuza katıldı. ${member} isminde tagımız olduğu için \`tagges\` rolü verdim`)
  }, 2000);
    setTimeout(function(){  
    member.roles.add(role)
  }, 5000);
  
  
  }

  if(member.user.username.includes(tag6)){
    setTimeout(function(){  
    client.channels.cache.get(log2).send(`Sunucumuza katıldı. ${member} isminde tagımız olduğu için \`tagges\` rolü verdim`)
  }, 2000);
    setTimeout(function(){  
    member.roles.add(role)
  }, 5000);
  
  
  }
  if(member.user.username.includes(tag7)){
    setTimeout(function(){  
    client.channels.cache.get(log2).send(`Sunucumuza katıldı. ${member} isminde tagımız olduğu için \`tagges\` rolü verdim`)
  }, 2000);
    setTimeout(function(){  
    member.roles.add(role)
  }, 5000);
  
  
  }

}
})






client.on("guildMemberAdd", member => {
  const guildID = "980077177318047784"
  const roleID = "982540417574789161"//taglı_rol
  const Disc = conf.etikets
  const log2 = '982540599372677170'
  const guildd22 = client.guilds.cache.get(guildID)
  const role = guildd22.roles.cache.find(roleInfo => roleInfo.id === roleID)


  if (member.user.discriminator === Disc) {
    setTimeout(function(){  
   client.channels.cache.get(log2).send(`${member} sunucuya \`${Disc}\` etiketiyle geldiği için \`tagges\` rolünü verdim.`)
  }, 2000);
  setTimeout(function(){  
   member.roles.add(role)
  }, 5000);
  }
})

/////////////////////////////////////   tag rol   //////////////////////////////////////

