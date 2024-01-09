const {RtcRole, RtcTokenBuilder} = require("agora-token");

//use this .env file
const appId = 'c546ffb5e5bc4b0a8b4d278e7111d037';
const appCertificate = '09cb3ef2d9ab445f8c5fe98dec1daaa7';
const channelName = 'testing';
const uid = 0;
const userAccount = "User account";
const role = RtcRole.PUBLISHER;
const expirationTimeInSeconds = 3600
const currentTimestamp = Math.floor(Date.now() / 1000)
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

const generateAgoraToken=(channelName,streamingUserId=0)=>{
    return RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);

}

module.exports = generateAgoraToken;
