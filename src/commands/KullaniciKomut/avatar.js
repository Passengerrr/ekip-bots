const conf = require("../../configs/sunucuayar.json")
module.exports = {
    conf: {
      aliases: ["avatar","av"],
      name: "avatar",
      help: "avatar"
    },
  
run: async (client, message, args, embed, prefix) => {
	if (!message.guild) return;
let user = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author
message.channel.send(`${user.tag} ${user.displayAvatarURL({ dynamic: true, size: 4096 })}`)

},
  };
