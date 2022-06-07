const moment = require("moment");
moment.locale("tr");
module.exports = {
  conf: {
    aliases: ["allmute"],
    name: "allmute",
    help: "allmute"
  },

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission("MOVE_MEMBERS")) return;
    let channel = message.guild.channels.cache.get(args[0]) || message.member.voice.channel;
    if (!channel) return message.channel.send("Bir kanal ID girmeli ya da bir sesli kanalda bulunmalısın!").then(x=>x.delete({timeout: 5000}))
    channel.members.filter((x) => !x.hasPermission("ADMINISTRATOR"))
      .forEach((x, index) => {
        client.wait(index * 1000);
        x.voice.setMute(true);
      });
    message.lineReply(`🎤 \`${channel.name}\` kanalındaki tüm üyeler susturuldu!`).then(x=>x.delete({timeout:50000}))
  },
};

