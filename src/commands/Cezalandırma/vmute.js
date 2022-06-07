const coin = require("../../schemas/coin");
const moment = require("moment");
const ceza = require("../../schemas/ceza");
const cezapuan = require("../../schemas/cezapuan")
const vmuteLimit = new Map();
moment.locale("tr");
const ms = require("ms");
const conf = require("../../configs/sunucuayar.json")
const settings = require("../../configs/settings.json")
const { red, green, Mute, revusome, kirmiziok } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["vmute","voicemute"],
    name: "vmute",
    help: "vmute"
  },

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission(8) && !conf.vmuteHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send( "Yeterli yetkin bulunmuyor!").then(x=>x.delete({timeout:5000})) 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
    message.react(red)
    message.channel.send( "Bir üye belirtmelisin!").then(x=>x.delete({timeout:5000})) 
    return }
    if (conf.voiceMute.some(x => member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send( "Bu üye zaten susturulmuş!").then(x=>x.delete({timeout:5000})) 
    return }
    const duration = args[1] ? ms(args[1]) : undefined;
    if (!duration) {
    message.react(red)
    message.channel.send( `Geçerli bir süre belirtmelisin!`).then(x=>x.delete({timeout:5000})) 
    return }
    const reason = args.slice(2).join(" ") || "Belirtilmedi!";
    if (message.member.roles.highest.position <= member.roles.highest.position) 
    {
    message.react(red)
    message.channel.send( "Kendinle aynı yetkide ya da daha yetkili olan birini susturamazsın!").then(x=>x.delete({timeout:5000})) 
    return }
    if (!member.manageable) 
    {
    message.react(red)
    message.channel.send( "Bu üyeyi susturamıyorum!").then(x=>x.delete({timeout:5000})) 
    return }
    if (settings.voicemutelimit > 0 && vmuteLimit.has(message.author.id) && vmuteLimit.get(message.author.id) == settings.voicemutelimit) 
    {
    message.react(red)
    message.channel.send( "Saatlik susturma sınırına ulaştın!").then(x=>x.delete({timeout:5000})) 
    return }
    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send(`${member} üyesi \`voice mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`);
    member.roles.add(conf.voiceMute);
    if (member.voice.channelID && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    message.react(green)
    message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle **sesli kanallarda** susturuldu! \`(Ceza ID: #${penal.id})\``).then(x=>x.delete({timeout:50000}))
    if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle **sesli kanallarda** susturuldunuz!`).catch(() => {});

    const time = ms(duration).replace("h", " saat").replace("m", " dakika").replace("s", " saniye");
    const log = embed
    .setColor("#2f3136")
    .setDescription(`
${member.toString()} Adlı Kişiye Ses Mutesi Atıldı

${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Süresi: \`${time}\`
${kirmiziok} Ceza Sebebi: \`${reason}\`
    `)
    .setFooter(`${moment(Date.now()).format("LLL")}`)
    message.guild.channels.cache.get(conf.vmuteLogChannel).send(log);

    if (settings.voicemutelimit > 0) {
      if (!vmuteLimit.has(message.author.id)) vmuteLimit.set(message.author.id, 1);
      else vmuteLimit.set(message.author.id, vmuteLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (vmuteLimit.has(message.author.id)) vmuteLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
  },
};

