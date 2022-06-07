const coin = require("../../schemas/coin");
const taggeds = require("../../schemas/taggeds");
const tagli = require("../../schemas/taggorev");
const conf = require("../../configs/sunucuayar.json")
const settings = require("../../configs/settings.json")
const { red, green} = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["tag-aldır", "taglıaldır", "taglı"],
    name: "tagaldır",
    help: "tagaldır [kullanıcı]"
  },

  run: async (client, message, args, embed) => {
    if (!conf.staffs.some(x => message.member.roles.cache.has(x))) return message.react(red)
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.react(red)
    message.channel.send("Bir üye belirtmelisin!").then(x => x.delete({timeout: 5000})); 
    return }
    if (!member.roles.cache.has("855159733048311818")) 
    {
    message.react(red)
    message.channel.send("Bu üye taglı değil!").then(x => x.delete({timeout: 5000})); 
    return }
    const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (taggedData && taggedData.taggeds.includes(member.user.id)) 
    {
    message.react(red)
    message.channel.send("Bu üyeye zaten daha önce tag aldırmışsın!").then(x => x.delete({timeout: 5000})); 
    return }

    const msg = await message.channel.send( `${member.toString()}, ${message.member.toString()} üyesi sana tag aldırmak istiyor. Kabul ediyor musun?`);
    msg.react("<a:green:915754671728132126>");
    msg.react("<a:red:915754675742081076>");

    msg.awaitReactions((reaction, user) => ["green", "red"].includes(reaction.emoji.name) && user.id === member.user.id, {
      max: 1,
      time: 30000,
      errors: ['time']
    }).then(async collected => {
      const reaction = collected.first();
      if (reaction.emoji.name === 'green') {
        await coin.findOneAndUpdate({ guildID: member.guild.id, userID: message.author.id }, { $inc: { coin: settings.taggedCoin } }, { upsert: true });
        const tagData = await tagli.findOne({ guildID: message.guild.id, userID: message.author.id });
        if (tagData)
        {
        await tagli.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { tagli: 1 } }, { upsert: true });
        }
        msg.edit(`${message.author}, ${member.toString()} Adlı kullanıcı senin isteğini onayladı. ${green}`).then(x => x.delete({timeout: 5000}))
        await taggeds.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { taggeds: member.user.id } }, { upsert: true });
      } else {
        msg.edit(`${message.author}, ${member.toString()} Adlı kullanıcı senin isteğini onaylamadı.`).then(x => x.delete({timeout: 5000}))
      }
    }).catch(() => msg.edit(`${member.toString()} 30 saniye boyunca cevap vermediği için işlem iptal edildi.`)).then(x => x.delete({timeout: 5000}));
  }
}