
let container = document.body;
let snakeHeading = "N";
let fruitX;
let fruitY;
let tickInterval;
let score = 0;
let toggleTurnKeyListener1 = 0;
// let trailLength = 1;
let trail = [];

//------Calculate rows and columns------------//
let rows = Math.floor(window.innerHeight / 35);
let columns = Math.floor(window.innerWidth / 35);




function toggleTurnKeyListener() {
    if (toggleTurnKeyListener1 === 0) {
        document.addEventListener("keydown", turn);
        toggleTurnKeyListener1 = 1;
    } else {
        document.removeEventListener("keydown", turn);
        toggleTurnKeyListener1 = 0;
    }
}
toggleTurnKeyListener();

function gameEndMenu() {
    let baseRow = Math.floor((rows - 5) / 2);
    let baseCol = Math.floor((columns - 6) / 2);

    let mm = document.createElement("div");
    mm.setAttribute("id", "mainmenu");
    mm.style.gridArea = `${baseRow} / ${baseCol} / ${baseRow + 7} / ${baseCol + 8}`

    let msg1 = document.createElement("div");
    msg1.innerText = "Game Over !!";
    msg1.setAttribute("id", "gameovermsg");
    msg1.style.gridArea = `${baseRow + 1} / ${baseCol + 1} / ${baseRow + 3} / ${baseCol + 7}`

    let res1 = document.createElement("div");
    res1.addEventListener("click", generateGrid);
    res1.setAttribute("id", "restartbtn");
    res1.innerHTML = "<span id='res'>Restart &orarr;</span>"
    res1.style.gridArea = `${baseRow + 4} / ${baseCol + 1} / ${baseRow + 6} / ${baseCol + 7}`

    container.append(mm);
    container.append(msg1);
    container.append(res1);
    toggleTurnKeyListener();
    snakeHeading = "N";
    score = 0;
}

function createScoreBoard() {
    let scoreBoard = document.createElement("div");
    scoreBoard.setAttribute("id", "scorebox");
    scoreBoard.style.gridArea = `${2} / ${2} / ${3} / ${4}`;
    container.appendChild(scoreBoard);
}

function updateScore() {
    let sb = document.getElementById("scorebox");
    sb.innerText = score;
}

function spawnHead() {
    if ((document.getElementById("snakeHead"))) {
        document.getElementById("snakeHead").remove();
    }
    let s1 = document.createElement("div");
    s1.setAttribute("id", "snakeHead");
    let x = Math.round(rows / 2);
    let y = Math.round(columns / 2);
    s1.style.gridArea = `${x} / ${y} / ${x + 1} / ${y + 1}`;
    container.appendChild(s1);
    trail.push(`${x} / ${y} / ${x + 1} / ${y + 1}`);
}


function startMoving() {
    tickInterval = setInterval(ticker, 300);
}

function generateGrid() {
    // Clear existing grid
    container.innerHTML = "";

    // Recalculate rows and columns based on the new window size
    rows = Math.floor(window.innerHeight / 35);
    columns = Math.floor(window.innerWidth / 35);

    // Create new grid boxes
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= columns; j++) {
            let boxy = document.createElement("div");
            boxy.setAttribute("id", `${i}-${j}`);
            boxy.setAttribute("class", "box");
            // boxy.innerText = `${i},${j}`;
            container.appendChild(boxy);
            document.getElementById(`${i}-${j}`).style.gridArea = `${i} / ${j} / ${i + 1} / ${j + 1}`;
        }
    }

    spawnHead();
    createScoreBoard();
    createFruit();
    startMoving();
    updateScore();
    checkOutBound();
    if (toggleTurnKeyListener1 === 0) {
        toggleTurnKeyListener();
    }
    trail = [];
    trail.push(document.getElementById("snakeHead").style.gridArea);
}

generateGrid();


let resizeTimer; //For resizing the grid
//----genarate the grid dynamically-----//
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        generateGrid();
        rows = Math.floor(window.innerHeight / 35);
        columns = Math.floor(window.innerWidth / 35);
    }, 200);
});


//-------------------------------------------------------------------------------//



let g1;
function turn(event) {
    let move = document.getElementById("snakeHead");
    g1 = move.style.gridArea.split(" / ").map(Number);

    if (event.key === "ArrowRight" && snakeHeading !== "E" && snakeHeading !== "W") {
        g1[1] += 1;
        g1[3] += 1;
        snakeHeading = "E";
    } else if (event.key === "ArrowLeft" && snakeHeading !== "W" && snakeHeading !== "E") {
        g1[1] -= 1;
        g1[3] -= 1;
        snakeHeading = "W";
    } else if (event.key === "ArrowUp" && snakeHeading !== "N" && snakeHeading !== "S") {
        g1[0] -= 1;
        g1[2] -= 1;
        snakeHeading = "N";
    } else if (event.key === "ArrowDown" && snakeHeading !== "S" && snakeHeading !== "N") {
        g1[0] += 1;
        g1[2] += 1;
        snakeHeading = "S";
    }
    move.style.gridArea = `${g1[0]} / ${g1[1]} / ${g1[2]} / ${g1[3]}`;
    trail.push(`${g1[0]} / ${g1[1]} / ${g1[2]} / ${g1[3]}`);
    let cf = checkFood();
    if (!cf) {
        trail.shift();
    }
    checkOutBound();
}


function createFruit() {

    fruitX = Math.floor(Math.random() * (rows - 2)) + 2;
    fruitY = Math.floor(Math.random() * (columns - 2)) + 2;

    let fruit = document.createElement("div");
    fruit.setAttribute("id", "fruit");
    fruit.style.gridArea = `${fruitX} / ${fruitY} / ${fruitX + 1} / ${fruitY + 1}`;
    container.appendChild(fruit);
}



function ticker() {
    let m1 = document.getElementById("snakeHead");
    let grid1 = m1.style.gridArea.split(" / ").map(Number);

    if (snakeHeading === "N") {
        grid1[0] -= 1;
        grid1[2] -= 1;
    } else if (snakeHeading === "S") {
        grid1[0] += 1;
        grid1[2] += 1;
    } else if (snakeHeading === "E") {
        grid1[1] += 1;
        grid1[3] += 1;
    } else if (snakeHeading === "W") {
        grid1[1] -= 1;
        grid1[3] -= 1;
    }
    m1.style.gridArea = `${grid1[0]} / ${grid1[1]} / ${grid1[2]} / ${grid1[3]}`;
    trail.push(`${grid1[0]} / ${grid1[1]} / ${grid1[2]} / ${grid1[3]}`);
    let cf = checkFood();
    if (!cf) {
        trail.shift();
    }
    console.log(trail);
    if (document.getElementsByClassName("snakeBody").length > 0) {
        let delsnakebody = document.getElementsByClassName("snakeBody");
        while (delsnakebody.length > 0) {
            delsnakebody[0].remove();
        }
    }
    for (let i = 0; i < trail.length - 1; i++) {
        let sb = document.createElement("div");
        sb.setAttribute("class", "snakeBody");
        sb.style.gridArea = trail[i]; // Ensure trail[i] is a valid grid-area string
        container.append(sb);
    }
    
    checkOutBound();
}

function checkFood() {
    let sHead = document.getElementById("snakeHead");
    let redFruit = document.getElementById("fruit");
    if (sHead.style.gridArea === redFruit.style.gridArea) {
        redFruit.remove();
        createFruit();
        score++;
        updateScore();
        // trail.push(sHead.style.gridArea);
        // trailLength++;
        return true;
    }
    return false;
}

function checkOutBound() {
    let sHead = document.getElementById("snakeHead");
    let posS = sHead.style.gridArea.split("/").map(Number);
    // console.log(posS);
    if (posS[0] === 1 & posS[2] === 2) {
        clearInterval(tickInterval);
        gameEndMenu();
    } else if (posS[1] === 1 & posS[3] === 2) {
        clearInterval(tickInterval);
        gameEndMenu();
    } else if (posS[1] === columns & posS[3] === columns + 1) {
        clearInterval(tickInterval);
        gameEndMenu();
    } else if (posS[0] === rows & posS[2] === rows + 1) {
        clearInterval(tickInterval);
        gameEndMenu();
    }
} 