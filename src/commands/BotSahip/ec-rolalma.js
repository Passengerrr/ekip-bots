const Discord = require("discord.js");
const conf = require("../../configs/sunucuayar.json");
const { passengernitro, passengernetflix, passengerspotify, passengerexxen, passengeryoutube} = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: [],
    name: "ecrolalma",
    owner: true,
  },

  run: async (client, message, args) => {
    client.api.channels(message.channel.id).messages.post({ data: {"content":`:tada: Sunucuda sizleri rahatsız etmemek için \`@everyone\` veya \`@here\` atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız Çekilişler,Etkinlikler V/K ve D/C'den haberdar olacaksınız.
        
    \`❯\`Eğer \`@Etkinlik Katılımcısı\`Rolünü alırsanız sunucumuzda düzenlenecek olan etkinlikler, konserler ve oyun etkinlikleri gibi etkinliklerden haberdar olabilirsiniz.
  
    \`❯\`Eğer \`@Çekiliş  Katılımcısı\`Rolünü alırsanız sunucumuzda sıkça vereceğimiz ${passengernitro} , ${passengerspotify} , ${passengeryoutube} , ${passengernetflix} , ${passengerexxen} ve daha nice ödüllerin bulunduğu çekilişlerden haberdar olabilirsiniz. 
  
    **NOT:** \`Kayıtlı, kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Sunucumuz da everyone veya here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.\``,"components":[{"type":1,"components":[

        {"type":2,"style":3,"custom_id":"buttoncekilis","label":"🎁 Çekiliş Katılımcısı"},
        {"type":2,"style":4,"custom_id":"buttonetkinlik","label":"🎉 Etkinlik Katılımcısı"}
        
        ]}]} })
  },
};

  
