const coin = require("../../schemas/coin");
const moment = require("moment");
const ceza = require("../../schemas/ceza");
moment.locale("tr");
const conf = require("../../configs/sunucuayar.json")
const settings = require("../../configs/settings.json")
const penals = require("../../schemas/penals")
const uyarisayi = require("../../schemas/uyarisayi")
const cezapuan = require("../../schemas/cezapuan")
const { red, green } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["uyarı","warn"],
    name: "uyarı",
    help: "uyarı"
  },

  run: async (client, message, args, embed) => {
 
    if (!message.member.hasPermission(8) && !conf.warnHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send( "Yeterli yetkin bulunmuyor!").then(x=>x.delete({timeout:5000})) }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.react(red)
    message.channel.send( "Bir üye belirtmelisin!").then(x=>x.delete({timeout:5000})) }
    const reason = args.slice(2).join(" ") || "Belirtilmedi!";
    if (!message.member.hasPermission(8) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    message.react(red)
    message.channel.send( "Kendinle aynı yetkide ya da daha yetkili olan birini uyaramazsın!").then(x=>x.delete({timeout:5000})) }
    if (!member.manageable) 
    {
    message.react(red)
    message.channel.send( "Bu üyeyi susturamıyorum!").then(x=>x.delete({timeout:5000})) }
    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -10 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send(`${member} üyesi \`uyarı cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`);
    const uyariData = await uyarisayi.findOne({ guildID: message.guild.id, userID: member.user.id });
    const penal = await client.penalize(message.guild.id, member.user.id, "WARN", false, message.author.id, reason);
    await uyarisayi.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { sayi: 1 } }, { upsert: true });
    const data = await penals.find({ guildID: message.guild.id, userID: member.user.id, type: "WARN" });
    message.react(green)
    message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle uyarıldı! \`(Ceza ID: #${penal.id})\``).then(x=>x.delete({timeout:50000}))
    if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle uyarıldınız!`).catch(() => {});
    
    const log = embed
      .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true, size: 2048 }))
      .setColor("#2f3136")
      .setDescription(`
${member.toString()} üyesi uyarıldı!

Ceza ID: \`#${penal.id}\`
Uyarılan Üye: ${member.toString()} \`(${member.user.username.replace(/\`/g, "")} - ${member.user.id})\`
Uyaran Yetkili: ${message.author} \`(${message.author.username.replace(/\`/g, "")} - ${message.author.id})\`
Uyarı Tarihi: \`${moment(Date.now()).format("LLL")}\`
Uyarı Sebebi: \`${reason}\`
Uyarı Sayısı: \`${uyariData ? Math.floor(parseInt(uyariData.sayi)) : 1} Uyarı\`
      `);
    message.guild.channels.cache.get(conf.warnLogChannel).send(log);
  },
};

