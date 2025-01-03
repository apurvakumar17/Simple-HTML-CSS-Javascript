
let container = document.body;
let snakeHeading = "N";
let fruitX;
let fruitY;


//------Calculate rows and columns------------//
let rows = Math.floor(window.innerHeight / 35);
let columns = Math.floor(window.innerWidth / 35);


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


    let s1 = document.createElement("div");
    s1.setAttribute("id", "snakeHead");
    let x = Math.round(columns / 2);
    let y = Math.round(rows / 2);
    s1.style.gridArea = `${x} / ${y} / ${x + 1} / ${y + 1}`;
    container.appendChild(s1);

    createFruit();

    // Update global boundaries
    leftBound = 1;
    rightBound = columns;
    topBound = 1;
    bottomBound = rows;
}

generateGrid();



let resizeTimer; //For resizing the grid
//----genarate the grid dynamically-----//
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        generateGrid();
    }, 200);
});


//-------------------------------------------------------------------------------//


document.addEventListener("keydown", turn);
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
    checkFood();
}


function createFruit() {

    fruitX = Math.floor(Math.random() * (rows - 2)) + 2;
    fruitY = Math.floor(Math.random() * (columns - 2)) + 2;

    let fruit = document.createElement("div");
    fruit.setAttribute("id", "fruit");
    fruit.style.gridArea = `${fruitX} / ${fruitY} / ${fruitX + 1} / ${fruitY + 1}`;
    container.appendChild(fruit);
}

let tickInterval = setInterval(ticker, 300);

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
    checkFood();
}

function checkFood() {
    let sHead = document.getElementById("snakeHead");
    let redFruit = document.getElementById("fruit");
    if (sHead.style.gridArea === redFruit.style.gridArea) {
        redFruit.remove();
        createFruit();
    }
}