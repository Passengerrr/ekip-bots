const { green, red } = require("../../configs/emojis.json") 

module.exports = {
  conf: {
    aliases: [],
    name: "koruma",
    owner: true,
  },

  run: async (client, message, args,embed) => {
    if(!args[0]){
        message.react(red)
        message.channel.send(embed.setDescription(`Bir argüman belirtmelisin! \`aç - kapat\``)).then(x=>x.delete({timeout:5000}))
        }
        if(args[0] == "aç") {
        message.channel.send(`Koruma açıldı! Rollerin yetkileri kapatıldı! Sunucu güvende!`)
        message.react(green)
        const yetki1 = message.guild.roles.cache.find(r => r.id === "899273632696631363");//#OWNER
        yetki1.setPermissions(0);
        const yetki2 = message.guild.roles.cache.find(r => r.id === "899273632696631360");//#Ceo
        yetki2.setPermissions(0);
        const yetki3 = message.guild.roles.cache.find(r => r.id === "900815276130586636");//#Yıldız
        yetki3.setPermissions(0);       

     }


       
  
        if(args[0] == "kapat") {
        message.channel.send(`Koruma kapatıldı! Rollerin yetkileri yüklendi! Dikkatli olman dileğiyle!`)
        message.react(green)
        const yetki1 = message.guild.roles.cache.find(r => r.id === "899273632696631363");//#Owner
        yetki1.setPermissions(4592763008);
        const yetki2 = message.guild.roles.cache.find(r => r.id === "899273632696631360");//#Ceo    
        yetki2.setPermissions(4324327554);
        const yetki3 = message.guild.roles.cache.find(r => r.id === "900815276130586636");//#Yıldız
        yetki3.setPermissions(4324327424);
        
    }
},
};
