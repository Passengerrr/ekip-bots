const client = global.client;
const cfg = require("../configs/settings.json")
const ayar = require("../configs/sunucuayar.json")
const voiceUser = require("../schemas/voiceUser");
const moment = require("moment");
const { MessageEmbed } = require("discord.js");

module.exports = async () => {
    const voiceUsersData = await voiceUser.find({ guildID: cfg.guildID }).sort({ topStat: -1 });
    const voiceUsers = voiceUsersData.splice(0, 30).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\``).join(`\n`);

  let LeaderBoard = await client.guilds.cache.get(cfg.guildID).channels.cache.get(ayar.VoiceLeaderBoard).messages.fetch(ayar.VoiceMsgListID);
  setInterval(() => {
  checkingLeader()
  }, 600000);
  function checkingLeader() {  
  const voiceList = (`${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`)

  let MessageEdit = new MessageEmbed()
  MessageEdit.setColor("BLACK")
  MessageEdit.setAuthor(`Ses Sıralaması | Tüm Zamanlar`, client.guilds.cache.get(cfg.guildID).iconURL({dynamic:true}))
  MessageEdit.setFooter(`Güncellenme: ${moment(Date.parse(new Date().toLocaleString("tr-TR", { timeZone: "Asia/Istanbul" }))).locale("TR").format("LLL")}`)
  MessageEdit.setDescription(`${voiceList}` )
  LeaderBoard.edit(MessageEdit)

}
}
module.exports.conf = {
  name: "ready",
};
