
function searchSong(){
    let serachTerm=document.getElementById("myInput").value;
    let url = "https://open.spotify.com/search/"+serachTerm;
    window.open(url,'_blank');
}


let isPlaying = true;



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

//current song element
let currentSong = new Audio();
const controlButton = document.getElementById("controls").children[1];

//for main play pause button activity 
function playpause() {
    // const controlButton = document.getElementById("controls").children[1]; // Get the button element
    if (isPlaying) {

        controlButton.innerHTML = 'play_circle';
    } else {
        controlButton.innerHTML = 'pause_circle';
    }
    isPlaying = !isPlaying;
}

//this function gets the mp3 file names from the songs folder
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

//plays the clicked song
const playMusic = (track) => {
    // let audio=new Audio("/songs/"+track);
    currentSong.src = "/songs/" + track;
    currentSong.play();
    controlButton.innerHTML = 'pause_circle';
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00/ 00:00"
}

//main function
async function main() {

    // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
    const token = 'BQATBqu0ZCddx7nkFxVtE6QLBCHORZKqSRe5L8Qz8_m3eTQjhU0D5u1g7N-vDDsSjy1eBZiQj1q99WNGXkmHAsW6bjjFOyvwv4dKFIiCTgGF_XUzOX5exD3sp8QKtp61dL9e-42uQoHgVB3f-4ohStiTvlJ6a-7yidihTOLTH6yQYg60vffX-obakDSVZBpWjIF2GSbZRhey9Wo0bPHGjb2tN-HZ1O_W_RhAXaefocyI3ECPH-64Q5O56vHy9sPdr_pf6hpjL3ae8A0BTG-JO4-pOq06cMVX';
    async function fetchWebApi(endpoint, method, body) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method,
            body: JSON.stringify(body)
        });
        return await res.json();
    }

    async function getTopTracks() {
        // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
        return (await fetchWebApi(
            'v1/me/top/tracks?time_range=long_term&limit=20', 'GET'
        )).items;
    }

    const topTracks = await getTopTracks();
    let trackList = []; // Initialize an array to store the formatted track strings

    topTracks?.map(({ name, artists }) => {
        const trackInfo = `${name} by ${artists.map(artist => artist.name).join(', ')}`;
        trackList.push(trackInfo); // Append each formatted string to the array
    });

    console.log(trackList); // Print the array with all track details

    // trackList=["Dildaara (Stand By Me) by Shafqat Amanat Ali","Soni De Nakhre by Wajid, Labh Janjua, Sneha Pant","Paniyon Sa by Rochak Kohli, Atif Aslam, Tulsi Kumar","Kashmir Main Tu Kanyakumari by Sunidhi Chauhan, Arijit Singh, Neeti Mohan","A Cold Night to Remember by TheRelaxedMovement","Jhoome Jo Pathaan by Vishal-Shekhar, Arijit Singh, Sukriti Kakar, Vishal Dadlani, Shekhar Ravjiani, Kumaar","Main Tera Rasta Dekhunga by प्रीतम, Vishal Mishra, Shreya Ghoshal, Shadab Faridi, Altamash Faridi, Amitabh Bhattacharya","Tareefan by QARAN, Badshah","Copines by Aya Nakamura"," by ","Raftaarein by Vishal Dadlani, Shekhar Ravjiani","Genda Phool by Rekha Bhardwaj","Main Tera Rasta Dekhunga (Film Version) by प्रीतम, Shadab Faridi, Altamash Faridi, Amitabh Bhattacharya"," by ","Chashni Lofi Mix by Abhijeet Srivastava, Vishal-Shekhar, DJ Rink","Khuda Jaane by Vishal-Shekhar, KK, Shilpa Rao, Anvita Dutt Guptan"," by ","O Maahi (From \"Dunki\") by प्रीतम, Arijit Singh, Irshad Kamil","Titli by Chinmayi, Gopi Sundar","Bye Bye Bye - From Deadpool and Wolverine Soundtrack by *NSYNC"];
    //i have to do that no other way because spotify token is getting expired repeatedly after each hour

    trackList.forEach(track => {
        console.log(track);
        if (track.trim().toLowerCase() === 'by') {
            return;  // Skips the iteration if track name is 'bye'
        }
        let newspoticard = document.createElement("div");
        newspoticard.classList.add("card1", "mainfill");
        newspoticard.innerHTML = `
                <div class="songpic1" style="background-image:url('https://t3.ftcdn.net/jpg/03/01/43/92/360_F_301439209_vpF837oCGM1lp0cnC7stzCBn3th0dQ6O.jpg')"></div>
                <p class="songpicname darkfontfill">${track.split(" by ")[0]}</p>
            `;
        document.querySelector(".playlistsbox").appendChild(newspoticard);
    });


    //get list of all ondevice songs
    let songs = await getondevicesongs();
    // let songCardTemplate = document.querySelector(".ondev").children[0];
    //lists the on device songs on left pane
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
        e.querySelector(".dc1p").addEventListener("click", element => {
            // console.log(e.querySelector(".songfilet").innerHTML);
            playMusic(e.querySelector(".songfilet").innerHTML);
        })

    })

    //Attach an event listener to play, next and previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
        }
        else {
            currentSong.pause();
        }
    })


    //listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".seekbar").innerHTML = `<div class="seekbarc mainfill" style="width:${songseek()}%"></div>`;
    })
}


main()