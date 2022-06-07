const conf = require("../configs/settings.json")
const cezapuan = require("../schemas/cezapuan")
const ceza = require("../schemas/ceza")
const moment = require("moment");
moment.locale("tr");
const penals = require("../schemas/penals");
const data = require("../schemas/penals");
const { green , red } = require("../configs/emojis.json")

module.exports = async (button) => {

    const member = button.clicker.member;

const cezaData = await ceza.findOne({ guildID: conf.guildID, userID: member.id });
const cezapuanData = await cezapuan.findOne({ guildID: conf.guildID, userID: member.user.id });

////////////////

///////////////

if(button.id === "cezapuan")
{
await button.reply.think(true)
await button.reply.edit(`${button.clicker.member} Ceza Puanınız : 

 Toplamda \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanı\` ve (Toplam **${cezaData ? cezaData.ceza.length : 0}** Ceza) olarak gözükmekte.`)
}
///////

let data = await penals.find({ guildID: conf.guildID, userID: button.clicker.member.id, active: true}).sort({ date: -1 });
data = data.map((x) => `\`#${x.id}:\` ${x.active ? "\`Aktif\`" : "\`Pasif\`"} **[${x.type}]** <@${x.staff}>: **${x.reason}** - ${moment(x.date).format("LLL")}`);
if(button.id === "cezalarım")
  
{
await button.reply.think(true)
if (data.length === 0) return button.reply.edit(`${member.toString()} üyesinin aktif cezası bulunmamaktadır.`)
if (data.length > 0) return button.reply.edit(data);
}

let datas = await penals.find({ guildID: conf.guildID, userID: button.clicker.member.id, active: true}).sort({ date: -1 });
datas = datas.map((x) => `${red} <@${x.staff}> tarafından **${moment(x.date).format("LLL")}**'da işlenen __"#${x.id}"__ numaralı __"${x.type}"__ türündeki cezalandırman **${moment(x.finishDate).format("LLL")}** tarihinde biticektir.`);

if(button.id === "kalanzaman")
{
await button.reply.think(true)
if (data.length === 0) return button.reply.edit(`${member.toString()} üyesinin aktif ceza bilgisi bulunmamakta.`)
await button.reply.edit(datas)
}

}
module.exports.conf = {
  name: "clickButton"
};
