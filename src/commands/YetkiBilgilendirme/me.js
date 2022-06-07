const moment = require("moment");
require("moment-duration-format");
const conf = require("../../configs/sunucuayar.json");
const voiceUserParent = require("../../schemas/voiceUserParent");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const cezapuan = require("../../schemas/cezapuan");
const coin = require("../../schemas/coin");
const taggeds = require("../../schemas/taggeds");
const yetkis = require("../../schemas/yetkis");
const ceza = require("../../schemas/ceza");
const toplams = require("../../schemas/toplams");
const inviterSchema = require("../../schemas/inviter");
const {  rewards, miniicon, mesaj2, staff, galp ,Muhabbet ,star , fill, empty, fillStart, emptyEnd, fillEnd, red } = require("../../configs/emojis.json");
const { TeamMember, MessageEmbed } = require("discord.js");
const { MessageButton,MessageActionRow } = require('discord-buttons');

module.exports = {
  conf: {
    aliases: ["ystat"],
    name: "yetkim",
    help: "yetkim"
  },

  run: async (client, message, args, embed) => {
    if(!conf.staffs.some(rol => message.member.roles.cache.has(rol))) return message.react(red)
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!conf.staffs.some(rol => member.roles.cache.has(rol))) return message.react(red)

    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const messageWeekly = messageData ? messageData.weeklyStat : 0;
    const messageDaily = messageData ? messageData.dailyStat : 0;
    
    const coinData = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });

 

    const maxValue = client.ranks[client.ranks.indexOf(client.ranks.find(x => x.coin >= (coinData ? coinData.coin : 0)))] || client.ranks[client.ranks.length-1];
    const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: member.user.id });
    const toplamData = await toplams.findOne({ guildID: message.guild.id, userID: member.user.id });
    const yetkiData = await yetkis.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: member.user.id });


const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;

        const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
      };
      
      let currentRank = client.ranks.filter(x => (coinData ? coinData.coin : 0) >= x.coin);
      currentRank = currentRank[currentRank.length-1];

      const coinStatus = message.member.hasRole(conf.staffs, false) && client.ranks.length > 0 ?
      `${currentRank ?`
      ${currentRank !== client.ranks[client.ranks.length-1] ? `Şu an ${Array.isArray(currentRank.role) ? currentRank.role.map(x => `<@&${x}>`).join(", ") : `<@&${currentRank.role}>`} rolündesiniz. ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`} rolüne ulaşmak için \`${maxValue.coin-coinData.coin}\` puan daha kazanmanız gerekiyor!` : "Şu an son yetkidesiniz! Emekleriniz için teşekkür ederiz. :)"}` : ` 
      Şuan ${message.member.roles.highest} rolündesiniz. ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`} rolüne ulaşmak için \`${maxValue.coin - (coinData ? coinData.coin : 0)}\`  Puan daha kazanmanız gerekiyor!`}` : ""
      
    var PuanDetaylari = new MessageButton()
    .setLabel("Puan Detayları")
    .setID("puan_detaylari")
    .setStyle("green")
    .setEmoji("907014785386840075")

    var GenelPuanDetaylari = new MessageButton()
    .setLabel("Genel Puan Detayları")
    .setID("genel_puan_detaylari")
    .setStyle("blurple")
    .setEmoji("915754670931193917")

    var Iptal = new MessageButton()
    .setLabel("İptal")
    .setID("iptal_button")
    .setStyle("red")
    .setEmoji("915754675742081076")

    const row = new MessageActionRow()
    .addComponents(PuanDetaylari, GenelPuanDetaylari, Iptal)

embed.setDescription(`
${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam ses ve mesaj bilgileri aşağıda belirtilmiştir.
`)

.addFields(
{ name: "__**Toplam Ses**__",  value: `
\`\`\`fix
${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}
\`\`\`
`, inline: true },
{ name: "__**Toplam Mesaj**__",  value: `
\`\`\`fix
${messageData ? messageData.topStat : 0} mesaj
\`\`\`
`, inline: true },
{ name:"__**Toplam Kayıt**__",  value: `
\`\`\`fix
${toplamData ? `${toplamData.toplams.length} kişi`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
)
  
.addFields(
{ name: "__**Toplam Davet**__", value: `
\`\`\`fix
${inviterData ? `${total} regular`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
{ name: "__**Toplam Taglı**__", value: `
\`\`\`fix
${taggedData ? `${taggedData.taggeds.length} kişi`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
{ name: "__**Toplam Yetkili**__", value: `
\`\`\`fix
${yetkiData ? `${yetkiData.yetkis.length} kişi` : "Veri bulunmuyor."}
\`\`\`
`, inline: true }
)
  
  
  embed.addField(`${star} **Sesli Sohbet İstatistiği**`, `
  ${miniicon} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
  ${miniicon} Public Odalar: \`${await category(conf.publicParents)}\`
  ${miniicon} Secret Odalar: \`${await category(conf.privateParents)}\`
  ${miniicon} Alone Odalar: \`${await category(conf.aloneParents)}\`
  ${miniicon} Yönetim Yetkili Odaları: \`${await category(conf.funParents)}\`
  ${miniicon} Kayıt Odaları: \`${await category(conf.registerParents)}\`
   `, false);
  
  
  embed.addField(`${star} **Mesaj İstatistiği**`, `
  ${miniicon} Toplam: \`${messageData ? messageData.topStat : 0}\`
  ${miniicon} Haftalık Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
  ${miniicon} Günlük Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
   `, false);

   

    let msg = await message.channel.send(embed, { components: [row] });
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 99999999 })
    collector.on("collect", async (button) => {
      if(button.id === "puan_detaylari") {
        await button.reply.defer()
      const puan = new MessageEmbed()
      .setDescription(`
      ${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda puanlama tablosu aşağıda belirtilmiştir.
      `) 
      
      .addField(`${star} **Puan Durumu:**`, `
      Puanınız: \`${coinData ? Math.floor(coinData.coin) : 0}\`, Gereken Puan: \`${maxValue.coin}\`
      ${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)} \`${coinData ? coinData.coin : 0} / ${maxValue.coin}\`
       `, false)
      
      .addField(`${star} **Puan Detayları:**`, `
      ${miniicon} Kayıtlar: \`${toplamData ? toplamData.toplams.length : 0} (Puan Etkisi: +${toplamData ? toplamData.toplams.length*5.5 : 0})\`
      ${miniicon} Taglılar: \`${taggedData ? taggedData.taggeds.length : 0} (Puan Etkisi: +${taggedData ? taggedData.taggeds.length*25 : 0})\`
      ${miniicon} Davetler: \`${total} (Puan Etkisi: +${total*15})\`
      ${miniicon} Yetkililer: \`${yetkiData ? yetkiData.yetkis.length : 0} kişi (Puan Etkisi: +${yetkiData ? yetkiData.yetkis.length*30 : 0})\`
      ${miniicon} Chat Puan: \`${messageData ? messageData.topStat : 0} mesaj (Puan Etkisi: +${messageData ? messageData.topStat*2 : 0})\`
      ${miniicon} Sesli Puan: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("m")} dakika (Puan Etkisi: +${moment.duration(voiceData ? voiceData.topStat : 0).format("m")*4})\`
       `, false)
      
      .addField(`${star} **Yetki Durumu:**`, `
      ${coinStatus}
       `, false);  

msg.edit({
  embed : puan,
  components : row
})
      
      }

  if(button.id === "genel_puan_detaylari") {
    await button.reply.defer()
    const ceza = new MessageEmbed()
    .setDescription(`
    ${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden itibaren \`${message.guild.name}\` sunucusunda genel puanlama tablosu aşağıda belirtilmiştir.
`) 
.addField(`${star} **Puan Detayları:**`, `
${miniicon} Kayıt: (\`Puan Etkisi: +${toplamData ? toplamData.toplams.length*5.5 : 0}\`)
${miniicon} Taglı: (\`Puan Etkisi: +${taggedData ? taggedData.taggeds.length*25 : 0}\`)
${miniicon} Davet: (\`Puan Etkisi: +${total*15}\`)
${miniicon} Yetkili: (\`Puan Etkisi: +${yetkiData ? yetkiData.yetkis.length*30 : 0}\`)
${miniicon} Toplam Ses: (\`Puan Etkisi: +${moment.duration(voiceData ? voiceData.topStat : 0).format("m")*4}\`)
${miniicon} Toplam Mesaj: (\`Puan Etkisi: +${messageData ? messageData.topStat*2 : 0}\`)
${miniicon} Toplam Aldığın Cezalar : ${cezapuanData ? cezapuanData.cezapuan.length : 0} (\`Toplam ${cezaData ? cezaData.ceza.length : 0}\`)
 `, false)

.addField(`${star} **Net Puanlama Bilgisi**`, `
${miniicon} Kayıt işlemi yaparak, \`+5.5\` puan kazanırsın.
${miniicon} Taglı üye belirleyerek, \`+25\` puan kazanırsınız.
${miniicon} İnsanları davet ederek, \`+15\` puan kazanırsın.
${miniicon} İnsanları yetkili yaparak, \`+30\` puan kazanırsın.
${miniicon} Seste kalarak, ortalama olarak \`+4\` puan kazanırsınız.
${miniicon} Yazı yazarak, ortalama olarak, \`+2\` puan kazanırsınız.
 `, false)

.addField(`${star} **Puan Durumu:**`, `
Puanınız: \`${coinData ? Math.floor(coinData.coin) : 0}\`, Gereken Puan: \`${maxValue.coin}\`
${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)} \`${coinData ? coinData.coin : 0} / ${maxValue.coin}\`
 `, false)

.addField(`${star} **Yetki Durumu:**`, `
${coinStatus}
 `, false)

msg.edit({
  embed: ceza,
  components : row
})  
    }

      if(button.id === "iptal_button") {
        await button.reply.defer()
        const iptal = new MessageEmbed()
        .setDescription(`
${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam ses ve mesaj bilgileri aşağıda belirtilmiştir.
`)

.addFields(
{ name: "__**Toplam Ses**__",  value: `
\`\`\`fix
${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}
\`\`\`
`, inline: true },
{ name: "__**Toplam Mesaj**__",  value: `
\`\`\`fix
${messageData ? messageData.topStat : 0} mesaj
\`\`\`
`, inline: true },
{ name:"__**Toplam Kayıt**__",  value: `
\`\`\`fix
 ${toplamData ? `${toplamData.toplams.length} kişi`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
)
  
.addFields(
{ name: "__**Toplam Davet**__", value: `
\`\`\`fix
${inviterData ? `${total} regular`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
{ name: "__**Toplam Taglı**__", value: `
\`\`\`fix
${taggedData ? `${taggedData.taggeds.length} kişi`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
{ name: "__**Toplam Yetkili**__", value: `
\`\`\`fix
${yetkiData ? `${yetkiData.yetkis.length} kişi` : "Veri bulunmuyor."}
\`\`\`
`, inline: true }
)
  
  
  iptal.addField(`${star} **Sesli Sohbet İstatistiği**`, `
  ${miniicon} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
  ${miniicon} Public Odalar: \`${await category(conf.publicParents)}\`
  ${miniicon} Secret Odalar: \`${await category(conf.privateParents)}\`
  ${miniicon} Alone Odalar: \`${await category(conf.aloneParents)}\`
  ${miniicon} Yönetim Yetkili Odaları: \`${await category(conf.funParents)}\`
  ${miniicon} Kayıt Odaları: \`${await category(conf.registerParents)}\`
   `, false);
  
  
   iptal.addField(`${star} **Mesaj İstatistiği**`, `
  ${miniicon} Toplam: \`${messageData ? messageData.topStat : 0}\`
  ${miniicon} Haftalık Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
  ${miniicon} Günlük Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
   `, false);

    msg.edit({
      embed: iptal,
      components : row
    })
        
        }

  })
  }
};

function progressBar(value, maxValue, size) {
const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
const emptyProgress = size - progress > 0 ? size - progress : 0;

const progressText = fill.repeat(progress);
const emptyProgressText = empty.repeat(emptyProgress);

return emptyProgress > 0 ? fillStart+progressText+emptyProgressText+emptyEnd : fillStart+progressText+emptyProgressText+fillEnd;
};
