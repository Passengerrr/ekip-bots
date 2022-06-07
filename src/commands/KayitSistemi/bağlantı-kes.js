const Discord = require("discord.js")
const ayar = require("../../configs/sunucuayar.json")

module.exports = {
  conf: {
    aliases: ["kes","voicekick","at"],
    name: "Bağlantı-Kes",
    help: "Bağlantı-Kes"
  },

  run: async (client, message, args, embed, prefix) => { 
    if(!ayar.teyitciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return; 

       const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member.voice.channel) return message.lineReply("Bağlantısını kesmek istediğiniz kullanıcı sesli odalarda bulunmuyor.", message.author, message.channel)
        if(message.member.roles.highest.rawPosition < member.roles.highest.rawPosition) return message.lineReply("Rolleri senden yüksek birinin ses kanallarında ki bağlantısını kesemezsin.", message.author, message.channel)
        const sestensiktirettim = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription("<@"+member+"> adlı kişinin **"+member.voice.channel.name+"** adlı ses kanalından çıkarıldı.")
        .setColor("RANDOM")
        member.voice.kick()
        message.lineReply(sestensiktirettim).then(message => { message.delete({ timeout : 7500 }) }).then(m => message.react(this.client.ok))  
  },
};
