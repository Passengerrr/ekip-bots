const bannedTag = require("../../schemas/bannedTag");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const conf = require("../../configs/sunucuayar.json")
const settings = require("../../configs/settings.json")
module.exports = {
  conf: {
    aliases: ["yasaklı-tag", "bannedtag","ytag"],
    name: "yasaklıtag",
    help: "yasaklıtag [ekle/sil] [tag] / [say/liste]",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, perm) => {

        if (!message.member.hasPermission("ADMINISTRATOR")) return
        await bannedTag.findOne({ guildID: message.guild.id }, async (err, res) => {
            if (args[0] == "ekle") {
                if (!args[1]) return message.lineReply("Yasaklıya atmak istediğin tagı belirtmelisin.", message.author, message.channel)
                if (!res) {
                    let arr = []
                    arr.push(args[1])
                    const newData = new bannedTag({ guildID: message.guild.id, taglar: arr })
                    newData.save().catch(e => console.log(e))
                    let üyeler = message.guild.members.cache.filter(x => {
                        return x.user.username.includes(args[1])
                    })
                    await message.lineReply("**" + args[1] + "** tagında " + üyeler.size + " kişi bulundu hepsine yasaklı tag permi veriyorum.", message.author, message.channel)
                   await bannedTag.findOneAndUpdate({ guildID: message.guild.id }, { $push: { tags: args[1] } }, { upsert: true });
                    üyeler.map(x => {
                        if (x.roles.cache.has(conf.yasaktagRole)) return
                        setTimeout(() => {
                            x.setNickname('Yasaklı Tag');
                            x.roles.set(conf.yasaktagRole)
                        }, 1000)
                    })
                } else {
                    let taglar = res.taglar
                    if (taglar.includes(args[1])) return message.lineReply("Yasaklıya atmak istediğin tag veritabanında zaten yasaklı.", message.author, message.channel)
                    res.taglar.push(args[1])
                    res.save().catch(e => console.log(e))
                   await bannedTag.findOneAndUpdate({ guildID: message.guild.id }, { $push: { tags: args[1] } }, { upsert: true });
                    let üyeler = message.guild.members.cache.filter(x => {
                        return x.user.username.includes(args[1])
                    }) 
                    await message.lineReply("**" + args[1] + "** tagında " + üyeler.size + " kişi bulundu hepsine yasaklı tag permi veriyorum.", message.author, message.channel)
                    üyeler.map(x => {
                        if (x.roles.cache.has(conf.yasaktagRole)) return
                        setTimeout(() => {
                            x.setNickname('Yasaklı Tag');
                            x.roles.set(conf.yasaktagRole)
                        }, 1000)
                       x.send(`${message.guild.name} adlı sunucumuza olan erişiminiz engellendi! Sunucumuzda yasaklı olan bir simgeyi (`+ args[1] +`) isminizde taşımanızdan dolayıdır. Sunucuya erişim sağlamak için simgeyi (`+ args[1] +`) isminizden çıkartmanız gerekmektedir.\n\nSimgeyi (`+ args[1] +`) isminizden kaldırmanıza rağmen üstünüzde halen Yasaklı Tag rolü varsa sunucudan gir çık yapabilirsiniz veya sağ tarafta bulunan yetkililer ile iletişim kurabilirsiniz. **-Yönetim**\n\n__Sunucu Tagımız__\n**${conf.tag}**`)
                    })

                }
            }

            if (args[0] == "liste" && !args[1]) {
                if (!res) return await message.lineReply("Sunucuda yasaklanmış tag bulunmamakta.", message.author, message.channel)
                let num = 1
                let arrs = res.taglar.map(x => `\`${num++}.\` ${x} - (${client.users.cache.filter(s => s.username.includes(x)).size} üye)`)
                await message.lineReply(arrs.join("\n"), message.author, message.channel)
            }

            if (args[0] == "liste" && args[1] == "üye") {
                if (!args[2]) await message.lineReply("Üyelerini listelemek istediğin yasaklı tagı belirtmelisin.", message.author, message.channel)
                if (!res) return await message.lineReply("Veritabanında listelenecek yasaklı tag bulunmuyor.", message.author, message.channel)
                if (!res.taglar.includes(args[2])) return await message.lineReply("**" + res.taglar.join(",") + "** tag(ları) sunucuda yasaklanmış durumdadır. Belirttiğin tag veritabanında bulunmuyor.", message.author, message.channel)
                let üyeler = message.guild.members.cache.filter(x => {
                    return x.user.username.includes(args[2])
                }).map(x => "<@" + x.id + "> - (`" + x.id + "`)")
                let üyelerk = message.guild.members.cache.filter(x => {
                    return x.user.username.includes(args[2])
                }).map(x => "" + x.user.tag + " - (`" + x.id + "`)")
                let text = üyeler.join("\n")
                let texto = üyelerk.join("\n")
                const MAX_CHARS = 3 + 2 + text.length + 3;
                if (MAX_CHARS > 2000) {
                    message.channel.send("Sunucuda çok fazla yasaklı (" + args[2] + ") taga ait kişi var bu yüzden txt olarak göndermek zorundayım.", { files: [{ attachment: Buffer.from(texto), name: "yasakli-tagdakiler.txt" }] });
                } else {
                    message.channel.send(text)
                }
            }

            if (args[0] == "kaldır") {
                if (!res) return await message.lineReply("Veritabanında kaldırılılacak yasaklı tag bulunmuyor.", message.author, message.channel)
                if (!res.taglar.includes(args[1])) return await message.lineReply("Belirttiğin tag yasaklı tag listesinde bulunmuyor", message.author, message.channel)
                let üyeler = message.guild.members.cache.filter(x => {
                    return x.user.username.includes(args[1])
                })
                await message.lineReply("**" + args[1] + "** tagında " + üyeler.size + " kişi bulundu hepsineden yasaklı tag permini alıp sistemden tagı kaldırıyorum.", message.author, message.channel)
                res.taglar = res.taglar.filter((x) => !x.includes(args[1]));
                res.save().catch(e => console.log(e))
                üyeler.map(x => {
                    setTimeout(async () => {
                    x.setNickname(`${conf.tag} İsim ' Yaş`);
                    x.roles.set(conf.unregRoles)
                    }, 1000);
                    x.send(`${message.guild.name}  adlı sunucumuza olan erişim engeliniz kalktı. İsminizden (`+ args[1] +`) sembolünü kaldırarak sunucumuza erişim hakkı kazandınız. Keyifli Sohbetler**-Yönetim**`)
                  })
            }

            if (args[0] == "kontrol") {
                if (!res) return await message.lineReply("Veritabanında kontrol edilecek yasaklı tag bulunmuyor.", message.author, message.channel)
                res.taglar.forEach(x => {
                    let üye = message.guild.members.cache.filter(mems => {
                        return mems.user.username.includes(x) && !mems.roles.cache.has(conf.yasaktagRole)
                    }).map(x => x.id)
                    message.channel.send(`${x} tagı bulunup <@&${conf.yasaktagRole}> rolü olmayan ${üye.length} kişiye rolü veriyorum.`)
                    for (let i = 0; i < üye.length;i++) {
                        setTimeout(() => {
                            message.guild.members.cache.get(üye[i]).roles.set(conf.yasaktagRole)
                        }, (i + 1) * 1000)
                    }
                })
            }
        })
    }
}