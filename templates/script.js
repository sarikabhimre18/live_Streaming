
const parseUrlParams = () => {
     const url = window.location.href;
    const paramsString = url.split("?")[1];
    const paramsArray = paramsString.split("&");

    const paramsObject = {};
    paramsArray.forEach(param => {
        const [key, value] = param.split("=");
        paramsObject[key] = value;
    });

    return paramsObject;
};

document.addEventListener('DOMContentLoaded', () => {
    const videosContainer = document.getElementById('videos-container');
    const remoteVideo = document.getElementById('remoteVideo');
    const loader = document.getElementById('loader');
    const agoraAppId = 'c546ffb5e5bc4b0a8b4d278e7111d037';
    const { channel, token } = parseUrlParams();
    console.log("Channel Name:", channel);
    console.log("Token:", token);

    const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    const onUserPublish = async (
        user,
        mediaType
    ) => {
        if (mediaType === "video") {
            const remoteTrack = await agoraClient.subscribe(user, mediaType);
            remoteTrack.play("remoteVideo");
        }
        if (mediaType === "audio") {
            const remoteTrack = await agoraClient.subscribe(user, mediaType);
            remoteTrack.play();
        }
    };

    const call=async ()=>{
        try {
            loader.style.display = 'flex'; // Show loader
            agoraClient.on("user-published", onUserPublish);
            await agoraClient.join(
                agoraAppId,
                channel,
                token || null,
                null
            );
        } catch (error) {
            loader.style.display = 'none';
            console.error('Error joining channel:', error);
        } finally {
            loader.style.display = 'none'; // Hide loader when done
        }
    }
    const leave=async ()=>{
        try {
            loader.style.display = 'flex'; // Show loader
            await agoraClient.leave();
        } catch (error) {
            loader.style.display = 'none'; // Hide loader when done
            console.error('Error leaving channel:', error);
        } finally {
            loader.style.display = 'none'; // Hide loader when done
        }
    }

    const joinChannelBtn = document.createElement('button');
    joinChannelBtn.innerText = 'Join Channel';
    joinChannelBtn.addEventListener('click', () => {
        call().then()
    });
    document.body.appendChild(joinChannelBtn);

    const leaveChannelBtn = document.createElement('button');
    leaveChannelBtn.innerText = 'Leave Channel';
    leaveChannelBtn.addEventListener('click', () => {
        leave().then()
    });
    document.body.appendChild(leaveChannelBtn);

    // Create and append the loader
    const loaderDiv = document.createElement('div');
    loaderDiv.id = 'loader';
    loaderDiv.style.display = 'none'; // Initially hide the loader
    loaderDiv.innerHTML = 'Loading...'; // Customize your loader content
    document.body.appendChild(loaderDiv);
});

