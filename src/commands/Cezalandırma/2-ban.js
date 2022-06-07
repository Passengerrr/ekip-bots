const moment = require("moment");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js");
const { MessageButton,MessageActionRow } = require('discord-buttons');
const forceBans = require("../../schemas/forceBans");
const cezapuan = require("../../schemas/cezapuan")
const penals = require("../../schemas/penals");
const conf = require("../../configs/sunucuayar.json");
const {  rewards, miniicon, mesaj2,green, red2, red } = require("../../configs/emojis.json");

module.exports = {
  conf: {
    aliases: ["penal","penal"],
    name: "penal",
    help: "penal"
  },

  run: async (client, message, args, embed) => {
if (!message.member.hasPermission('ADMINISTRATOR'))
{
message.lineReply("Bu işlemi yapamazsın dostum!").then(x=>x.delete({timeout: 5000}))
message.react(red)
return;
}
 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
     
let cmute = new MessageButton().setLabel("1").setID("cmute").setStyle("gray")
let vmute = new MessageButton().setLabel("2").setID("vmute").setStyle("gray")
let ceza = new MessageButton().setLabel("3").setID("ceza").setStyle("gray")
let ban = new MessageButton().setLabel("4").setID("ban").setStyle("gray")
let iptal = new MessageButton().setLabel("X").setID("iptal").setStyle("red")
      

const row = new MessageActionRow()
.addComponents(cmute, vmute, ceza, ban, iptal)

embed.setDescription(`Merhabalar ${message.author} aşağıdan cezalandırmak istediğiniz ${member} adlı kullanıcı için bir cezalandırma şekli seçiniz.

\`\`\`diff
-  1. Metin kanallarında susturulma
-  2. Sesli kanallarda susturma cezası
-  3. Sunucu içerisinde cezalandırılma
-  4. Sunucudan kalıcı sekil yasaklamak
-  X. İptal
\`\`\`
Bu cezalandırma seçeneklerinden birini başlarındaki numara bulunan butonu tıklayarak seçebilirsiniz. Seçmek için toplam 1 dakika süreniz mevcuttur.
`)

const user = message.mentions.users.first() || await client.fetchUser(args[0]);
const reason = args.slice(1).join(" ") || "Sunucudan Yasaklandı!";
    

    let msg = await message.channel.send({ components : [row], embed: embed})
    var filter = (button) => button.clicker.user.id === message.author.id; 
    let collector = await msg.createButtonCollector(filter, { time: 99999999 })
    collector.on("collect", async (button) => {
      
  if(button.id === "cmute") {
    await button.reply.defer()

    const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    message.lineReply(`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle susturuldu! \`(Ceza ID: #${penal.id})\``).then(x=>x.delete({timeout:50000}))

    member.roles.add(conf.chatMute);
    }

  if(button.id === "vmute") {
    await button.reply.defer()
    if (member.voice.channelID && !member.voice.serverMute) {
      member.voice.setMute(true);
      member.roles.add(conf.voiceMute);
    }
    }

  if(button.id === "ceza") {
    await button.reply.defer()
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 100 } }, { upsert: true });
    member.roles.set(conf.jailRole)
    } 

  if(button.id === "ban") {
    await button.reply.defer()
    message.guild.members.ban(user.id, { reason }).catch(() => {});
    await new forceBans({ guildID: message.guild.id, userID: user.id, staff: message.author.id }).save();
    const penal = await client.penalize(message.guild.id, user.id, "FORCE-BAN", true, message.author.id, reason);
    }

  if(button.id === "iptal") {
    await button.reply.defer()
    msg.delete();
    } 

  })
  }
};