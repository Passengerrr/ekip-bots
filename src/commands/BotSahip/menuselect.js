const { MessageEmbed, Client, Message } = require("discord.js");
const Discord = require('discord.js');
const disbut = require("discord-buttons");
const client = global.client;
const conf = require("../../configs/sunucuayar.json");
const { passengernitro, passengernetflix, passengerspotify, passengerexxen, passengeryoutube ,star } = require("../../configs/emojis.json")

const katılımcı = {
  "941075067230625803": "Etkinlik_Rol_İd",
  "941074179401338900": "Çekiliş_Rol_İd"
}; 

const burclar = {
  "931658642955075604": "982540465834438716",
  "931657544756248606": "982540468497842247",
  "931658863923593297": "982540458859307008",
  "931658464512598056": "982540466929147924",
  "931657587886264340": "982540470544658452",
  "931658178482012201": "982540460616720394",
  "931658397860892672": "982540463682760774",
  "931658529314603008": "982540467692535859",
  "931658575951048714": "982540472474009672",
  "931658251181887508": "982540464680996884",
  "931658687028789289": "982540462374137907",
  "931659095629529168": "982540459727527967"
};

const renkler = {
  "746992558927904891": "982540405662957598",
  "746992700099657830": "982540406707351592",
  "746992666926907393": "982540408611536936",
  "746992603186069615": "982540404610191390",
  "746992734434230383": "982617038201683999"
};

const ilişki = {
  "855054137296814101": "982540453473841162",
  "835704673204830238": "982540451926126624"
}; 

const oyunlar = {
  "880606175274598461":"982540474596352040",
  "880606175761145906":"982540475561017374",
  "880606175387873281":"982540476949360671",
  "880606175408824321":"982540477918240818",
  "880606175178153994":"982540478589333515",
  "880606175488540693":"982540479616929792"
};

module.exports = {
  conf: {
    aliases: [],
    name: "menü",
    owner: true,
  },
 
    run: async (client, message, args, durum, kanal) => {
 
      const katılımPush = [];
      const burcPush = [];
      const oyunPush = [];
      const renkPush = [];
      const digerPush = [];
      const emoji = (name) => client.emojis.cache.find(x => x.name === name);
    
    
      for (const katılım in katılımcı) {
        let sonuc = katılımcı[katılım];
        let table = new disbut.MessageMenuOption()
          .setLabel(message.guild.roles.cache.get(sonuc) ? message.guild.roles.cache.get(sonuc).name : sonuc)
          .setEmoji(emoji(katılım) ? emoji(katılım).id : katılım)
          .setValue(sonuc)
          katılımPush.push(table);
      };
      let kaldırkatılım = new disbut.MessageMenuOption()
      .setLabel("Rol İstemiyorum")
      .setEmoji("🗑️")
      .setValue("kaldır")
      let katılım = new disbut.MessageMenu()
        katılım.setID("katılım")
        katılım.setPlaceholder(`Etkinlik Rolleri`)
        katılım.setMaxValues(2)
        katılım.setMinValues(1)
        katılım.addOptions(katılımPush,kaldırkatılım)


      for (const burc in burclar) {
        let sonuc = burclar[burc];
        let table = new disbut.MessageMenuOption()
          .setLabel(message.guild.roles.cache.get(sonuc) ? message.guild.roles.cache.get(sonuc).name : sonuc)
          .setEmoji(emoji(burc) ? emoji(burc).id : burc)
          .setValue(sonuc)
     burcPush.push(table);
      };
      let kaldırburc = new disbut.MessageMenuOption()
      .setLabel("Rol İstemiyorum")
      .setEmoji("🗑️")
      .setValue("kaldır")
      let burc = new disbut.MessageMenu()
        burc.setID("burc")
        burc.setPlaceholder(`Burç Rolleri`)
        burc.setMaxValues(1)
        burc.setMinValues(1)
        burc.addOptions(burcPush,kaldırburc)
    
    
      for (const oyun in oyunlar) {
        const sonuc = oyunlar[oyun];
        let table = new disbut.MessageMenuOption()
          .setLabel(message.guild.roles.cache.get(sonuc) ? message.guild.roles.cache.get(sonuc).name : sonuc)
          .setEmoji(emoji(oyun) ? emoji(oyun).id : oyun)
          .setValue(sonuc)
         oyunPush.push(table);
      };
      let kaldıroyun = new disbut.MessageMenuOption()
      .setLabel("Rol İstemiyorum")
      .setEmoji("🗑️")
      .setValue("kaldır")
      let oyun = new disbut.MessageMenu();
      oyun.setID("oyun");
      oyun.setPlaceholder(`Oyun Rolleri`)
      oyun.setMaxValues(6);
      oyun.setMinValues(1);
      oyun.addOptions(oyunPush,kaldıroyun);
    
   for (const renk in renkler) {
        const sonuc = renkler[renk];
        let table = new disbut.MessageMenuOption()
          .setLabel(message.guild.roles.cache.get(sonuc) ? message.guild.roles.cache.get(sonuc).name : sonuc)
          .setEmoji(emoji(renk) ? emoji(renk).id : renk)
          .setValue(sonuc)
        renkPush.push(table);
      };
      let kaldırrenk = new disbut.MessageMenuOption()
      .setLabel("Rol İstemiyorum")
      .setEmoji("🗑️")
      .setValue("kaldır")
      let renk = new disbut.MessageMenu();
      renk.setID("renk");
      renk.setPlaceholder(`Renk Rolleri`)
      renk.setMaxValues(1);
      renk.setMinValues(1);
      renk.addOptions(renkPush,kaldırrenk);
    
  
    
      for (const diger in ilişki) {
        const sonuc = ilişki[diger];
        let table = new disbut.MessageMenuOption()
          .setLabel(message.guild.roles.cache.get(sonuc) ? message.guild.roles.cache.get(sonuc).name : sonuc)
          .setEmoji(emoji(diger) ? emoji(diger).id : diger)
          .setValue(sonuc)
        digerPush.push(table);
      };
      let kaldırdiger = new disbut.MessageMenuOption()
      .setLabel("Rol İstemiyorum")
      .setEmoji("🗑️")
      .setValue("kaldır")
      let diger = new disbut.MessageMenu();
      diger.setID("diger");
      diger.setPlaceholder(`İlişki Rolleri`)
      diger.setMaxValues(1);
      diger.setMinValues(1);
      diger.addOptions(digerPush,kaldırdiger);
    
      if (args[0] === "katılım") {
        message.channel.send(`:tada: Sunucuda sizleri rahatsız etmemek için \`@everyone\` veya \`@here\` atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız Çekilişler,Etkinlikler V/K ve D/C'den haberdar olacaksınız.
\`⦁\` Eğer \`@Etkinlik Katılımcısı\` Rolünü alırsanız sunucumuzda düzenlenecek olan etkinlikler, konserler ve oyun etkinlikleri gibi etkinliklerden haberdar olabilirsiniz. 
        
\`⦁\` Eğer \`@Çekiliş Katılımcısı\` Rolünü alırsanız sunucumuzda sıkça vereceğimiz ${passengernitro} , ${passengerspotify} , ${passengeryoutube} , ${passengernetflix} , ${passengerexxen} ve daha nice ödüllerin bulunduğu çekilişlerden haberdar olabilirsiniz. 
        
**NOT:** \`Kayıtlı, kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Sunucumuz da everyone veya here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.\``, katılım);
      }


      if (args[0] === "burc") {
        message.channel.send(`${star} Aşağıda ki menüden **Burç** rollerinden dilediğinizi alabilirsiniz.`, burc);
      }
    
    
      if (args[0] === "oyun") {
        message.channel.send(`${star} Aşağıda ki menüden **Oyun** rollerinden dilediğinizi alabilirsiniz.`, oyun);
      }
    
      if (args[0] === "renk") {
        message.channel.send(`${star} Aşağıda ki menüden **Renk** rollerinden dilediğinizi alabilirsiniz.`, renk);
      }
    
    
      if (args[0] === "iliski") {
        message.channel.send(`${star} Aşağıda ki menüden **İlişki** rollerinden dilediğinizi alabilirsiniz.`, diger);
      }
    
  
    },
  };

    client.on("clickMenu", async (menu) => {

      if (menu.id == "katılım") {
        await menu.reply.think(true);
        await menu.reply.edit("Rollerin güncellendi!");
        let add = [];
        let remove = [];
        let allRemove = [];
        let roller = katılımcı;
        for (const rol in roller) {
          let sonuc = roller[rol];
          allRemove.push(sonuc);
          if (menu.values.includes(sonuc)) {
          await menu.reply.edit(`Başarılı bir şekilde <@&${sonuc}> rolü üzerinize eklendi!`);
            add.push(sonuc);
          } else {
            remove.push(sonuc);
          };
        };
        if (!menu.values.some(value => value === "allDelete")) {
          if (remove.length > 0) {
            await menu.clicker.member.roles.remove(remove);
    
          };
          await menu.clicker.member.roles.add(add);
        
  
        } else {
          await menu.clicker.member.roles.remove(allRemove);
         
  
        };
        };


      if (menu.id == "burc") {
          await menu.reply.think(true);
          await menu.reply.edit("Rollerin güncellendi!");
          let add = [];
          let remove = [];
          let allRemove = [];
          let roller = burclar;
          for (const rol in roller) {
            let sonuc = roller[rol];
            allRemove.push(sonuc);
            if (menu.values.includes(sonuc)) {
            await menu.reply.edit(`Başarılı bir şekilde <@&${sonuc}> rolü üzerinize eklendi!`);
              add.push(sonuc);
            } else {
              remove.push(sonuc);
            };
          };
          if (!menu.values.some(value => value === "allDelete")) {
            if (remove.length > 0) {
              await menu.clicker.member.roles.remove(remove);
      
            };
            await menu.clicker.member.roles.add(add);
          
    
          } else {
            await menu.clicker.member.roles.remove(allRemove);
           
    
          };
          };
    
      if (menu.id == "oyun") {
        await menu.reply.think(true);
        await menu.reply.edit("Rollerin güncellendi!");
        let add = [];
        let remove = [];
        let allRemove = [];
        let roller = oyunlar;
        for (const rol in roller) {
          let sonuc = roller[rol];
          allRemove.push(sonuc);
          if (menu.values.includes(sonuc)) {
              
            await menu.reply.edit(`Başarılı bir şekilde <@&${sonuc}> rolü üzerinize eklendi!`);
            add.push(sonuc);
          } else {
            remove.push(sonuc);
          };
        };
        if (!menu.values.some(value => value === "allDelete")) {
          if (remove.length > 0) {
            await menu.clicker.member.roles.remove(remove);
          };
          await menu.clicker.member.roles.add(add);
        } else {
          await menu.clicker.member.roles.remove(allRemove);
  
        };
      };
    
      if (menu.id == "renk") {
        await menu.reply.think(true);
        if (!menu.clicker.member.roles.cache.get(conf.boosterRolu)) return await menu.reply.edit("Booster üye olman gerek!");;
        await menu.reply.edit("Rollerin güncellendi!");
  
        let add = [];
        let remove = [];
        let allRemove = [];
        let roller = renkler;
        for (const rol in roller) {
  
          let sonuc = roller[rol];  
  
          allRemove.push(sonuc);
          if (menu.values.includes(sonuc)) {    
            await menu.reply.edit(`Başarılı bir şekilde <@&${sonuc}> rolü üzerinize eklendi!`);
  
            add.push(sonuc);
          } else {
            remove.push(sonuc);
  
          };
        };
        if (!menu.values.some(value => value === "allDelete")) {
          if (remove.length > 0) {
            await menu.clicker.member.roles.remove(remove);
          };
          await menu.clicker.member.roles.add(add);
        } else {
          await menu.clicker.member.roles.remove(allRemove);
  
        };
      };
      if (menu.id == "diger") {
        await menu.reply.think(true);
        await menu.reply.edit("Rollerin güncellendi!");
        let add = [];
        let remove = [];
        let allRemove = [];
        let roller = ilişki;
        for (const rol in roller) {
          let sonuc = ilişki[rol];
          allRemove.push(sonuc);
          if (menu.values.includes(sonuc)) {
              
            await menu.reply.edit(`Başarılı bir şekilde <@&${sonuc}> rolü üzerinize eklendi!`);
            add.push(sonuc);
          } else {
            remove.push(sonuc);
          };
        };
        if (!menu.values.some(value => value === "allDelete")) {
          if (remove.length > 0) {
            await menu.clicker.member.roles.remove(remove);
           
  
          };
          await menu.clicker.member.roles.add(add);
        } else {
          await menu.clicker.member.roles.remove(allRemove);
        };
      };
  
     
    });
      