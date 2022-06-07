const Canvas = require("canvas");
const { MessageAttachment } = require("discord.js") 
const conf = require("../../configs/sunucuayar.json");
const voiceUserParent = require("../../schemas/voiceUserParent");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const toplams = require("../../schemas/toplams");
const inviterSchema = require("../../schemas/inviter");
const moment = require('moment');
require("moment-duration-format");
moment.locale('tr');
module.exports = {
    conf: {
      aliases: ["kart","kartt"],
      name: "kart",
      help: "kart"
    },
  
run: async (client, message, args, embed, prefix) => {
  const kullanıcı = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
  let member = message.guild.member(kullanıcı);
    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const messageWeekly = messageData ? messageData.weeklyStat : 0;
    const messageDaily = messageData ? messageData.dailyStat : 0;
 

    const toplamData = await toplams.findOne({ guildID: message.guild.id, userID: member.user.id });


const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;

        const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [saat], m [dakika]");
      };
      

  const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    let fontSize = 70;

    do {
        ctx.font = `${fontSize -= 10}px sans-serif`;
    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
};
const canvas = Canvas.createCanvas(670, 630);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('https://media.discordapp.net/attachments/792719188770160660/916693254957838386/ozi.png?width=503&height=473');  
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

  let yazıqwe = `${member.user.username}`
  if(yazıqwe.length >= 17) {yazıqwe = `İsmin Çok Uzun`}
  ctx.font ='35px bebas neue',
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`\n\n\n${yazıqwe} Sunucu Verileri`, canvas.width / 6.80, canvas.height / 7);

   //////////////////////////total ////////////////////////////////////////////////

  ctx.font ='35px bebas neue',
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Ses & Yazı İstatistikleri`, canvas.width / 5, canvas.height / 2.40);
  
  ctx.font ='23px bebas neue',
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`•Toplam:${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dk]")}.Ses & ${messageData ? messageData.topStat : 0} Yazı•`, canvas.width / 4.65 , canvas.height / 2.16);
    ////////////////bitiş////////////////////////////////////////////////
  //////////////////public odalar////////////////

  ctx.font ='23px bebas neue',
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`         Sesli Sohbet İstatistiği
         •Public Odalar: ${await category(conf.publicParents)}.
         •Secret Odalar: ${await category(conf.privateParents)}.
         •Alone Odalar: ${await category(conf.aloneParents)}.
         •Yönetim Yetkili Odaları: ${await category(conf.funParents)}.
         •Kayıt Odaları: ${await category(conf.registerParents)}.

         Mesaj İstatistiği
         •Haftalık Mesaj: ${Number(messageWeekly).toLocaleString()} Yazı
         •Günlük Mesaj: ${Number(messageDaily).toLocaleString()} Yazı`, canvas.width / 11, canvas.height / 1.85);

    ////////////////bitiş////////////////////////////////////////////////  
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
 ctx.save();
    roundedImage(ctx, 250, 20, 150, 150, 25);
    ctx.clip();
  ctx.drawImage(avatar, 250, 20, 150, 150);
  ctx.closePath();

	// Clip off the region you drew on
	ctx.clip();

  function roundedImage(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
  
  const attachment = new MessageAttachment(canvas.toBuffer(), 'passenger.png');
  message.channel.send(`[ __${member}__ ] kullanıcısının sunucu veri kartı!`, attachment)
     }}
