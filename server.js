const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const generateAgoraToken = require('./util');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const server = http.createServer(app);
const port = process.env.PORT || 3000;
console.log("env==",process.env.PORT)

app.use(express.static(path.join(__dirname,'templates')));
function generateApiLink(token, channelName) {
    // Replace this logic with your actual API link generation
    return `https://ursafestraming.onrender.com/liveStreaming?channel=${channelName}&token=${token}`;
}


//Generate the link and send it to the use
app.post('/generate-link', (req, res) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    const {channelName,streamingUserId} = req.body;
    const verifyToken=generateAgoraToken(channelName)
    console.log("verify Token : ",verifyToken)

    const generatedLink = generateApiLink(verifyToken, channelName);
    console.log("generated link : ",generatedLink)

   // example generated link -> http://localhost:3000/liveStreaming?channel=testing&token=123456789
   // send the link to user via sms.
   // send the token to the frontend side in response
    res.status(201).json({playerLink:generatedLink,channelName:channelName,verifyToken:verifyToken});
});

//above generated link call this api
app.get('/liveStreaming', (req, res) => {
    const { token,channel } = req.query;
    return res.sendFile(path.join(__dirname+'/templates/index.html'));
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

