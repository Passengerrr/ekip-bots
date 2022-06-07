const settings = require("../../configs/settings.json")
const { red, green } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["rolbilgi","role"],
    name: "rolbilgi",
    help: "rolbilgi"
  },
  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).then(x=>x.delete({timeout:5000}));

  let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
if (!args[0]) return message.lineReply("Bir rol etiketle ve tekrardan dene!")
if (!role) return message.lineReply("Belirtmiş olduğun rolü bulamadım ! Düzgün bir rol etiketle veya ID belirtip tekrar dene.")
let sayı = role.members.size
if (sayı > 200) return message.lineReply(`${role} rolünde toplam ${sayı} kişi olduğundan dolayı rol bilgisini yollayamıyorum.`)
let üyeler = role.members.map(x => `<@${x.id}> - (\`${x.id}\`) `)

message.lineReply(`- ${role} rol bilgileri;
- Rol Rengi: \`${role.hexColor}\`
- Rol ID: \`${role.id}\`
- Rol Kişi Sayısı: \`${sayı}\`
─────────────────
- Roldeki Kişiler: 
${üyeler.join("\n")}
`, { split: true })
}
}
