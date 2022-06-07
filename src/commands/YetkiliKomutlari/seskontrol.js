const conf = require("../../configs/sunucuayar.json")
const { red, green } = require("../../configs/emojis.json");
const voice = require("../../schemas/voiceInfo");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  conf: {
    aliases: ["nerede", "n","sestemi"],
    name: "nerede",
    help: "nerede"
  },

  run: async (client, message, args, embed) => {
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) 
    {message.react(red)
    return
    }
    const channel = message.guild.channels.cache.get(args[0]);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (channel) {
      const data = await voice.find({}).sort({ date: -1 });
      message.channel.sendEmbed(embed.setDescription(`
\`${channel.name}\` adlı kanaldaki üyelerin ses bilgileri:

${channel.members.map((x) => `${x.toString()}: \`${data.find((u) => u.userID === x.user.id) ? moment.duration(Date.now() - data.find((u) => u.userID === x.user.id).date).format("H [saat], m [dakika], s [saniyedir]") : "Bulunamadı!"} seste.\``).join("\n")}
      `));
    } else {
      embed.setThumbnail(member.user.avatarURL({ dynamic: true, size: 2048 }));
      if (!member.voice.channel) return message.channel.send(`${red} ${member.toString()} üyesi herhangi bir ses kanalında bulunmuyor!`);

      const data = await voice.findOne({ userID: member.user.id });
      message.react(green)
      message.channel.send(embed.setDescription(`
${member.toString()} üyesi **${member.voice.channel.name}** kanalında.
**-------------**
\`Mikrofonu:\` ${member.voice.mute ? `Kapalı ${red}` : `Açık ${green}`}
\`Kulaklığı:\` ${member.voice.deaf ? `Kapalı ${red}` : `Açık ${green}`}

${data ? `${moment.duration(Date.now() - data.date).format("H [saat], m [dakika], s [saniyedir]")} seste.` : ""}
      `));
    }
  },
};