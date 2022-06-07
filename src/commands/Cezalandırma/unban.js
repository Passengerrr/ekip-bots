const moment = require("moment");
moment.locale("tr");
const penals = require("../../schemas/penals");
const conf = require("../../configs/sunucuayar.json")
const settings = require("../../configs/settings.json")
const { red, green, Cezaa, Revuu, kirmiziok } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["unban"],
    name: "unban",
    help: "unban"
  },

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission("BAN_MEMBERS") && !conf.banHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send( "Yeterli yetkin bulunmuyor!").then(x=>x.delete({timeout:5000})) 
    return }
    if (!args[0]) 
    {
    message.react(red)
    message.channel.send( "Bir üye belirtmelisin!").then(x=>x.delete({timeout:5000})) 
    return }
    const ban = await client.fetchBan(message.guild, args[0]);
    if (!ban) 
    {
    message.react(red)
    message.channel.send( "Bu üye banlı değil!").then(x=>x.delete({timeout:5000}))
    return }
    message.guild.members.unban(args[0], `${message.author.username} tarafından kaldırıldı!`).catch(() => {});
    const data = await penals.findOne({ userID: ban.user.id, guildID: message.guild.id, type: "BAN", active: true });
    if (data) {
      data.active = false;
      await data.save();
    }
    message.react(green)
    message.lineReply(`${green} \`(${ban.user.username.replace(/\`/g, "")} - ${ban.user.id})\` adlı üyenin banı ${message.author} tarafından kaldırıldı!`).then(x=>x.delete({timeout:50000}))
    if (settings.dmMessages) ban.user.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından banınız kaldırıldı!`).catch(() => {});

    const log = embed
      .setAuthor(ban.user.username, ban.user.avatarURL({ dynamic: true, size: 2048 }))
      .setColor("#2f3136")
      .setDescription(`
${Cezaa} Banı Kaldıran Üye: \`(${ban.user.username.replace(/\`/g, "")} - ${ban.user.id})\`
${Revuu} Banı Kaldıran Yetkili: ${message.author} \`${message.author.id}\`
${kirmiziok} Banın Kaldırılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
      `)
    message.guild.channels.cache.get(conf.banLogChannel).wsend(log);
  },
};

