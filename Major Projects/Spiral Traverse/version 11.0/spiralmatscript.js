
// Function to check URL and run spiralTraverse if a number is present in the path
function checkURLAndRunSpiralTraverse() {
    const path = window.location.pathname;
    console.log(path);
    const match = path.match(/^\/(\d+)$/);
    console.log(match);
    if (match) {
        const n = parseInt(match[1], 10);
        if (!isNaN(n)) {
            spiralTraverse(n, "NORMAL");
        }
    }
}

// Call the function on page load
window.addEventListener('load', checkURLAndRunSpiralTraverse);

//---------Color Shuffler---------//
function shuffleColor() {
    const letters = '0123456789ABCDEF';
    let newColor = "#";
    for (let i = 0; i < 6; i++) {
        newColor += letters[Math.floor(Math.random() * 16)];
    }
    return newColor;
}

//--------Set Timeout Ids---------//
timeouts = [];
let sid = setTimeout(() => {console.log("Gotcha !")},100);

//-------clear timeouts-------//
function clearAllTimeouts() {
    while (timeouts.length > 0) {
        const id = timeouts.pop();
        clearTimeout(id);
    }
    timeouts = [];
}


//-----------------To generate the grid dynamically------------------//
function generateGrid() {
    // Clear existing grid
    container.innerHTML = "";

    // Recalculate rows and columns based on the new window size
    rows = Math.floor(window.innerHeight / 50);
    columns = Math.floor(window.innerWidth / 50);

    // Create new grid boxes
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

    // Update global boundaries
    leftBound = 1;
    rightBound = columns;
    topBound = 1;
    bottomBound = rows;

    spiralTraverse(1,'NORMAL');
}

//-------------Element Creator----------------//
function createBoxElement(className, id, innerText) {
    let el = document.createElement("div");
    el.setAttribute("id", id);
    el.setAttribute("class", className);
    el.innerHTML = innerText;
    document.body.appendChild(el);
    return el;
}

//--------------------------------------------------------------------------------------------------//

let container = document.body;
let optionShown = 0; //Menu not shown


document.addEventListener("keydown", traverseOptions); //For opening menu box

let resizeTimer; //For resizing the grid
//----genarate the grid dynamically-----//
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        clearAllTimeouts();
        generateGrid();
        optionShown = 0;
    }, 200); 
});


//------Calculate rows and columns------------//
let rows = Math.floor(window.innerHeight / 50);
let columns = Math.floor(window.innerWidth / 50);

//----Initialize boundaries----//
let leftBound = 1;
let rightBound = columns;
let topBound = 1;
let bottomBound = rows;
generateGrid();


//----Starter color----//
let color = "#429d31"  //No longer necessary


function spiralTraverse(n, mode) {

    let timer = 1;

    //-------Loop for n traversals------//
    for (let counter = 0; counter < n; counter++) {

        let pallete = [];

        //------Different work for each mode------//
        if (mode === "NORMAL") {

            //-------Shuffle Color-------//
            sid = setTimeout(() => { pallete.push(shuffleColor()) }, timer * 50);
            timer++;
            timeouts.push(sid);

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
                sid = setTimeout(() => {
                    sbox.style.backgroundColor = pallete[Math.floor(pallete.length * Math.random())];
                }, timer * 50);
                timer++;
                timeouts.push(sid);
            }
            topBound++;


            //-------------Traverse from top to bottom---------------//
            for (let k = topBound; k <= bottomBound; k++) {
                let sbox = document.getElementById(`${k}-${rightBound}`);
                // sbox.innerText = `${k}-${rightBound}`;
                sid = setTimeout(() => {
                    sbox.style.backgroundColor = pallete[Math.floor(pallete.length * Math.random())];
                }, timer * 50);
                timer++;
                timeouts.push(sid);
            }
            rightBound--;


            //-------------Traverse from right to left----------------//
            if (topBound <= bottomBound) {
                for (let k = rightBound; k >= leftBound; k--) {
                    let sbox = document.getElementById(`${bottomBound}-${k}`);
                    // sbox.innerText = `${bottomBound}-${k}`;
                    sid = setTimeout(() => {
                        sbox.style.backgroundColor = pallete[Math.floor(pallete.length * Math.random())];
                    }, timer * 50);
                    timer++;
                    timeouts.push(sid);
                }
                bottomBound--;
            }


            //-------------Traverse from bottom to top----------------//
            if (leftBound <= rightBound) {
                for (let k = bottomBound; k >= topBound; k--) {
                    let sbox = document.getElementById(`${k}-${leftBound}`);
                    // sbox.innerText = `${k}-${leftBound}`;
                    sid = setTimeout(() => {
                        sbox.style.backgroundColor = pallete[Math.floor(pallete.length * Math.random())];
                    }, timer * 50);
                    timer++;
                    timeouts.push(sid);
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
}

function wipeTraverse() {

    let timer = 1;

    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= columns; j++) {
            let sbox = document.getElementById(`${i}-${j}`);
            sid = setTimeout(() => {
                sbox.style.backgroundColor = "white";
            }, timer * 100);
            timeouts.push(sid);
        }
        timer++;
    }
}

function rainTraverse() {
    timerStart = [];
    rainLinesColors = [];
    for (let i = 1; i <= columns; i++) {
        timerStart.push(Math.random() * 20);
        rainLinesColors.push(shuffleColor());
    }
    for (let i = 1; i <= columns; i++) {
        for (let j = 1; j <= rows; j++) {
            let sbox = document.getElementById(`${j}-${i}`);
            const delay = timerStart[i - 1] * 50 + (j - 1) * 50;
            const sid = setTimeout(() => {
                sbox.style.backgroundColor = rainLinesColors[i - 1];
            }, delay);

            timeouts.push(sid);
        }
        timerStart[i - 1]++;
    }
}

//-----------------------------Main menu options-----------------------------//
function traverseOptions(event) {


    //------Opens and closes on pressing Enter key-------//
    if (event.key === "Enter") {

        /*color = shuffleColor();*/
        if (optionShown === 0) {
            

            //------Create Menu Elements------//
            let option = createBoxElement("box", "mainmenu", "");
            let op1 = createBoxElement("ops", "op1", "Spiral");
            let op2 = createBoxElement("ops", "op2", "Wipe");
            let op3 = createBoxElement("ops", "op3", "Disco");
            let op4 = createBoxElement("ops", "op4", "Charm");
            let op5 = createBoxElement("ops", "op5", "Rain")
            let ar1 = createBoxElement("ops", "ar1", "&#9650");
            let ar2 = createBoxElement("ops", "ar2", "&#9660");
            let b1 = createBoxElement("ops", "b1", "&#10074;&#10074;");


            
            //-----Position the menu elemnts to correct place-----//
            
            let baseRow = Math.floor((rows - 5) / 2);
            let baseCol = Math.floor((columns - 6) / 2);

            const elements = [
                { id: "op1", area: [2, 2, 3, 4] },
                { id: "op2", area: [3, 2, 4, 4] },
                { id: "op3", area: [4, 2, 5, 4] },
                { id: "op4", area: [4, 4, 5, 6] },
                { id: "op5", area: [3, 4, 4, 6]},
                { id: "mainmenu", area: [1, 1, 6, 7] },
                { id: "ar1", area: [2, 4, 3, 5] },
                { id: "ar2", area: [2, 5, 3, 6] },
                { id: "b1", area: [1, 1, 2, 2] },
            ];
            
            elements.forEach(({ id, area }) => {
                const element = document.getElementById(id);
                if (element) {
                    element.style.gridArea = `${baseRow + area[0]} / ${baseCol + area[1]} / ${baseRow + area[2]} / ${baseCol + area[3]}`;
                }
            });


            //-----------Functionality of Normal Mode Button(#op1)-----------//
            document.getElementById("op1").addEventListener("click", () => {
                clearAllTimeouts();
                if (document.getElementById("op1").innerText == "Spiral") {
                    spiralTraverse(1, "NORMAL");
                } else {
                    let nt = 0;
                    let str = document.getElementById("op1").innerText;
                    str = str.replace("Sprl", "");
                    nt = parseInt(str);
                    spiralTraverse(nt, "NORMAL");
                }
                closeMenu();
            });

            //-----------Functionality of Wipe button(#op2)---------------//
            document.getElementById("op2").addEventListener("click", () => {
                clearAllTimeouts();
                closeMenu();
                wipeTraverse();
                // spiralTraverse(1, "SILVER GLITTER");
            });

            //-----------Functionality of Disco Mode button(#op3)---------------//
            document.getElementById("op3").addEventListener("click", () => {
                clearAllTimeouts();
                closeMenu();
                let discoTimer = 1;
                while (discoTimer * 500 !== 30000) {
                    sid = setTimeout(() => {
                        spiralTraverse(1, "NORMAL");
                    }, discoTimer * 500);
                    discoTimer++;
                    timeouts.push(sid);
                }
            });

            //-----------Functionality of Charm Mode button(#op4)---------------//
            document.getElementById("op4").addEventListener("click", () => {
                clearAllTimeouts();
                closeMenu();
                let charmTimer = 1;
                while (charmTimer * 500 !== 30000) {
                    sid = setTimeout(() => {
                        spiralTraverse(1, "SILVER GLITTER");
                    }, charmTimer * 500);
                    charmTimer++;
                    timeouts.push(sid);
                }
            });

            //-----------Functionality of Rain button(#op5)---------------------//
            document.getElementById("op5").addEventListener("click", () => {
                clearAllTimeouts();
                closeMenu();
                rainTraverse();
            });
            //-----------Functionality of Arrow Up------------//
            document.getElementById("ar1").addEventListener("click", () => {
                if (document.getElementById("op1").innerText === "Spiral") {
                    document.getElementById("op1").innerText = "Sprl2";
                } else {
                    let nt = 0;
                    let str = document.getElementById("op1").innerText;
                    str = str.replace("Sprl", "");
                    nt = parseInt(str);
                    document.getElementById("op1").innerText = "Sprl" + (nt + 1);
                }
            });

            //-----------Functionality of Arrow Down------------//
            document.getElementById("ar2").addEventListener("click", () => {
                if (document.getElementById("op1").innerText !== "Spiral") {
                    let nt = 0;
                    let str = document.getElementById("op1").innerText;
                    str = str.replace("Sprl", "");
                    nt = parseInt(str);
                    if (nt - 1 > 1) {
                        document.getElementById("op1").innerText = "Sprl" + (nt - 1);
                    } else {
                        document.getElementById("op1").innerText = "Spiral";
                    }
                }
            });

            //-----------Functionality of Pause Button------------//
            document.getElementById("b1").addEventListener("click", () => {
                clearAllTimeouts();
                closeMenu();
            });

            optionShown = 1; //Now menu is hown
        } else {
            closeMenu(); //If its open it closes
        }
    }
}

/*Grey Shades = #999999, #A4A4A4, #AFAFAF, #BABABA, #C4C4C4, #CFCFCF, #DBDBDB, #E6E6E6*/

//----------Close Menu Function----------//
function closeMenu() {
    document.getElementById("mainmenu").remove();
    document.getElementById("op1").remove();
    document.getElementById("op2").remove();
    document.getElementById("op3").remove();
    document.getElementById("op4").remove();
    document.getElementById("op5").remove();
    document.getElementById("ar1").remove();
    document.getElementById("ar2").remove();
    document.getElementById("b1").remove();
    optionShown = 0;
}

