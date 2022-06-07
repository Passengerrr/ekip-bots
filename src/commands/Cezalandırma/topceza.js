
const { green , red } = require("../../configs/emojis.json")
const ceza = require("../../schemas/ceza");
module.exports = {
  conf: {
    aliases: ["topceza","tc"],
    name: "topceza",
    help: "topceza"
  },

  run: async (client, message, args, embed) => {
    let cezaTop = await ceza.find({ guildID: message.guild.id }).sort({ top: -1 });
    if (!cezaTop.length) 
    {
    message.react(red)
    message.channel.send("Herhangi bir ceza verisi bulunamadı!").then(x=>x.delete({timeout:5000})) 
    return }
    cezaTop = cezaTop.filter((x) => message.guild.members.cache.has(x.userID)).splice(0, 10);
    message.react(green)
    message.channel.send(embed.setDescription(cezaTop.map((x, i) => `\`${i + 1}.\` <@${x.userID}> Toplam **${x.top}**`)));
 
},
};


