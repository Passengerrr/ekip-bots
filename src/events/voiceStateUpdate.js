const penals = require("../schemas/penals");
const voiceInfo = require("../schemas/voiceInfo")
const conf = require("../configs/sunucuayar.json");
module.exports = async (oldState, newState) => {
  if (oldState.channelID && !newState.channelID) return;
  const finishedPenal = await penals.findOne({ guildID: newState.guild.id, userID: newState.id, type: "VOICE-MUTE", removed: false, temp: true, finishDate: { $lte: Date.now() } });
  if (finishedPenal) {
    if (newState.serverMute) newState.setMute(false);
    await newState.member.roles.remove(conf.voiceMute);
    finishedPenal.active = false;
    finishedPenal.removed = true;
    await finishedPenal.save();
  }

  const activePenal = await penals.findOne({ guildID: newState.guild.id, userID: oldState.id, type: "VOICE-MUTE", active: true });
  if (activePenal) {
    if (!newState.serverMute) newState.setMute(true);
    if (!conf.voiceMute.some((x) => newState.member.roles.cache.has(x))) newState.member.roles.add(conf.voiceMute);
  }
  if (!oldState.channelID && newState.channelID) await voiceInfo.findOneAndUpdate({ userID: newState.id }, { $set: { date: Date.now() } }, { upsert: true });
  else if (oldState.channelID && !newState.channelID) await voiceInfo.deleteOne({ userID: oldState.id });

};



module.exports.conf = {
  name: "voiceStateUpdate",
};
