/*function isTouchScreen() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;
}*/


//---------Color Shuffler---------//
function shuffleColor() {
    const letters = '0123456789ABCDEF';
    let newColor = "#";
    for (let i = 0; i < 6; i++) {
        newColor += letters[Math.floor(Math.random() * 16)];
    }
    return newColor;
}

//--------Boundaries Resetter-------//
/*function resetBounds() {
    leftBound = 1;
    rightBound = columns;
    topBound = 1;
    bottomBound = rows;
    timer = 1;
}*/


//--------------------------------------------------------------------------------------------------//

let container = document.body;


document.addEventListener("keydown", traverseOptions);
/*document.addEventListener("touchstart", () => {
    traverseOptions(new KeyboardEvent("keydown", { key: "Enter" }));
});*/

let optionShown = 0;
const rows = Math.floor(window.innerHeight / 50);
const columns = Math.floor(window.innerWidth / 50);

//-----------Create boxes for grid--------------//
for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
        let boxy = document.createElement("div");
        boxy.setAttribute("id", `${i}-${j}`);
        boxy.setAttribute("class", "box");
        container.appendChild(boxy);
        document.getElementById(`${i}-${j}`).style.gridArea = `${i} / ${j} / ${i + 1} / ${j + 1}`;
        document.getElementById(`${i}-${j}`).addEventListener("touchstart", () => {
            traverseOptions(new KeyboardEvent("keydown", { key: "Enter" }));
        });
    }
}

//----------------------Initialize boundaries------------------//
let leftBound = 1;
let rightBound = columns;
let topBound = 1;
let bottomBound = rows;

//----Starter color----//
let color = "#429d31"


function spiralTraverse(n, mode) {

    let timer = 1;

    //-------Loop for n traversals------//
    for (let counter = 0; counter < n; counter++) {

        let pallete = [];

        //------Different work for each mode------//
        if (mode === "NORMAL") {

            //-------Shuffle Color-------//
            setTimeout(() => { pallete.push(shuffleColor()) }, timer * 50);
            timer++;

        } else if (mode === "SILVER GLITTER" && counter === 0) {

            //--------Silver Pallete-------//
            pallete = ["#999999", "#A4A4A4", "#AFAFAF", "#BABABA", "#C4C4C4", "#CFCFCF", "#DBDBDB", "#E6E6E6"];
        }

        //--------------------------------Spiral Traversal logic--------------------------------//
        while (leftBound <= rightBound && topBound <= bottomBound) {


            //--------------Traverse from left to right--------------//
            for (let k = leftBound; k <= rightBound; k++) {
                let sbox = document.getElementById(`${topBound}-${k}`);
                // sbox.innerText = `${topBound}-${k}`;
                setTimeout(() => {
                    sbox.style.backgroundColor = pallete[Math.floor(pallete.length * Math.random())];
                }, timer * 50);
                timer++;
            }
            topBound++;


            //-------------Traverse from top to bottom---------------//
            for (let k = topBound; k <= bottomBound; k++) {
                let sbox = document.getElementById(`${k}-${rightBound}`);
                // sbox.innerText = `${k}-${rightBound}`;
                setTimeout(() => {
                    sbox.style.backgroundColor = pallete[Math.floor(pallete.length * Math.random())];
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
                        sbox.style.backgroundColor = pallete[Math.floor(pallete.length * Math.random())];
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
                        sbox.style.backgroundColor = pallete[Math.floor(pallete.length * Math.random())];
                    }, timer * 50);
                    timer++;
                }
                leftBound++;
            }
        }

        //------Reset the boundaries------//
        leftBound = 1;
        rightBound = columns;
        topBound = 1;
        bottomBound = rows;

    }
    /*if (isTouchScreen()) {
        console.log("horra");
        traverseOptions(Event);
    }*/
}




//-----------------------------Main menu options-----------------------------//
function traverseOptions(event) {


    //------Opens and closes on pressing Enter key-------//
    if (event.key === "Enter") {
        /*color = shuffleColor();*/
        if (optionShown === 0) {

            //------Opens Main Menu------//
            let option = document.createElement("div");//Main Menu Background
            option.setAttribute("id", "mainmenu");

            let op1 = document.createElement("div");//Option 1 Button
            op1.setAttribute("class", "ops");
            op1.setAttribute("id", "op1");
            op1.innerText = "Silver Glitter";

            let op2 = document.createElement("div");//Option 1 Button
            op2.setAttribute("class", "ops");
            op2.setAttribute("id", "op2");
            op2.innerText = "Normal";

            document.body.appendChild(op1);
            document.body.appendChild(op2);
            document.body.appendChild(option);

            document.getElementById("op1").style.gridArea = `${Math.floor(rows / 2) + 1} / ${Math.floor(columns / 2) - 1} / ${Math.floor(rows / 2) + 2} / ${Math.floor(columns / 2) + 3}`;
            document.getElementById("op2").style.gridArea = `${Math.floor(rows / 2) + 2} / ${Math.floor(columns / 2) - 1} / ${Math.floor(rows / 2) + 3} / ${Math.floor(columns / 2) + 3}`;
            document.getElementById("mainmenu").style.gridArea = `${Math.floor(rows / 2)} / ${Math.floor(columns / 2) - 2} / ${Math.floor(rows / 2) + 4} / ${Math.floor(columns / 2) + 4}`;


            //-----------Functionality of Silver Glitter Button(#op1)----------//
            document.getElementById("op1").addEventListener("click", () => {

                //--------Closes main menu--------//
                document.getElementById("mainmenu").remove();
                document.getElementById("op1").remove();
                document.getElementById("op2").remove();
                optionShown = 0;

                // Trigger the spiral traversal
                spiralTraverse(1, "SILVER GLITTER");
            });

            /*document.getElementById("op1").removeEventListener("touchstart", () => {
                traverseOptions(new KeyboardEvent("keydown", { key: "Enter" }));
            });*/

            //-----------Functionality of Normal Mode button(#op2)---------------//
            document.getElementById("op2").addEventListener("click", () => {

                //--------Closes main menu--------//
                document.getElementById("mainmenu").remove();
                document.getElementById("op1").remove();
                document.getElementById("op2").remove();
                optionShown = 0;

                // Trigger the spiral traversal
                spiralTraverse(1, "NORMAL");

            });

            /*document.getElementById("op1").removeEventListener("touchstart", () => {
                traverseOptions(new KeyboardEvent("keydown", { key: "Enter" }));
            });*/

            optionShown = 1;
        } else {
            //--------Closes main menu--------//
            document.getElementById("mainmenu").remove();
            document.getElementById("op1").remove();
            document.getElementById("op2").remove();
            optionShown = 0;
        }
    }
    /*console.log(event);*/
}


/*Grey Shades = #999999, #A4A4A4, #AFAFAF, #BABABA, #C4C4C4, #CFCFCF, #DBDBDB, #E6E6E6*/
