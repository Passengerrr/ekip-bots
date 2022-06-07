module.exports = {
    conf: {
      aliases: ["link","url"],
      name: "link",
      help: "link"
    },
  
run: async (client, message, args, embed, prefix) => {
const url = await message.guild.fetchVanityData();

message.lineReply(`discord.gg/${message.guild.vanityURLCode}\n\`Toplam kullanım:\` **${url.uses}**`)
},
  };
