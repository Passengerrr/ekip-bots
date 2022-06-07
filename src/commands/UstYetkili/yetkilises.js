const conf = require("../../configs/sunucuayar.json")
const ayar = require("../../configs/settings.json")
const moment = require("moment");
moment.locale("tr");
const { red } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["ysay","yetkilises","sesteolmayan"],
    name: "ysay",
    help: "ysay"
  },

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.react(red)
    let NoVoice = message.guild.members.cache.filter(Tau => Tau.roles.cache.has(ayar.registerPerm)).filter(filterTau => !filterTau.voice.channel&&filterTau.presence.status!="offline")
    message.channel.send(`
Aktif olup seste olmayan yetkililer ;
Seslere geçelim aktifliğiniz ile puanlarınız yükselir ve yetki atlayabilirsiniz.    
${NoVoice.map(noVoiceMember => `${noVoiceMember}  (${noVoiceMember.user.tag})`).join('\n')}`)
    
}}
