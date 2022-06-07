const ayar = require("../../configs/sunucuayar.json")
const settings = require("../../configs/settings.json")
const Ayarlar = require("../../configs/sunucuayar.json");
const { red , green } = require("../../configs/emojis.json")
const isimler = require("../../schemas/names");
const moment = require("moment")
moment.locale("tr")


module.exports = {
  conf: {
    aliases: ["isim", "i", "nick"],
    name: "isim",
    help: "isim [üye] [isim] [yaş]"
  },
run: async (client, message, args, embed, prefix) => { 
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!Ayarlar.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !Ayarlar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) 
    {
    message.react(red)
    message.lineReply(`Yetkin bulunmamakta.\Yetkili olmak istersen başvurabilirsin.`).then(x=> x.delete({timeout: 5000})) 
    return }
    if(!uye) 
    {
    message.react(red)
    message.lineReply(`\`${prefix}isim <@Passenger/ID> <Isim> <Yaş>\``).then(x=>x.delete({timeout:5000})) 
    return }
    if(message.author.id === uye.id) 
    {
    message.react(red)
    message.lineReply(`Kendi ismini değiştiremezsin. Booster isen \`${prefix}zengin\``).then(x => x.delete({timeout: 5000})); 
    return }
    if(!uye.manageable) 
    {
    message.react(red)
    message.lineReply(`Böyle birisinin ismini değiştiremiyorum.`).then(x => x.delete({timeout: 5000})); 
    return }
    if(message.member.roles.highest.position <= uye.roles.highest.position) 
    {
    message.react(red)
    message.lineReply(`Senden yüksekte olan birisinin ismini değiştiremezsin.`).then(x => x.delete({timeout: 5000})); 
    return }
    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || "";
    if(!isim && !yaş) 
    {
    message.react(red)
    message.lineReply(`\`${prefix}isim <@Passenger/ID> <Isim> <Yaş>\``).then(x=>x.delete({timeout:5000})) 
    return }
    if(!yaş) 
    { setName = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim}`;
    } else { setName = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim} | ${yaş}`;
  } uye.setNickname(`${setName}`).catch(err => message.lineReply(`İsim çok uzun.`))

    message.react(green)
    message.lineReply(embed.setDescription(`
${uye.toString()} üyesinin ismi "${setName}" olarak değiştirildi, bu üye daha önce bu isimlerle kayıt olmuş.

${red} üyesinin toplamda **${data ? `${data.names.length}` : "0"}** isim kayıtı bulundu
${data ? data.names.splice(0, 3).map((x, i) => `\`${x.name}\` (${x.rol}) (<@${x.yetkili}>)`).join("\n") : "Daha önce kayıt olmamış."}
`)
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
.setFooter(`Üyesinin önceki isimlerine <!isimler @Passenger/ID> komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir.`))

await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: setName, yetkili: message.author.id,  rol: "İsim Değiştirme", date: Date.now() } } }, { upsert: true });

  },
};