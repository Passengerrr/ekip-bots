const conf = require("../../configs/sunucuayar.json")
const { red } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["say"],
    name: "say",
    help: "say"
  },

  run: async (client, message, args, embed) => {
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) 
    {
      message.react(red)
      return
    }
    let Tag = conf.tags
    let Tag2 = conf.tags2
    let Tag3 = conf.tags3
    let Tag4 = conf.tags4
    let Tag5 = conf.tags5
    let Tag6 = conf.tags6
    let Tag7 = conf.tags7
    let etiket = conf.etikets

           let tag = message.guild.members.cache.filter((member) => member.user.username.includes(Tag) || member.user.username.includes(Tag2) || member.user.username.includes(Tag3) || member.user.username.includes(Tag4) || member.user.username.includes(Tag5) || member.user.username.includes(Tag6) || member.user.username.includes(Tag7) || member.user.discriminator == etiket);
           let sesli = message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b);
           message.channel.send(embed
               .setColor('RANDOM')
               .setDescription(`
\`❯\` Şu anda toplam **${sesli}** kişi seslide.
\`❯\` Sunucuda **${message.guild.memberCount}** adet üye var (**${message.guild.members.cache.filter(member => member.presence.status !== "offline").size}** Aktif)
\`❯\` Toplamda **${tag.size}** kişi tagımızı alarak bizi desteklemiş.
\`❯\` Toplamda **${message.guild.premiumSubscriptionCount}** adet boost basılmış! ve Sunucu **${message.guild.premiumTier}** seviye`)
 )
 
   },
 };
