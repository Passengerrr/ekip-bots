const Discord = require('discord.js');
const { green, kirmiziok } = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["emoji","addemoji"],
    name: "emojiekle",
    owner: true,
  },

  run: async (client, message, args) => {

 if(!message.member.hasPermission("MANAGE_EMOJIS")) return message.channel.send(new Discord.MessageEmbed().setTitle('Hata!').setColor('#ff0000').setDescription(`${message.author} bu komutu kullanabilmek için \`Emojileri Yönet\` Yetkisine sahip olmalısın.`));
    let link = args[0]
    let isim = args[1];
    let guild = message.guild;
    if (!link) return message.channel.send('Link Girmelisin');
    if (!isim) return message.channel.send('Emojiye isim seçmelisin');

    guild.emojis.create(`${link}`, `${isim}`)
        .then(emoji => 
         message.channel.send(`${kirmiziok} \`${isim}\` adlı emojiyi sunucuya ekledim.`))
         message.react(green)
        .catch(console.error);

    },
  };
