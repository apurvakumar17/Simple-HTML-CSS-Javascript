let isPlaying = true;
let currentSong = new Audio();
const controlButton = document.getElementById("controls").children[1];

function searchSong(){
    let serachTerm=document.getElementById("myInput").value;
    let url = "https://open.spotify.com/search/"+serachTerm;
    window.open(url,'_blank');
}

// Spotify API Tokens (You should store them securely)
const clientId = 'your-client-id';  // Replace with your Spotify client ID
let accessToken = localStorage.getItem('access_token') || '';  // Get access token from local storage
let refreshToken = localStorage.getItem('refresh_token') || '';  // Get refresh token from local storage

// Token expiration tracking (in seconds)
let tokenExpirationTime = Date.now() + 3600 * 1000; // Assuming the token is valid for 1 hour

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "--:--";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

function songseek() {
    return (currentSong.currentTime / currentSong.duration) * 100;
}

async function fetchWebApi(endpoint, method, body) {
    // Check if token is about to expire and refresh if necessary
    if (Date.now() > tokenExpirationTime) {
        await getRefreshToken();  // Call the refresh function before proceeding
    }

    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method,
        body: JSON.stringify(body)
    });
    
    return await res.json();
}

const getRefreshToken = async () => {
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId,
            // Add client secret if required
            // client_secret: 'your-client-secret'
        }),
    }

    const response = await fetch(url, payload);
    const data = await response.json();

    if (data.access_token) {
        accessToken = data.access_token;  // Update access token
        localStorage.setItem('access_token', accessToken); // Store new access token in local storage
        tokenExpirationTime = Date.now() + data.expires_in * 1000;  // Set new expiration time
        console.log("Access token refreshed:", accessToken);
    }
}

// Plays the clicked song
const playMusic = (track) => {
    currentSong.src = "/songs/" + track;
    currentSong.play();
    controlButton.innerHTML = 'pause_circle';
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00/ 00:00";
}

// This function gets the mp3 file names from the songs folder
async function getondevicesongs() {
    let a = await fetch("songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }
    return songs;
}

async function getTopTracks() {
    return (await fetchWebApi(
        'v1/me/top/tracks?time_range=long_term&limit=20', 'GET'
    )).items;
}

// Main function
async function main() {
    const topTracks = await getTopTracks();
    const trackList = [];

    topTracks?.map(({ name, artists }) => {
        const trackInfo = `${name} by ${artists.map(artist => artist.name).join(', ')}`;
        trackList.push(trackInfo);
    });

    trackList.forEach(track => {
        let newspoticard = document.createElement("div");
        newspoticard.classList.add("card1", "mainfill");
        newspoticard.innerHTML = `
            <div class="songpic1" style="background-image:url('https://t3.ftcdn.net/jpg/03/01/43/92/360_F_301439209_vpF837oCGM1lp0cnC7stzCBn3th0dQ6O.jpg')"></div>
            <p class="songpicname darkfontfill">${track.split(" by ")[0]}</p>
        `;
        document.querySelector(".playlistsbox").appendChild(newspoticard);
    });

    // Get list of all on-device songs
    let songs = await getondevicesongs();

    // Lists the on-device songs on the left pane
    for (const song of songs) {
        let newSongCard = document.createElement("div");
        newSongCard.classList.add("dcard1", "darkborder");
        newSongCard.innerHTML = `
            <div class="songcard lightfill">
                <span class="material-symbols-outlined darkfontfill" id="logoaudious">music_note</span>
            </div>
            <p class="darkfontfill songfilet">${song.split("/songs/")[1].replaceAll("%20", " ")}</p>
            <span class="material-symbols-outlined darkfontfill dc1p">play_circle</span>
        `;
        document.querySelector(".ondev").appendChild(newSongCard);
    }

    Array.from(document.querySelector(".ondev").children).forEach(e => {
        e.querySelector(".dc1p").addEventListener("click", () => {
            playMusic(e.querySelector(".songfilet").innerHTML);
        });
    });

    // Attach an event listener to play, next, and previous
    controlButton.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            controlButton.innerHTML = 'pause_circle';
        } else {
            currentSong.pause();
            controlButton.innerHTML = 'play_circle';
        }
    });

    // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".seekbar").innerHTML = `<div class="seekbarc mainfill" style="width:${songseek()}%"></div>`;
    });
}

main();
