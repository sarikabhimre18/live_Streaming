const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const generateAgoraToken = require('./util');
const app = express();
app.use(bodyParser.json());
app.use(express.json());

const server = http.createServer(app);
const port = 3000;

app.use(express.static(path.join(__dirname,'templates')));
function generateApiLink(token, channelName) {
    // Replace this logic with your actual API link generation
    return `http://localhost:3000/liveStreaming?channel=${channelName}&token=${token}`;
}


//Generate the link and send it to the user
app.post('/generate-link', (req, res) => {

    const {channelName} = req.body;
    const token=generateAgoraToken("test","123456",3600)
    console.log("token====",token)
    const apiLink = generateApiLink(token, channelName);

    console.log("data====",apiLink)

   // example generated link -> http://localhost:3000/liveStreaming?channel=testing&token=123456789
   //send the link to user like google location &
    //send the token and api link to the frontend side
    res.status(201).json(apiLink);
});

//above generated link call this api
app.get('/liveStreaming', (req, res) => {
    // const { channelName } = req.params;
    const { token,channel } = req.query;
    console.log("liveStreaming -=====",channel,token)
    return res.sendFile(path.join(__dirname+'/templates/index.html'));
    // res.status(201).json("start live stream");
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


