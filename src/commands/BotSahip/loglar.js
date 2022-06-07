const { green } = require("../../configs/emojis.json");
module.exports = {
  conf: {
    aliases: ["log","log-kur"],
    name: "log-kur",
    owner: true,
  },

  run: async (client, message, args) => {
    const parent = await message.guild.channels.create('Passenger Log', { type: 'category' });
    await message.guild.channels.create('voice-log', { type: 'text', parent: parent.id });
    await message.guild.channels.create('taglı-log', { type: 'text', parent: parent.id });
    await message.guild.channels.create('yasaklı-tag', { type: 'text', parent: parent.id });
    await message.guild.channels.create('rank-log', { type: 'text', parent: parent.id });
    await message.guild.channels.create('rol-tag', { type: 'text', parent: parent.id });
    await message.guild.channels.create('mazeretli-tag', { type: 'text', parent: parent.id });
    await message.guild.channels.create('message-log', { type: 'text', parent: parent.id });
    await message.guild.channels.create('invite-log', { type: 'text', parent: parent.id });
    await message.guild.channels.create('komut-log', { type: 'text', parent: parent.id });
    await message.guild.channels.create('yasaklama-log', { type: 'text', parent: parent.id });
    await message.guild.channels.create('cezai-işlem-log', { type: 'text', parent: parent.id });
    await message.guild.channels.create('market-log', { type: 'text', parent: parent.id });
    await message.guild.channels.create('mute-log', { type: 'text', parent: parent.id });
    await message.guild.channels.create('jail-log', { type: 'text', parent: parent.id });
    await message.guild.channels.create('ses-mute-log', { type: 'text', parent: parent.id });
    message.channel.send(`${green} Bot loglarının kurulumu başarıyla tamamlanmıştır.`)
}}
