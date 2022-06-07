const { Discord, MessageEmbed, MessageAttachment, ClientUser } = require("discord.js");
const dolar = require("../../schemas/dolar");
const Canvas = require("canvas")
const { altin2 } = require("../../configs/emojis.json");

module.exports = {
    conf: {
      aliases: ["cash","para"],
      name: "para",
      help: "para"
    },

    run: async (client, message, args,embed) => {
let dolarData = await dolar.findOne({ guildID: message.guild.id, userID: message.author.id });  

  const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 70;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${fontSize -= 10}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
};
    const canvas = Canvas.createCanvas(388, 234);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('https://media.discordapp.net/attachments/899273632696631365/910532483282522162/ozi_card_3.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font ='20px bebas neue',
    ctx.fillStyle = '#cac8c8';
    ctx.fillText(`${member.id}`, canvas.width / 8, canvas.height / 1.25);

    ctx.font ='30px bebas neue',
    ctx.fillStyle = '#cac8c8';
    ctx.fillText(`${dolarData ? Math.floor(parseInt(dolarData.dolar)) : 0} Dolar`, canvas.width / 4, canvas.height / 1.60);

  let yazıqwe = `${member.user.username}`
  if(yazıqwe.length >= 17) {yazıqwe = `İsmin Çok Uzun`}
  ctx.font ='23px bebas neue',
    ctx.fillStyle = '#cac8c8';
    ctx.fillText(`${yazıqwe}`, canvas.width / 3, canvas.height / 2.35);

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
 ctx.save();
    roundedImage(ctx, 150, 10, 65, 65, 25);
    ctx.clip();
  ctx.drawImage(avatar, 150, 10, 65, 65);
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

  message.channel.send(`[ __${member}__ ] kişisinin bakiyesi ;`, attachment)
}
    }
