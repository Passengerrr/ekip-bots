const moment = require("moment");
moment.locale("tr");
const { MessageEmbed } = require("discord.js");
const snipe = require("../schemas/snipe");
const conf = require("../configs/sunucuayar.json");
module.exports = async (message) => {
  if (message.author.bot) return;

  await snipe.findOneAndUpdate({ guildID: message.guild.id, channelID: message.channel.id }, { $set: { messageContent: message.content, userID: message.author.id, image: message.attachments.first() ? message.attachments.first().proxyURL : null, createdDate: message.createdTimestamp, deletedDate: Date.now() } }, { upsert: true });
  const channel = message.guild.channels.cache.get(conf.messageLogChannel);
  if (!channel) return;
  const embed = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setColor("RANDOM")
    .setTitle(`${message.channel.name} adlı kanalda bir mesaj silindi!`)
    .setDescription(message.content)
    .setFooter(`ID: ${message.author.id} • ${moment().calendar()}`);
  
  if (message.attachments.first()) embed.setImage(message.attachments.first().proxyURL);
  channel.wsend(embed);
};

module.exports.conf = {
  name: "messageDelete",
};
