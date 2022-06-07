const coin = require("../../schemas/coin");
const moment = require("moment");
const ceza = require("../../schemas/ceza");
const cezapuan = require("../../schemas/cezapuan")
const banLimit = new Map();
moment.locale("tr");
const conf = require("../../configs/sunucuayar.json")
const settings = require("../../configs/settings.json")
const { red, green, Cezaa, Revuu, kirmiziok } = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["ban","yargı"],
    name: "ban",
    help: "ban"
  },

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission("BAN_MEMBERS") &&  !conf.banHammer.some(x => message.member.roles.cache.has(x))) { message.channel.send("Yeterli yetkin bulunmuyor!").then(x=>x.delete({timeout:5000}))
    message.react(red)
    return }
    if (!args[0]) { message.channel.send( "Bir üye belirtmelisin!").then(x=>x.delete({timeout:5000}))
    message.react(red)
    return }
    const user = message.mentions.users.first() || await client.fetchUser(args[0]);
    if (!user) { message.channel.send("Böyle bir kullanıcı bulunamadı!").then(x=>x.delete({timeout:5000}))
    message.react(red)
    return }
    const ban = await client.fetchBan(message.guild, args[0]);
    if (ban) { message.channel.send( "Bu üye zaten banlı!").then(x=>x.delete({timeout:5000}))
    message.react(red)
    return }
    const reason = args.slice(1).join(" ") || "Belirtilmedi!";
    const member = message.guild.members.cache.get(user.id);

    if (message.guild.members.cache.has(user.id) && message.guild.members.cache.get(user.id).hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("Üst yetkiye sahip kişileri yasaklayamazsın!").then(x=>x.delete({timeout:5000}))
    if (message.guild.members.cache.has(user.id) && message.member.roles.highest.position <= message.guild.members.cache.get(user.id).roles.highest.position) return message.channel.send("Kendinle aynı yetkide ya da daha yetkili olan birini banlayamazsın!").then(x=>x.delete({timeout:5000}))
    if (member && !member.bannable) return message.channel.send( "Bu üyeyi banlayamıyorum!").then(x=>x.delete({timeout:5000}))
    if (settings.banlimit > 0 && banLimit.has(message.author.id) && banLimit.get(message.author.id) == settings.banlimit) return message.channel.send("Saatlik ban sınırına ulaştın!").then(x=>x.delete({timeout:5000}))
    message.react(green)
    if (settings.dmMessages) user.send(`**${message.guild.name}** sunucusundan, **${message.author.tag}** tarafından, **${reason}** sebebiyle banlandınız!`).catch(() => {});
    message.guild.members.ban(user.id, { reason: `${reason} | Yetkili: ${message.author.tag}` , days:1}).catch(() => {});
    const penal = await client.penalize(message.guild.id, user.id, "BAN", true, message.author.id, reason);

    const messageEmbed = embed
    .setColor("RANDOM")
    .setAuthor(message.author.tag, message.author.avatarURL({
        dynamic: true
    }))
    .setTimestamp()
    .setImage("https://cdn.discordapp.com/attachments/751526628340793427/781384793207472158/bangif4.gif")
    .setDescription(`**${member ? member.toString() : user.username}** Üyesi Sunucudan **${reason}** Sebebiyle \n${message.author} Tarafından banlandı! Ceza Numarası: (\`#${penal.id}\`)`)

    message.react(green)
    message.lineReply(messageEmbed);

    const log = embed
      .setDescription(`
${Cezaa} Banlanan Üye: **${member ? member.toString() : user.username}** \`${user.id}\`
${Revuu} Banlayan Yetkili: ${message.author} \`${message.author.id}\`
${kirmiziok} Ban Sebebi: \`${reason}\`
      `)
      .setFooter(`${moment(Date.now()).format("LLL")}`)
      message.guild.channels.cache.get(conf.banLogChannel).send(log);

    await coin.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { coin: -100 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 100 } }, { upsert: true });

    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send(`${member} üyesi ban cezası alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`);

    if (settings.banlimit > 0) {
      if (!banLimit.has(message.author.id)) banLimit.set(message.author.id, 1);
      else banLimit.set(message.author.id, banLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (banLimit.has(message.author.id)) banLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
  },
};

