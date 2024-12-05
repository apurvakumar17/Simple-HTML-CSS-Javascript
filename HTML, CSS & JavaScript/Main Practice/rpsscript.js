
let compimgs = document.getElementById("compch").getElementsByClassName("opimg");
let userimgs = document.getElementById("userch").getElementsByClassName("opimg");
let msg = document.getElementById("notif");

//-----------------------Dim the computer choices and create an its array-----------------------//
let compchoice = [];
for (let i = 0; i < compimgs.length; i++) {
    compimgs[i].style.filter = "opacity(17%)";
    compchoice.push(compimgs[i]);
}


//--------------------------------activity after user chooses a value-------------------------------//
function userchoice(usr) {

    //-------------for state reset after 2 seconds of choosing---------------//
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            compimgs[i].style.filter = "opacity(17%)";
            userimgs[i].style.filter = "opacity(95%)";
            msg.innerText = "Choose:";
            msg.style.backgroundColor = "#080041";
        }
    },1000);


    //----------------dim the not choosen user choices-----------------//
    let eles = usr.parentNode.getElementsByTagName("img");
    for (let i = 0; i < eles.length; i++) {
        if (eles[i] != usr) {
            eles[i].style.filter = "opacity(17%)";
        }
    }


    //-------------brighten the choosed choice my computer-------------//
    let randomIndex = Math.floor(Math.random() * compchoice.length);
    let cmp = compchoice[randomIndex];
    for (let i = 0; i < compimgs.length; i++) {
        if (compimgs[i] == cmp) {
            compimgs[i].style.filter = "opacity(95%)";
        }
    }

    
    //--------------winner and looser detector-------------//
    let cmp2 = cmp.getAttribute('alt');
    let usr2 = usr.getAttribute('alt');
    if (cmp2 == usr2) {
        msg.innerText = "Its Draw !";
    } else if (
        (cmp2 === compimgs[0].getAttribute('alt') && usr2 === userimgs[2].getAttribute('alt')) || 
        (cmp2 === compimgs[1].getAttribute('alt') && usr2 === userimgs[0].getAttribute('alt')) || 
        (cmp2 === compimgs[2].getAttribute('alt') && usr2 ===userimgs[1].getAttribute('alt'))
    ) {
        msg.innerText = "You Lose !";
        msg.style.backgroundColor = "#410002";
    } else {
        msg.innerText = "You Won !";
        msg.style.backgroundColor = "#024100";
    }
}
