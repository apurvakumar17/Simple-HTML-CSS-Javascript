let container = document.body;
let rows = Math.floor(window.innerHeight / 50);
let columns = Math.floor(window.innerWidth / 50);

//-----------Create boxes for grid--------------//
for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
        let boxy = document.createElement("div");
        boxy.setAttribute("id", `${i}-${j}`);
        boxy.setAttribute("class", "box");
        container.appendChild(boxy);
    }
}

//----------------------Initialize boundaries------------------//
let leftBound = 1;
let rightBound = columns;
let topBound = 1;
let bottomBound = rows;
let timer = 1;


//--------------------------------Spital Traversal logic--------------------------------//
while (leftBound <= rightBound && topBound <= bottomBound) {


    //--------------Traverse from left to right--------------//
    for (let k = leftBound; k <= rightBound; k++) {
        let sbox = document.getElementById(`${topBound}-${k}`);
        // sbox.innerText = `${topBound}-${k}`;
        setTimeout(() => {
            sbox.style.backgroundColor = "#429d31";
        }, timer * 50);
        timer++;
    }
    topBound++;


    //-------------Traverse from top to bottom---------------//
    for (let k = topBound; k <= bottomBound; k++) {
        let sbox = document.getElementById(`${k}-${rightBound}`);
        // sbox.innerText = `${k}-${rightBound}`;
        setTimeout(() => {
            sbox.style.backgroundColor = "#429d31";
        }, timer * 50);
        timer++;
    }
    rightBound--;


    //-------------Traverse from right to left----------------//
    if (topBound <= bottomBound) {
        for (let k = rightBound; k >= leftBound; k--) {
            let sbox = document.getElementById(`${bottomBound}-${k}`);
            // sbox.innerText = `${bottomBound}-${k}`;
            setTimeout(() => {
                sbox.style.backgroundColor = "#429d31";
            }, timer * 50);
            timer++;
        }
        bottomBound--;
    }


    //-------------Traverse from bottom to top----------------//
    if (leftBound <= rightBound) {
        for (let k = bottomBound; k >= topBound; k--) {
            let sbox = document.getElementById(`${k}-${leftBound}`);
            // sbox.innerText = `${k}-${leftBound}`;
            setTimeout(() => {
                sbox.style.backgroundColor = "#429d31";
            }, timer * 50);
            timer++;
        }
        leftBound++;
    }
}


/*leftBound = 1;
rightBound = columns;
topBound = 1;
bottomBound = rows;

while (leftBound <= rightBound && topBound <= bottomBound) {
    // Traverse from left to right
    for (let k = leftBound; k <= rightBound; k++) {
        let sbox = document.getElementById(`${topBound}-${k}`);
        sbox.innerText = `${topBound}-${k}`;
    }
    topBound++;

    // Traverse from top to bottom
    for (let k = topBound; k <= bottomBound; k++) {
        let sbox = document.getElementById(`${k}-${rightBound}`);
        sbox.innerText = `${k}-${rightBound}`;
    }
    rightBound--;

    // Traverse from right to left
    if (topBound <= bottomBound) {
        for (let k = rightBound; k >= leftBound; k--) {
            let sbox = document.getElementById(`${bottomBound}-${k}`);
            sbox.innerText = `${bottomBound}-${k}`;
        }
        bottomBound--;
    }

    // Traverse from bottom to top
    if (leftBound <= rightBound) {
        for (let k = bottomBound; k >= topBound; k--) {
            let sbox = document.getElementById(`${k}-${leftBound}`);
            sbox.innerText = `${k}-${leftBound}`;
        }
        leftBound++;
    }
}*/