const moment = require("moment");
moment.locale("tr");
const penals = require("../../schemas/penals");
const { green , red } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["sicil"],
    name: "sicil",
    help: "sicil"
  },

  run: async (client, message, args, embed) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let data = await penals.find({ guildID: message.guild.id, userID: member.user.id, }).sort({ date: -1 });
    if (data.length === 0) return message.channel.send(`${green} ${member.toString()} üyesinin sicili temiz!`).then(x=>x.delete({timeout:5000}))
    data = data.map((x) => `#${x.id} ${x.active ? green : red} **[${x.type}]** ${moment(x.date).format("LLL")} tarihinde, <@${x.staff}> tarafından, \`${x.reason}\` nedeniyle, ${x.type.toLowerCase().replace("-", " ")} cezası almış.\n─────────────────`).join("\n");
    for (var i = 0; i < Math.floor(data.length / 2000); i++) {
      message.channel.send(embed.setDescription(data.slice(0, 2000)));
      data = data.slice(2000);
    }
    if (data.length > 0) message.channel.send(embed.setDescription(data));
  },
};