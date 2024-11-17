let isPlaying = false; 

function playpause() {
    const controlButton = document.getElementById("controls").children[1]; // Get the button element
    if (isPlaying) {
       
        controlButton.innerHTML = 'play_circle'; 
    } else {
        controlButton.innerHTML = 'pause_circle'; 
    }
    isPlaying = !isPlaying;
}
