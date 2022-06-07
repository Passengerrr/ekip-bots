const conf = require("../../configs/sunucuayar.json")
module.exports = {
  conf: {
    aliases: ["kilit","lock"],
    name: "kilit",
    help: "kilit"
  },

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (args[0] == "kilit" || args[0] == "kapat" || args[0] == "kilitle") {
      message.channel.updateOverwrite(message.guild.id, {
          SEND_MESSAGES: false
      }).then(async() => {
          message.react("🔒")
          await message.lineReply("Kanal başarıyla kilitlendi.", message.author, message.channel)
      })
  }

  if (args[0] == "aç") {
      message.channel.updateOverwrite(message.guild.id, {
          SEND_MESSAGES: null
      }).then(async() => {
          message.react("🔓")
          await message.lineReply("Kanalın kilidi başarıyla açıldı.", message.author, message.channel)
      })
  }
  },
};

