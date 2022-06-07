const moment = require("moment");
moment.locale("tr");
const penals = require("../../schemas/penals");
const conf = require("../../configs/sunucuayar.json")
const settings = require("../../configs/settings.json")
const {red, green, Revuu} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["unmute","uncmute"],
    name: "unmute",
    help: "unmute"
  },

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission(8) && !conf.cmuteHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send( "Yeterli yetkin bulunmuyor!").then(x=>x.delete({timeout:5000})) 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.react(red)
    message.channel.send( "Bir üye belirtmelisin!").then(x=>x.delete({timeout:5000})) 
    return }
    if (!conf.chatMute.some(x => member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send( "Bu üye muteli değil!").then(x=>x.delete({timeout:5000}))   
    return }
    if (!message.member.hasPermission(8) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    message.react(red)
    message.channel.send( "Kendinle aynı yetkide ya da daha yetkili olan birinin susturmasını kaldıramazsın!").then(x=>x.delete({timeout:5000})) 
    return }
    if (!member.manageable) 
    {
    message.react(red)
    message.channel.send( "Bu üyenin susturmasını kaldıramıyorum!").then(x=>x.delete({timeout:5000})) 
    return }
    
    message.react(green)
    member.roles.remove(conf.chatMute);
    const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "CHAT-MUTE", active: true });
    if (data) {
      data.active = false;
      await data.save();
    }
    message.lineReply(`${green} ${member.toString()} üyesinin susturması, ${message.author} tarafından kaldırıldı!`).then(x=>x.delete({timeout:50000}))
    if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından susturmanız kaldırıldı!`).catch(() => {});

    const log = embed
      .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true, size: 2048 }))
      .setColor("#2f3136")
      .setDescription(`
      ${member.toString()} Adlı Kişinin Chat Mutesi Kaldırıldı
      
${Revuu} Mute Kaldıran Kişi : ${message.author} (\`${message.author.id}\`)
          `)
          .setFooter(`${moment(Date.now()).format("LLL")}`)
    message.guild.channels.cache.get(conf.cmuteLogChannel).wsend(log);
  },
};


