const { MessageEmbed, Client, Message } = require("discord.js");
const Discord = require('discord.js');
const disbut = require("discord-buttons");
const client = global.client;
const { star } = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["kısayollar"],
    name: "kısayollar",
    help: "kısayollar",
    owner: true
  },
 
    run: async (client, message, args, durum, kanal) => {
 
   
 let invite = new disbut.MessageMenuOption()
 .setLabel("Davet Komutları")
 .setDescription("Davet Komutlar kategorisinin yardım bilgileri için tıkla!")
 .setValue("invite")

 let genel = new disbut.MessageMenuOption()
 .setLabel("Genel Komutları")
 .setDescription("Genel Komutlar kategorisinin yardım bilgileri için tıkla!")
 .setValue("genel")

 let kayıt = new disbut.MessageMenuOption()
 .setLabel("Kayıt Komutları")
 .setDescription("Kayıt Komutlar kategorisinin yardım bilgileri için tıkla!")
 .setValue("kayıt")

 let kurucu = new disbut.MessageMenuOption()
 .setLabel("Kurucu Komutları")
 .setDescription("Kurucu Komutlar kategorisinin yardım bilgileri için tıkla!")
 .setValue("kurucu")

 let moderasyon = new disbut.MessageMenuOption()
 .setLabel("Moderasyon Komutları")
 .setDescription("Moderasyon Komutlar kategorisinin yardım bilgileri için tıkla!")
 .setValue("moderasyon")

 let stat = new disbut.MessageMenuOption()
 .setLabel("Stat Komutları")
 .setDescription("Stat Komutlar kategorisinin yardım bilgileri için tıkla!")
 .setValue("stat")

 let yetkili = new disbut.MessageMenuOption()
 .setLabel("Yetkili Komutları")
 .setDescription("Yetkili Komutlar kategorisinin yardım bilgileri için tıkla!")
 .setValue("yetkili")

 let kısayollar = new disbut.MessageMenu();
 kısayollar.setID("kısayollar");
 kısayollar.setPlaceholder(`Komutlar hakkında yardım almak için tıkla!`)
 kısayollar.addOptions(invite,genel,kayıt,kurucu,moderasyon,stat,yetkili);

  
 message.channel.send(`${star} \`${message.guild.name}\`, bot komutlarını incelemek için aşağıdaki menüyü kullan!`, kısayollar);

    },
  };

    client.on("clickMenu", async (menu) => {

      if (menu.values[0] === "invite") {
       await menu.reply.think(true);
       await menu.reply.edit(`
\`\`\`
- .invite (stat [user])
- .topdavet (topdavet)
\`\`\`
`)
        };

        if (menu.values[0] === "genel") {
          await menu.reply.think(true);
          await menu.reply.edit(`
\`\`\`
- .afk (afk [sebep])
- .avatar (avatar [UserID/@User])
- .banner (banner [UserID/@User])
- .booster (boost [nick])
- .profil (profil / [@üye])
- .tag (tag)
- .yardım (yardım)
- .çek (çek [@üye])
- .git (git [@üye])
- .market (coinmarket) 
- .satınal (satınal) 
- .görev (görev [user])
- .coin [ekle/sil/gönder] [kullanıcı] [sayı]
\`\`\`
   `)
           };

           if (menu.values[0] === "kayıt") {
            await menu.reply.think(true);
            await menu.reply.edit(`
\`\`\`
- .taglı-alım [aç/kapat]
- .kayıt (kayıt [user] İsim Yaş)
- .bağlantı-kes ([user])
- .isim (isim [user] [name | age])
- .isimler (isimler [user])
- .top-teyit (top-teyit)
- .unregister (unregister [user])
\`\`\`
     `)
             };
  
             if (menu.values[0] === "kurucu") {
              await menu.reply.think(true);
              await menu.reply.edit(`
\`\`\`
- .kilit ([aç/kapat])
- .tagsay (tagsay)
- .banliste (banlist)
- .rolbilgi (@role)
- .cezapuansil ([user])
- .isimsil ([user])
- .sicilsil ([user])
- .yasaklı-tag (ekle/sil/liste [yasaklıtag])
- .ekip ([ekle-sil-liste-kontrol-bilgi])
- .ekip-ses ([@ekiprol])
- .yetkilises (yetkilises)
- .yoklama (toplantı)
- .allmute (allmute [kanal])
- .allunmute (allunmute [kanal])
- .toplutaşı (toplutaşı [kanal])
\`\`\`
       `)
               };

               if (menu.values[0] === "moderasyon") {
                await menu.reply.think(true);
                await menu.reply.edit(`
\`\`\`
- .kilit ([aç/kapat])
- .tagsay (tagsay)
- .banliste (banlist)
- .rolbilgi (@role)
- .cezapuansil ([user])
- .isimsil ([user])
- .sicilsil ([user])
- .yasaklı-tag (ekle/sil/liste [yasaklıtag])
- .ekip ([ekle-sil-liste-kontrol-bilgi])
- .ekip-ses ([@ekiprol])
- .yetkilises (yetkilises)
- .yoklama (toplantı)
- .allmute (allmute [kanal])
- .allunmute (allunmute [kanal])
- .toplutaşı (toplutaşı [kanal])
\`\`\`
         `)
                 };

                 if (menu.values[0] === "stat") {
                  await menu.reply.think(true);
                  await menu.reply.edit(`
\`\`\`
- .stat (stat [user])
- .top (top)
- .nerede (sesbilgi)
- .topcoin (topcoin)
\`\`\`
           `)
                   };

                   if (menu.values[0] === "yetkili") {
                    await menu.reply.think(true);
                    await menu.reply.edit(`
\`\`\`
- .ystat (yetkim [user])
- .cezapuan (cezapuan [user])
- .kes (kes [user])
- .rolsüz (rolsüz)
- .say (say)
- .snipe (snipe)
- .sesli (sesli)
- .sicil (sicil [user])
- .yetkili (yetkili [user])
- .taglı (taglı [user])
- .rol (r [al/ver] [user] [@role])
- .rollog (rollog [user])
- .seslisay (sesli)
- .sil (sil [miktar])
\`\`\`
             `)
                     };

    });
      