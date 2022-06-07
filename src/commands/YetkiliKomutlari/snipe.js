const { MessageEmbed } = require("discord.js");
const conf = require("../../configs/sunucuayar.json")
const snipe = require("../../schemas/snipe");
const moment = require("moment");
require("moment-duration-format");
const { miniicon, mesaj2, green, red } = require("../../configs/emojis.json");
module.exports = {
  conf: {
    aliases: ["snipe"],
    name: "snipe",
    help: "snipe"
  },

  run: async (client, message, args) => {
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) 
    {
      message.react(red)
      return
    }

    let hembed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('#330066')

    const data = await snipe.findOne({ guildID: message.guild.id, channelID: message.channel.id });
    if (!data) 
    {
    message.react(red)
    message.channel.send( "Bu kanalda silinmiş bir mesaj bulunmuyor!").then(x=>x.delete({timeout:5000})) 
    return }
    const author = await client.fetchUser(data.author);
hembed.setDescription(`
${data.messageContent ? `\n${mesaj2} Mesaj içeriği: **${data.messageContent}**` : ""}
${miniicon} Mesaj Sahibi: <@${data.userID}> - (\`${data.userID}\`)
${miniicon} Mesajın Yazılma Tarihi: \`${moment.duration(Date.now() - data.createdDate).format("D [gün], H [saat], m [dakika], s [saniye]")}\` önce
${miniicon} Mesajın Silinme Tarihi: \`${moment.duration(Date.now() - data.deletedDate).format("D [gün], H [saat], m [dakika], s [saniye]")}\` önce 
`);
 message.channel.send(hembed);
 message.react(green)

},
};
