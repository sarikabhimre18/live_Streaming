function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

document.addEventListener('DOMContentLoaded', () => {
    const videosContainer = document.getElementById('videos-container');
    const remoteVideo = document.getElementById('remoteVideo');
    const loader = document.getElementById('loader');
    const agoraAppId = 'c546ffb5e5bc4b0a8b4d278e7111d037';
    // const channelName = getParameterByName('channel');
    // const token = getParameterByName('token');
    //
    // console.log("scritp===",channelName,token)
    const channelName = 'test';
    const token = '007eJxTYODNaFCf99ROaak78wvNvx/8vLd7/Xrw7rH/xGubDqceuflOgSHZ1MQsLS3JNNU0KdkkySDRIskkxcjcItXc0NAwxcDY3L+9MbUhkJEh7As/CyMDBIL4LAwlqcUlDAwABhgh/Q==';

    const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    const onUserPublish = async (
        user,
        mediaType
    ) => {
        if (mediaType === "video") {
            const remoteTrack = await agoraClient.subscribe(user, mediaType);
            console.log("video track===",remoteTrack)
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
                channelName,
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

