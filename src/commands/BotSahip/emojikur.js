const { Database } = require("ark.db");
const db = new Database("/src/configs/emojis.json");

module.exports = {
  conf: {
    aliases: [],
    name: "emojikur",
    owner: true,
  },

  run: async (client, message, args) => {
    const emojis = [
        { name: "star", url: "https://cdn.discordapp.com/emojis/899680497427431424.gif?size=44" },
        { name: "rewards", url: "https://cdn.discordapp.com/emojis/899680521951514734.gif?size=44" },
        { name: "revusome", url: "https://cdn.discordapp.com/emojis/901441419363889172.png?size=96" },
        { name: "miniicon", url: "https://cdn.discordapp.com/emojis/899339236724068372.png?size=44" },
        { name: "red", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439875170500629/red.gif" },
        { name: "green", url: "https://cdn.discordapp.com/attachments/827439712834158622/827439878664486913/green.gif" },
        { name: "staff", url: "https://cdn.discordapp.com/emojis/899680505119780895.gif?size=44" },
        { name: "Muhabbet", url: "https://cdn.discordapp.com/emojis/899339317896429641.gif?size=44" },
        { name: "galp", url: "https://cdn.discordapp.com/emojis/899680513806184570.gif?size=44" },
        { name: "kirmiziok", url: "https://cdn.discordapp.com/emojis/901441275381817426.gif?size=44" },
        { name: "Revuu", url: "https://cdn.discordapp.com/emojis/901441322152493066.gif?size=44" },
        { name: "Mute", url: "https://cdn.discordapp.com/emojis/901441287469809706.png?size=44" },
        { name: "Cezaa", url: "https://cdn.discordapp.com/emojis/901441311050178591.png?size=44" },
        { name: "Jail", url: "https://cdn.discordapp.com/emojis/903566151727087686.png?size=96" },
        { name: "Book", url: "https://cdn.discordapp.com/emojis/903564842978402304.png?size=96" },
        { name: "Kilit", url: "https://cdn.discordapp.com/emojis/903564832387760128.png?size=96" },
        { name: "Mute2", url: "https://cdn.discordapp.com/emojis/899339342986739802.png?size=96" },
        { name: "Unmute", url: "https://cdn.discordapp.com/emojis/899339351283105812.png?size=96" },
        { name: "fill", url: "https://cdn.discordapp.com/emojis/899339288636956752.gif?size=44" },
        { name: "empty", url: "https://cdn.discordapp.com/emojis/899340041229307966.png?size=44" },
        { name: "fillStart", url: "https://cdn.discordapp.com/emojis/899339278000222249.gif?size=44" },
        { name: "emptyEnd", url: "https://cdn.discordapp.com/emojis/899340050226118737.png?size=44" },
        { name: "fillEnd", url: "https://cdn.discordapp.com/emojis/862062197776580618.gif?size=96" },
        { name: "xp", url: "https://cdn.discordapp.com/emojis/838468875825446922.gif?v=1" },
        { name: "gulucuk", url: "https://cdn.discordapp.com/emojis/838469248602865735.png?v=1" },
        { name: "mesaj2", url: "https://cdn.discordapp.com/emojis/838468915814334464.gif?v=1" },
        { name: "altin", url: "https://cdn.discordapp.com/emojis/836694825243508756.gif?v=1" },
        { name: "altin2", url: "https://cdn.discordapp.com/emojis/836694821128372224.gif?v=1" },
        { name: "voice", url: "https://cdn.discordapp.com/emojis/841076020399308831.png?v=1" },
        { name: "channel", url: "https://cdn.discordapp.com/emojis/841076020399308831.png?v=1" },
        { name : "passengerspotify", url: "https://cdn.discordapp.com/emojis/899337292840312912.png?size=44"},
        { name : "passengernetflix", url: "https://cdn.discordapp.com/emojis/899337280790077491.png?size=44"},
        { name : "passengerexxen", url: "https://cdn.discordapp.com/emojis/900396713116835900.png?size=44"},
        { name : "passengeryoutube", url: "https://cdn.discordapp.com/emojis/873443301796241498.webp?size=80&quality=lossless"},
        { name : "passengernitro", url: "https://cdn.discordapp.com/emojis/982564491998941194.webp?size=80&quality=lossless"},
        { name : "slotgif", url: "https://cdn.discordapp.com/emojis/931686726567612426.gif?v=1"},
        { name : "slotpatlican", url: "https://cdn.discordapp.com/emojis/931686717902192660.png?size=44"},
        { name : "slotkiraz", url: "https://cdn.discordapp.com/emojis/931686708037185546.png?size=44"},
        { name : "slotkalp", url: "https://cdn.discordapp.com/emojis/931686698138603610.png?size=44"}
    ]
 emojis.forEach(async (x) => {
      if (message.guild.emojis.cache.find((e) => x.name === e.name)) return db.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
      const emoji = await message.guild.emojis.create(x.url, x.name);
      await db.set(x.name, emoji.toString());
      message.channel.send(`\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`);
    });
    },
  };