const conf = require("../configs/sunucuayar.json")
const { green } = require("../configs/emojis.json");

module.exports = async (message) => {
  if (message.content.toLowerCase() === "tag" || message.content.toLowerCase() === "!tag" || message.content.toLowerCase() === ".tag") {
    message.react(green);
    message.lineReply(`
\`\`\`
${conf.tags} - ${conf.tags2} - ${conf.tags3} - ${conf.tags4} - ${conf.tags5} - ${conf.tags6} - ${conf.tags7} - #${conf.etikets}
\`\`\`
`);
  }
  if (message.content.toLowerCase() === "sa" || message.content.toLowerCase() === "Sa") {
    message.lineReply(`
Aleyküm selam hoşgeldin ${message.author}!
`);
  }
};


module.exports.conf = {
  name: "message"
};