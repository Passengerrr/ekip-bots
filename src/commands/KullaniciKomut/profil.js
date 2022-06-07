const { MessageEmbed } = require("discord.js"); 
const moment = require("moment");
const isimler = require("../../schemas/names");
const register = require("../../schemas/registerStats");
const conf = require("../../configs/settings.json");
const Ayarlar = require("../../configs/sunucuayar.json");

require("moment-duration-format")
moment.locale("tr")
module.exports = {
    conf: {
      aliases: ["kullanıcıbilgi", "kb", "istatistik", "info","profil"],
      name: "kullanıcıbilgi",
      help: "kullanıcıbilgi"
    },
  
run: async (client, message, args, prefix) => {

  let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  if (üye.user.bot) return;
  
  let nameData = await isimler.findOne({ guildID: message.guild.id, userID: üye.id });
  let registerData = await register.findOne({ guildID: message.guild.id, userID: üye.id });

           const roles = üye.roles.cache.filter(role => role.id !== message.guild.id).sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`);
            const rolleri = []
            if (roles.length > 6) {
                const lent = roles.length - 6
                let itemler = roles.slice(0, 6)
                itemler.map(x => rolleri.push(x))
                rolleri.push(`${lent} daha...`)
            } else {
                roles.map(x => rolleri.push(x))
            }
            const members = message.guild.members.cache.filter(x => !x.user.bot).array().sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);
            const joinPos = members.map((u) => u.id).indexOf(üye.id);
            const previous = members[joinPos - 1] ? members[joinPos - 1].user : null;
            const next = members[joinPos + 1] ? members[joinPos + 1].user : null;
            const bilgi = `${previous ? `**${previous.tag}** > ` : ""}<@${üye.id}>${next ? ` > **${next.tag}**` : ""}`
            let member = message.guild.members.cache.get(üye.id)
            let nickname = member.displayName == üye.username ? "" + üye.username + " [Yok] " : member.displayName

  let embed = new MessageEmbed().setAuthor(üye.displayName, üye.user.avatarURL({ dynamic: true })).setTimestamp().setColor(üye.displayHexColor).setFooter(message.author.tag, message.author.avatarURL({ dynamic: true })).setThumbnail(üye.user.avatarURL({ dynamic: true }))
    .addField(`❯ Kullanıcı Bilgisi`,`
\`•\` Hesap: ${üye}
\`•\` Kullanıcı ID: ${üye.id}
\`•\` Durum: ${üye.user.presence.activities.length > 0 ? üye.user.presence.activities.map(e => e.name).join(", ") : "Aktivite Bulunmamakta"} 
\`•\` Kuruluş Tarihi: <t:${Math.round(member.user.createdTimestamp / 1000)}:D>
`)
    .addField(`❯ Sunucu Bilgisi`,`
\`•\` Sunucu İsmi: ${nickname}
\`•\` Katılım Tarihi: <t:${Math.round(üye.joinedAt / 1000)}:D>
\`•\` Katılım Sırası: ${(message.guild.members.cache.filter(a => a.joinedTimestamp <= üye.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}
\`•\` Katılım Bilgisi: ${bilgi}

\`•\` Bazı Rolleri: (${rolleri.length}): ${rolleri.join(", ")}
\`•\` İsim geçmişi:  **${nameData ? `${nameData.names.length}` : "0"}** ${nameData ? nameData.names.splice(0, 1).map((x, i) => `\`${x.name}\` (${x.rol}) (<@${x.yetkili}>)`).join("\n") : ""}
`);
  if (üye.hasPermission("ADMINISTRATOR") || Ayarlar.teyitciRolleri.some(x => üye.roles.cache.has(x))) 
    embed.addField(`❯ Yetkili Bilgisi`,
`• Toplam kayıt: ${registerData ? registerData.top : 0} • Erkek kayıt : ${registerData ? registerData.erkek : 0} • Kadın kayıt : ${registerData ? registerData.kız : 0} •`)
  message.lineReply(embed);

  
  if (üye.presence.activities.some(x => x.name == "Spotify" && x.type == "LISTENING")) {
    let presence = üye.presence.activities.find(x => x.name == "Spotify");
    let x = Date.parse(presence.timestamps.start)
    let y = Date.parse(presence.timestamps.end)
    let progressBar = ["▬", "▬", "▬", "▬", "▬", "▬", "▬", "▬", "▬", "▬", "▬", "▬", "▬"];
    let time = Date.now() - presence.timestamps.start
    let time2 = y - x
    let momi = moment.duration(time).format("mm[:]ss")
    if (momi.length === 2) {
      momi = '00:'.concat(momi)
    }
    let calcul = Math.round(progressBar.length * (time / time2));
    progressBar[calcul] = "🟢"
    message.lineReply(new MessageEmbed().setAuthor("Spotify bilgi                                                                ", client.user.avatarURL()).setColor("#07c41d").setImage(`https://i.scdn.co/image/${presence.assets.largeImage.slice(8)}`).setDescription(
`​ \`Şarkı ismi\`: [**${presence.details}**](https://open.spotify.com/track/${presence.syncID}) 
​ \`Sanatçı\`: **${presence.state.includes("Teoman") ? "TEOMAN!" : presence.state}**
​ \`Albüm\`: **${presence.assets.largeText}**   
​ \`(${momi}/${moment.duration(y - x).format("m[:]ss")})\` ${progressBar.join('')}`
    ));
  }
  
}
}

