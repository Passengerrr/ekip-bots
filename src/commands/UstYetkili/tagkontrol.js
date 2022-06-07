const { green, red } = require("../../configs/emojis.json")
const conf = require("../../configs/sunucuayar.json")
module.exports = {
    conf: {
      aliases: ["kontrol","check"],
      name: "kontrol",
      help: "kontrol"
    },
  
    run: async (client, message, args, embed) => {
      let tag = conf.tags
      let tag2 = conf.tags2
      let tag3 = conf.tags3
      let tag4 = conf.tags4
      let tag5 = conf.tags5
      let tag6 = conf.tags6
      let tag7 = conf.tags7
      let etiket = conf.etikets
      let rol = "982540417574789161"
      let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(tag) && !s.roles.cache.has(rol))
      let taglilar2 = message.guild.members.cache.filter(s => s.user.username.includes(tag2) && !s.roles.cache.has(rol))
      let taglilar3 = message.guild.members.cache.filter(s => s.user.username.includes(tag3) && !s.roles.cache.has(rol))
      let taglilar4 = message.guild.members.cache.filter(s => s.user.username.includes(tag4) && !s.roles.cache.has(rol))
      let taglilar5 = message.guild.members.cache.filter(s => s.user.username.includes(tag5) && !s.roles.cache.has(rol))
      let taglilar6 = message.guild.members.cache.filter(s => s.user.username.includes(tag6) && !s.roles.cache.has(rol))
      let taglilar7 = message.guild.members.cache.filter(s => s.user.username.includes(tag7) && !s.roles.cache.has(rol))
      let etiketliler = message.guild.members.cache.filter(s => s.user.discriminator.includes(etiket) && !s.roles.cache.has(rol))
      taglilar.array().forEach(async(member, index) => {
      setTimeout(async() => {
      if(member.user.bot) return
      await member.roles.add(rol)
      }, index * 1000)
      })
      taglilar2.array().forEach(async(member, index) => {
        setTimeout(async() => {
        if(member.user.bot) return
        await member.roles.add(rol)
        }, index * 1000)
        })
        taglilar3.array().forEach(async(member, index) => {
          setTimeout(async() => {
          if(member.user.bot) return
          await member.roles.add(rol)
          }, index * 1000)
          })
          taglilar4.array().forEach(async(member, index) => {
            setTimeout(async() => {
            if(member.user.bot) return
            await member.roles.add(rol)
            }, index * 1000)
            })
            taglilar5.array().forEach(async(member, index) => {
              setTimeout(async() => {
              if(member.user.bot) return
              await member.roles.add(rol)
              }, index * 1000)
              })
              taglilar6.array().forEach(async(member, index) => {
                setTimeout(async() => {
                if(member.user.bot) return
                await member.roles.add(rol)
                }, index * 1000)
                })
                taglilar7.array().forEach(async(member, index) => {
                  setTimeout(async() => {
                  if(member.user.bot) return
                  await member.roles.add(rol)
                  }, index * 1000)
                  })
      etiketliler.array().forEach(async(member, index) => {
      setTimeout(async() => {
      if(member.user.bot) return
      await member.roles.add(rol)
      }, index * 1000)
      })
      let toplam = taglilar.size + etiketliler.size + taglilar2.size
      if(toplam === 0) {
      message.lineReply(` Hata : Herkesin rolleri dağıtılmış!`).sil(20)
      } else {
      embed.setDescription(`
      ${green} Başarılı! **${toplam}** Adet kullanıcıya taglı rolü verilecek!
      `)
      message.lineReply(embed) 
    }
          },
    };