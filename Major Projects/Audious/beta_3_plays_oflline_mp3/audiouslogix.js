let isPlaying = false; 


let currentSong=new Audio();
//for main play pause button activity 
function playpause() {
    const controlButton = document.getElementById("controls").children[1]; // Get the button element
    if (isPlaying) {
       
        controlButton.innerHTML = 'play_circle'; 
    } else {
        controlButton.innerHTML = 'pause_circle'; 
    }
    isPlaying = !isPlaying;
}

//this function gets the mp3 file names from the songs folder
async function getondevicesongs(){
    let a= await fetch("songs/");
    let response= await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as=div.getElementsByTagName("a");
    let songs=[];
    for (let index=0; index<as.length;index++){
        const element=as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href);
        }
    }
    return songs;
}


const playMusic = (track)=>{
    // let audio=new Audio("/songs/"+track);
    currentSong.src="/songs/"+track;
    currentSong.play();
}

//main function
async function main() {


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
            <p class="darkfontfill songfilet">${song.split("/songs/")[1].replaceAll("%20"," ")}</p>
            <span class="material-symbols-outlined darkfontfill dc1p">play_circle</span>
        `;
        document.querySelector(".ondev").appendChild(newSongCard);
    }

    Array.from(document.querySelector(".ondev").children).forEach(e=>{
        e.querySelector(".dc1p").addEventListener("click",element=>{
            console.log(e.querySelector(".songfilet").innerHTML);
            playMusic(e.querySelector(".songfilet").innerHTML);
        })
        
    })
}


main()