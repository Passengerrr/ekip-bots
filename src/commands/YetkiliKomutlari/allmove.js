const { MessageFlags } = require("discord.js");
const {red, green} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["toplutaşı","allmove"],
    name: "toplutaşı",
    help: "toplutaşı"
  },

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission("MOVE_MEMBERS")) return message.react(red)
    if (!args[0])  
    {
    message.react(red)
    message.channel.send("Üyelerin taşınacağı bir kanal ID'si girmelisin!").then(x=>x.delete({timeout:5000})) 
    return }
    if (message.member.voice.channelID) {
      const channel = message.member.voice.channel;
      channel.members.forEach((x, index) => {
        client.wait(index * 1000);
        x.voice.setChannel(args[0]);
      });
      message.channel.send(embed.setDescription(`\`${channel.name}\` kanalındaki tüm üyeler \`${message.guild.channels.cache.get(args[0]).name}\` adlı kanala taşındı!`));
    } else {
      const channel = message.guild.channels.cache.get(args[0]);
      channel.members.forEach((x, index) => {
        client.wait(index * 1000);
        x.voice.setChannel(args[1]);
      });
      message.channel.send(embed.setDescription(`\`${channel.name}\` kanalındaki tüm üyeler \`${message.guild.channels.cache.get(args[1]).name}\` adlı kanala taşındı!`));
    }
  },
};
