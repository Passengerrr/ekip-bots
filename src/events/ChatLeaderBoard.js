const client = global.client;
const cfg = require("../configs/settings.json")
const ayar = require("../configs/sunucuayar.json")
const messageUser = require("../schemas/messageUser");
const moment = require("moment");
const { MessageEmbed } = require("discord.js");

module.exports = async () => {
   const messageUsersData = await messageUser.find({ guildID: cfg.guildID }).sort({ topStat: -1 });
   const messageUsers = messageUsersData.splice(0, 30).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${Number(x.topStat).toLocaleString()} mesaj\``).join(`\n`);

  let LeaderBoard = await client.guilds.cache.get(cfg.guildID).channels.cache.get(ayar.ChatLeaderBoard).messages.fetch(ayar.ChatMsgListID);
  setInterval(() => {
  ChatLeaderBoard()
  }, 600000);
  function ChatLeaderBoard() {  

  const msgList = (`${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`)
  let Chat = new MessageEmbed()
  Chat.setColor("BLACK")

  Chat.setAuthor(`Mesaj Sıralaması | Tüm Zamanlar`, client.guilds.cache.get(cfg.guildID).iconURL({dynamic:true}))
  Chat.setFooter(`Güncellenme: ${moment(Date.parse(new Date().toLocaleString("tr-TR", { timeZone: "Asia/Istanbul" }))).locale("TR").format("LLL")}`)
  Chat.setDescription(`${msgList}`)
  LeaderBoard.edit(Chat)

}
}
module.exports.conf = {
  name: "ready",
};
