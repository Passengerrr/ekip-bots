const moment = require("moment");
moment.locale("tr")
module.exports = {
    conf: {
      aliases: ["yönetim","sunucu"],
      name: "ayar",
      help: "yönetim [resim] , [banner] , []",
      owner: true,
      enabled: true
    },
  
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {Array<String|Number>} args
     * @param {MessageEmbed} embed
     * @returns {Promise<void>}
     */
    run: async (client, message, args, embed) => {
    if(!args[0]) return message.reply(`Hata yaptın! Bir seçim belirtmelisin! \`resim , banner , isim , profile , nick\``).then(x=>x.delete({timeout:50000}))
    if(args[0] === "resim")
    { 
    message.attachments.forEach(attachment => {
    const url = attachment.url;
    message.guild.setIcon(url)
    });
    message.reply(`Başarılı bir şekilde sunucu resmi değiştirilmiştir!`).then(x=>x.delete({timeout:50000}))
    console.log(`${message.author.tag} (${message.author.id}) tarafından ${moment(message.createdAt).format("lll")} zamanında sunucu resmi değiştirildi!`)
    }
    if(args[0] === "isim") 
    {
    let isim = args.slice(1).join(" ")
    message.guild.setName(isim)
    message.reply(`Başarılı bir şekilde sunucu ismi \`${isim}\` olarak değiştirildi!`)
    console.log(`${message.author.tag} (${message.author.id}) tarafından ${moment(message.createdAt).format("lll")} zamanında sunucu ismi \`${isim}\` olarak değiştirildi!`)
    }
    if(args[0] === "banner")
    { 
    message.attachments.forEach(attachment => {
    const url = attachment.url;
    message.guild.setIcon(url)
    });
    message.reply(`Başarılı bir şekilde sunucu afişi değiştirilmiştir!`).then(x=>x.delete({timeout:50000}))
    console.log(`${message.author.tag} (${message.author.id}) tarafından ${moment(message.createdAt).format("lll")} zamanında sunucu afişi değiştirildi!`)
    }
    if(args[0] === "profile")
    { 
    message.attachments.forEach(attachment => {
    const url = attachment.url;
    if(!url) return message.reply(`Bir bot fotoğrafı seçmelisin!`)
    client.user.setAvatar(url);
    });
    message.reply(`Başarılı bir şekilde bot profili değiştirilmiştir!`).then(x=>x.delete({timeout:50000}))
    console.log(`${message.author.tag} (${message.author.id}) tarafından ${moment(message.createdAt).format("lll")} zamanında bot profili değiştirildi!`)
    }
    if(args[0] === "nick") 
    {
    let isim = args.slice(1).join(" ")
    client.user.setUsername(isim)
    message.reply(`Başarılı bir şekilde bot ismi \`${isim}\` olarak değiştirildi!`)
    console.log(`${message.author.tag} (${message.author.id}) tarafından ${moment(message.createdAt).format("lll")} zamanında bot ismi \`${isim}\` olarak değiştirildi!`)
    }
    },
  };