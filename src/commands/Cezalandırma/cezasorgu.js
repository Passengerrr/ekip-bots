
const moment = require("moment");
const emojis = require("../../configs/emojis.json")
const penals = require("../../schemas/penals")
moment.locale("tr");
module.exports = {
  conf: {
    aliases: ["cezasorgu","sorgu"],
    name: "cezasorgu",
    help: "cezasorgu"
  },

  run: async (client, message, args, embed) => {
    if (isNaN(args[0])) return message.channel.send("Ceza ID'si bir sayı olmalıdır!").then(x=>x.delete({timeout:5000}))
    const data = await penals.findOne({ guildID: message.guild.id, id: args[0] });
    if (!data) return message.channel.send(`${args[0]} ID'li bir ceza bulunamadı!`).then(x=>x.delete({timeout:5000}))
    message.channel.send(embed.setDescription(`#${data.id} ${data.active ? emojis.red : emojis.green} **[${data.type}]** <@${data.userID}> üyesi, ${moment(data.date).format("LLL")} tarihinde, <@${data.staff}> tarafından, \`${data.reason}\` nedeniyle, ${data.type.toLowerCase().replace("-", " ")} cezası almış.`));
  },
};


