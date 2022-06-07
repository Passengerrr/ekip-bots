const Discord = require("discord.js")
const { green, red } = require("../../configs/emojis.json")
const conf = require("../../configs/sunucuayar.json")
module.exports = {
    conf: {
      aliases: ["tagsay"],
      name: "tagsay",
      help: "tagsay"
    },
  
    run: async (client, message, args, embed) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) { message.channel.send("Yeterli yetkin bulunmuyor!").then(x=>x.delete({timeout:5000}))
        message.react(red)
        return }

      let tag = conf.tags
      let tag2 = conf.tags2
      let tag3 = conf.tags3
      let tag4 = conf.tags4
      let tag5 = conf.tags5
      let tag6 = conf.tags6
      let tag7 = conf.tags7
      let etiket = conf.etikets

        let page = 1;
        const memberss = message.guild.members.cache.filter((member) => member.user.username.includes(tag) || member.user.username.includes(tag2) || member.user.username.includes(tag3) || member.user.username.includes(tag4) || member.user.username.includes(tag5) || member.user.username.includes(tag6) || member.user.username.includes(tag7) || member.user.discriminator == etiket  && !member.user.bot);
        let liste = memberss.map((member) => `${member} - \`${member.id}\``) || `**${tag},${tag2},${tag3},${tag4},${tag5},${tag6},${tag7},${etiket}** taglı kullanıcı yok`
        var msg = await message.channel.send(new Discord.MessageEmbed().setDescription(`Kullanıcı adında **${tag},${tag2},${tag3},${tag4},${tag5},${tag6},${tag7},${etiket}** tagı olan **${memberss.size}** kişi bulunuyor:\n\n ${liste.slice(page == 1 ? 0 : page * 40 - 40, page * 40).join('\n')}`).setColor("RANDOM"));
        if (liste.length > 40) {
            await msg.react(`⬅️`);
            await msg.react(`➡️`);
            let collector = msg.createReactionCollector((react, user) => ["⬅️", "➡️"].some(e => e == react.emoji.name) && user.id == message.member.id, { time: 200000 });
            collector.on("collect", (react) => {
                if (react.emoji.name == "➡️") {
                    if (liste.slice((page + 1) * 40 - 40, (page + 1) * 40).length <= 0) return;
                    page += 1;
                    let tagsay = liste.slice(page == 1 ? 0 : page * 40 - 40, page * 40).join("\n");
                    msg.edit(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`Kullanıcı adında **${tag},${tag2},${tag3},${tag4},${tag5},${tag6},${tag7},${etiket}** tagı olan **${memberss.size}** kişi bulunuyor:\n\n${tagsay}`).setColor("RANDOM"));
                    react.users.remove(message.author.id)
                }
                if (react.emoji.name == "⬅️") {
                    if (liste.slice((page - 1) * 40 - 40, (page - 1) * 40).length <= 0) return;
                    page -= 1;
                    let tagsay = liste.slice(page == 1 ? 0 : page * 40 - 40, page * 40).join("\n");
                    msg.edit(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`Kullanıcı adında **${tag},${tag2},${tag3},${tag4},${tag5},${tag6},${tag7},${etiket}** tagı olan **${memberss.size}** kişi bulunuyor:\n\n${tagsay}`).setColor("RANDOM"));
                    react.users.remove(message.author.id)
                }
            })
        }
      },
    };
