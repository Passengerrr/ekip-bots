const { red } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: [],
    name: "yaz",
    owner: true,
  },

  run: async (client, message, args) => {
    if(!args[0]) return message.react(red)
    message.delete();
    message.channel.send(args.join(' '));
  },
};

  