const {RtcTokenBuilder, RtcRole} = require('agora-access-token')
const agoraAppId = 'c546ffb5e5bc4b0a8b4d278e7111d037';
const agoraAppCertificate = '09cb3ef2d9ab445f8c5fe98dec1daaa7';
const role = RtcRole.PUBLISHER;
// Function to generate Agora token
function generateAgoraToken(channelName, uid, expirationTimeInSeconds) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;
    console.log("expofsafsdfsdf=====",expirationTimestamp)
    return RtcTokenBuilder.buildTokenWithUid(
        agoraAppId,
        agoraAppCertificate,
        channelName,
        uid,
        role,
        expirationTimestamp
    );
}

module.exports = generateAgoraToken;
