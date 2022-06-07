const Discord = require("discord.js");
const settings = require("../../configs/settings.json");
const conf = require("../../configs/sunucuayar.json")

module.exports = {
  conf: {
    aliases: [],
    name: "rolsüz",
    owner: true,
  },

  run: async (client, message, args, embed) => {
    let passengercim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
    if(args[0] == "ver") {
      passengercim.forEach(r => {
    r.roles.add(conf.unregRoles)
    })
    message.channel.send(embed
    .setDescription("Sunucuda rolü olmayan \`"+ passengercim.size +"\` kişiye kayıtsız rolü verildi!"))
    } else if(!args[0]) {
    message.channel.send(embed
    .setDescription("Sunucumuzda rolü olmayan \`"+ passengercim.size +"\` kişi var. Bu kişilere kayıtsız rolü vermek için \`.rolsüz ver\` komutunu uygulayın!"))    
}
  }, 
};
 