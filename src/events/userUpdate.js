const { MessageEmbed } = require("discord.js");
const client = global.client;
const bannedTag = require("../schemas/bannedTag");
const conf = require("../configs/sunucuayar.json");
const settings = require("../configs/settings.json")
const regstats = require("../schemas/registerStats");

module.exports = async (oldUser, newUser) => {
    if (oldUser.bot || newUser.bot || (oldUser.username === newUser.username)) return;
    const guild = client.guilds.cache.get(settings.guildID);
    if (!guild) return;
    const member = guild.members.cache.get(oldUser.id);
    if (!member) return;
    const channel = guild.channels.cache.get(conf.ekipLogChannel);
    const kanal = guild.channels.cache.get(conf.chatChannel)
    if (oldUser.username.includes(conf.tag2) && !newUser.username.includes(conf.tag2)) {
   const tagModedata = await regstats.findOne({ guildID: settings.guildID })
    if (tagModedata && tagModedata.tagMode === true) {
   if(!member.roles.cache.has(conf.vipRole) && !member.roles.cache.has(conf.boosterRolu)) return member.roles.set(conf.unregRoles);
}
      else member.roles.remove(conf.ekipRolu);

  let ekip = member.guild.roles.cache.get(conf.ekipRolu);

    if (!conf.Yetkili) {
    if (member.roles.cache.has(ekip.id)) member.roles.remove(ekip.id).catch(console.error);
	  let roles = member.roles.cache.clone().filter(e => e.managed || e.position < ekip.position);
    member.roles.set(roles).catch();
    } else {
      let roles = member.roles.cache.clone().filter(e => e.managed).map(e => e.id);
	  roles.concat(conf.unregRoles);
     member.roles.set(roles).catch();
    }

      if (!channel) return;
      const embed = new MessageEmbed()
        .setAuthor(member.displayName,  newUser.displayAvatarURL({ dynamic: true }))
        .setTitle("• Bir kullanıcı tag saldı!")
        .setColor("#2f3136")
        .setDescription(`
${member.toString()} kullanıcısı ${conf.tag2} tagını saldığı için <@&${conf.ekipRolu}> rolü alındı.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag2)).size}
         `);
      channel.wsend(embed);
      } else if (!oldUser.username.includes(conf.tag2) && newUser.username.includes(conf.tag2)){
      member.roles.add(conf.ekipRolu);
      if (!channel) return;
      const embed = new MessageEmbed()
        .setAuthor(member.displayName, newUser.displayAvatarURL({ dynamic: true }))
        .setTitle("• Bir kullanıcı tag aldı!")
        .setColor("#2f3136")
        .setDescription(`
${member.toString()} kullanıcısı ${conf.tag2} tagını aldığı için <@&${conf.ekipRolu}> rolü verildi.
Aktif taglı sayısı: ${guild.members.cache.filter(x => x.user.username.includes(conf.tag2)).size}
    `);
      channel.wsend(embed);
      kanal.wsend(new MessageEmbed().setColor("#2f3136").setDescription(`${member.toString()} üyesi ${conf.tag2} tagımızı alarak ailemize katıldı! Ailemiz ${guild.members.cache.filter(x => x.user.username.includes(conf.tag2)).size} kişi oldu!`)).then(x=>x.delete({timeout: 5000}))

    }

  await bannedTag.findOne({ guildID: guild.id }, async ( err, res) => {
    if (!res) return
  res.taglar.forEach(async x => {
    
 if (!oldUser.username.includes(x) && newUser.username.includes(x)) {
      !member.roles.cache.has(conf.boosterRolu) 
      await member.roles.set(conf.jailRole).catch();
      await member.setNickname('Yasaklı Tag');
     member.send(`${guild.name} adlı sunucumuza olan erişiminiz engellendi! Sunucumuzda yasaklı olan bir simgeyi (${x}) isminizde taşımanızdan dolayıdır. Sunucuya erişim sağlamak için simgeyi (${x}) isminizden çıkartmanız gerekmektedir.\n\nSimgeyi (${x}) isminizden kaldırmanıza rağmen üstünüzde halen Yasaklı Tag rolü varsa sunucudan gir çık yapabilirsiniz veya sağ tarafta bulunan yetkililer ile iletişim kurabilirsiniz. **-Yönetim**\n\n__Sunucu Tagımız__\n**${conf.tags} - ${conf.tags2} - ${conf.tags3} - ${conf.tags4} - ${conf.tags5} - ${conf.tags6} - ${conf.tags7} - #${conf.etikets}**`)
    } else
    if (oldUser.username.includes(x) && !newUser.username.includes(x)) { 
      !member.roles.cache.has(conf.boosterRolu) 
      await member.roles.set(conf.unregRoles).catch();
      await member.setNickname(`${conf.tag2} İsim | Yaş`);
    member.send(`${guild.name} adlı sunucumuza olan erişim engeliniz kalktı. İsminizden (${x}) sembolünü kaldırarak sunucumuza erişim hakkı kazandınız. Keyifli Sohbetler**-Yönetim**`)
    }
})
})

};

module.exports.conf = {
  name: "userUpdate",
};
