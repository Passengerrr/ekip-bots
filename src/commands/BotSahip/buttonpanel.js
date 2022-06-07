const Discord = require("discord.js");
const conf = require("../../configs/sunucuayar.json");

module.exports = {
  conf: {
    aliases: [],
    name: "buttonpanel",
    owner: true,
  },

  run: async (client, message, args) => {
     client.api.channels(message.channel.id).messages.post({ data: {"content":`Merhaba \`${message.guild.name}\` sunucusu içerisi yapmak istediğiniz işlem veya ulaşmak istediğiniz bilgi için gerekli butonlara tıklamanız yeterli olucaktır!\n\n**I:** \`Sunucuya giriş tarihinizi öğrenin.\`\n**II:** \`Üstünüzde bulunan rollerin listesini alın.\`\n**III:** \`Hesabınızın açılış tarihini öğrenin.\`\n\n**IV:** \`Davet bilgilerinizi öğrenin.\`\n**V:** \`Tekrardan sesli kayıt olun.\`\n**VI:** \`Sunucunun anlık aktif listesini görüntüleyin.\`\n\n**VII:** \`Sunucudaki eski isim bilgilerinizi görüntüleyin.\`\n**VIII:** \`Sunucudaki toplam mesaj sayınızı öğrenin.\`\n**IX:** \`Sunucu ses kanallarında toplam geçirdiğiniz süreyi öğrenin.\`\n`,
"components":[{
"type":1,"components":[
                         {"type":2,"style":3,"custom_id":"I","label":"I"},
                         {"type":2,"style":3,"custom_id":"II","label":"II"},
                         {"type":2,"style":3,"custom_id":"III","label":"III"},
       ]}, {  "type":1,"components":[
                         {"type":2,"style":3,"custom_id":"IV","label":"IV"},
                         {"type":2,"style":3,"custom_id":"V","label":"V"},
                         {"type":2,"style":3,"custom_id":"VI","label":"VI"}
       ]}, {  "type":1,"components":[
                         {"type":2,"style":3,"custom_id":"VII","label":"VII"},
                         {"type":2,"style":3,"custom_id":"VIII","label":"VIII"},
                         {"type":2,"style":3,"custom_id":"IX","label":"IX"}
       ]}


]}

 })
  },
};

