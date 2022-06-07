const { MessageEmbed } = require("discord.js");
const client = global.client;
let sended = false;
const settings = require("../configs/settings.json")
const conf = require("../configs/sunucuayar.json")
setInterval(() => {
  client.cooldown.forEach((x, index) => {
    if (Date.now() - x.lastUsage > x.cooldown) client.cooldown.delete(index);
  });
}, 8000);

module.exports = async (message) => {

  let prefix = settings.prefix.find((x) => message.content.toLowerCase().startsWith(x));
  if (message.author.bot || !message.guild || !prefix || conf.unregRoles.some(x => message.member.roles.cache.has(x)) || conf.jailRole.some(x => message.member.roles.cache.has(x))) return;
  let args = message.content.substring(prefix.length).trim().split(" ");
  let commandName = args[0].toLowerCase();

  const embed = new MessageEmbed().setFooter(`${message.guild.name} Developed By Passenger`).setColor(message.member.displayHexColor).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, size: 2048 }));

  args = args.splice(1);
  let cmd = client.commands.has(commandName) ? client.commands.get(commandName) : client.commands.get(client.aliases.get(commandName));
  let komutLog = client.channels.cache.get(conf.komutLog);

  if (cmd) {
    if (cmd.conf.owner && !settings.owners.includes(message.author.id)) return;
    const cooldown = cmd.conf.cooldown || 5000;
    const cd = client.cooldown.get(message.author.id);
    if (cd) {
      const diff = Date.now() - cd.lastUsage;
      if (diff < cooldown)
        if (!sended) {
          sended = true;
          return message.channel.send(`${message.author}, Bu komutu tekrar kullanabilmek için **${Number(((cooldown - diff) / 1000).toFixed(2))}** daha beklemelisin!`).then((x) => x.delete({ timeout: (cooldown - diff) }));
        }
    } else client.cooldown.set(message.author.id, { cooldown, lastUsage: Date.now() });
    cmd.run(client, message, args, embed, prefix);
    if(komutLog) komutLog.wsend(new MessageEmbed().setColor("#2f3136").setTimestamp().setFooter(`${message.guild.name} Developed By Passenger | Kullanma Zamanı : `).setDescription(`${message.author} (\`${message.author.id}\`) tarafından ${message.channel} (\`${message.channel.id}\`) kanalında \`${prefix}${commandName}\` komutunu kullandı!\n\nKomut içeriği: \`${message.content}\`!`))
  }
};

module.exports.conf = {
  name: "message",
};
