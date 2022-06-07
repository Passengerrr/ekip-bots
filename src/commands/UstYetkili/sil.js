const { green, red } = require("../../configs/emojis.json")
module.exports = {
    conf: {
      aliases: ["sil","temizle"],
      name: "sil",
      help: "sil"
    },
  
    run: async (client, message, args, embed) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return;
        if (!args[0]) return message.channel.send(`${red} Bir miktar belirtmelisin!`).then(x=>x.delete({timeout: 5000}))
        if (isNaN(args[0])) return message.channel.send(`${red} Belirttiğin miktar bir sayı olmalı!`).then(x=>x.delete({timeout: 5000}))
        await message.delete();
        await message.channel.bulkDelete(args[0]);
        message.channel.send(`${green} ${args[0]} adet mesaj silindi!`).then(x=>x.delete({timeout: 5000}))
      },
    };
    
    
  
  