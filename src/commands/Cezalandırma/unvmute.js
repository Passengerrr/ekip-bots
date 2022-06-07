const coin = require("../../schemas/coin");
const moment = require("moment");
const ceza = require("../../schemas/ceza");
const banLimit = new Map();
moment.locale("tr");
const penals = require("../../schemas/penals");
const conf = require("../../configs/sunucuayar.json")
const { red, green , Revuu} = require("../../configs/emojis.json")
const settings = require("../../configs/settings.json")
module.exports = {
  conf: {
    aliases: ["unvmute"],
    name: "unvmute",
    help: "unvmute"
  },

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission(8) && !conf.vmuteHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send( "Yeterli yetkin bulunmuyor!").then(x=>x.delete({timeout:5000})) }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.react(red)
    message.channel.send( "Bir üye belirtmelisin!").then(x=>x.delete({timeout:5000})) }
    if (!conf.voiceMute.some(x => member.roles.cache.has(x)) && (member.voice.channelID && !member.voice.serverMute)) 
    {
    message.react(red)
    message.channel.send( "Bu üye muteli değil!").then(x=>x.delete({timeout:5000})) }
    if (!message.member.hasPermission(8) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    message.react(red)
    message.channel.send( "Kendinle aynı yetkide ya da daha yetkili olan birinin susturmasını kaldıramazsın!").then(x=>x.delete({timeout:5000}))}
    if (!member.manageable) 
    {
    message.react(red)
    message.channel.send( "Bu üyenin susturmasını kaldıramıyorum!").then(x=>x.delete({timeout:5000})) }

    message.react(green)
    member.roles.remove(conf.voiceMute);
    if (member.voice.channelID && member.voice.serverMute) member.voice.setMute(false);
    const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "VOICE-MUTE", active: true });
    if (data) {
      data.active = false;
      data.removed = true;
      await data.save();
    }
    message.lineReply(`${green} ${member.toString()} üyesinin **sesli kanallarda** susturması, ${message.author} tarafından kaldırıldı!`).then(x=>x.delete({timeout:50000}))
    if (settings.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından **sesli kanallarda** olan susturmanız kaldırıldı!`).catch(() => {});

    const log = embed
      .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true, size: 2048 }))
      .setColor("#2f3136")
      .setDescription(`
      ${member.toString()} Adlı Kişinin Ses Mutesi Kaldırıldı
      
${Revuu} Mute Kaldıran Kişi : ${message.author} (\`${message.author.id}\`)
          `)
          .setFooter(`${moment(Date.now()).format("LLL")}`)
    message.guild.channels.cache.get(conf.vmuteLogChannel).wsend(log);
  },
};


