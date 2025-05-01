/*const canvas = document.getElementById('tetrisCanvas');
const ctx = canvas.getContext('2d');

const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;
canvas.width = COLS * BLOCK_SIZE;
canvas.height = ROWS * BLOCK_SIZE;
const TETROMINOS = [
    { color: 'cyan', shape: [[1, 1, 1, 1]] },
    { color: 'blue', shape: [[1, 1], [1, 1]] },
    { color: 'orange', shape: [[1, 1, 1], [1, 0, 0]] },
    { color: 'yellow', shape: [[1, 1, 1], [0, 0, 1]] },
    { color: 'green', shape: [[1, 1, 0], [0, 1, 1]] },
    { color: 'red', shape: [[0, 1, 1], [1, 1, 0]] },
    { color: 'purple', shape: [[0, 1, 0], [1, 1, 1]] }
]

let board = Array.from({length: ROWS}, () => Array.from(COLS).fill(null));
// let board = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => null));
*/

//---------SHAPES in tetris--------//
const SHAPES = [
    [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
    ],
    [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0],
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
    ],
    [
        [1, 1],
        [1, 1],
    ],
];

//----------Images of each block----------//
const IMAGES = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
];

//----------image source---------//
let image_address = [
    "blocks/black_glass.webp",
    "blocks/emerald.webp",
    "blocks/copper.webp",
    "blocks/diamond.webp",
    "blocks/lapis_lazuli.webp",
    "blocks/redstone.webp",
    "blocks/iron.webp",
    "blocks/gold.webp",
];

//----------image source to images above---------//
for (let il = 0; il <= 7; il++) {
    IMAGES[il].src = image_address[il];
}

const touchSound = new Audio("sounds/touch floor.wav");
const rotateSound = new Audio("sounds/rotation.wav");
const lineClearSound = new Audio("sounds/delete line.wav");
const overSound = new Audio("sounds/gameover.wav");

const ROWS = 20;
const COLS = 10;
let tick = 500;
let ppstate = "pause";
let scoreBoard = document.getElementById("scoreBoard");
let highscore = document.getElementById("hscore");
const canvas = document.getElementById("tetrisCanvas");
const ctx = canvas.getContext("2d");
ctx.scale(30, 30);
score = 0;
let pieceObj;
let tickInterval;
let loadedImages = 0;
let grid = generateGrid();
for (let i = 1; i <= 7; i++) {
    IMAGES[i].onload = () => {
        loadedImages++;
        if (loadedImages === 7) {
            pieceObj = getRandomPiece();
            startMoving();
        }
    };
}

function getDimensions(matrix) {
    let top = Infinity,
        bottom = -1,
        left = Infinity,
        right = -1;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 1) {
                top = Math.min(top, i);
                bottom = Math.max(bottom, i);
                left = Math.min(left, j);
                right = Math.max(right, j);
            }
        }
    }

    if (top === Infinity) {
        return { height: 0, width: 0 }; // No 1s found
    }

    const height = bottom - top + 1;
    const width = right - left + 1;

    return { height, width };
}

function getRandomPiece() {
    let ran = Math.floor(Math.random() * SHAPES.length);
    let piece = SHAPES[ran];
    let image = IMAGES[ran + 1];
    let height = getDimensions(piece).height;
    let width = getDimensions(piece).width;
    let x = 4;
    let y = -1;
    return { piece, image, x, y, height, width };
}

function renderPiece(pObj) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    let piece = pObj.piece;
    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece[i].length; j++) {
            if (piece[i][j] == 1) {
                ctx.drawImage(pieceObj.image, j + pObj.x, i + pObj.y, 1, 1);
            }
        }
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid (locked pieces)
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (grid[i][j]) {
                ctx.drawImage(grid[i][j], j, i, 1, 1);
            }
        }
    }

    // Draw current falling piece
    renderPiece(pieceObj);
}

function lockPiece() {
    const m = pieceObj.piece;
    const x = pieceObj.x;
    const y = pieceObj.y;

    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j]) {
                let newY = y + i;
                let newX = x + j;
                if (newY >= 0) {
                    grid[newY][newX] = pieceObj.image; // store the image
                }
            }
        }
    }
}

function collides(grid, pObj) {
    const m = pObj.piece;
    const o = { x: pObj.x, y: pObj.y };

    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j]) {
                let newY = i + o.y;
                let newX = j + o.x;
                // Check wall or floor or occupied space
                if (
                    newY >= ROWS || // below bottom
                    newX < 0 || // left wall
                    newX >= COLS || // right wall
                    (newY >= 0 && grid[newY][newX]) // hits something
                ) {
                    return true;
                }
            }
        }
    }
    return false;
}

function startMoving() {
    tickInterval = setInterval(ticker, tick);
}

function clearLines() {
    let linesCleared = 0;

    for (let i = ROWS - 1; i >= 0; i--) {
        if (grid[i].every((cell) => cell !== null)) {
            grid.splice(i, 1); // Remove the full row
            grid.unshift(Array(COLS).fill(null)); // Add a new empty row at the top
            linesCleared++;
            i++; // Check the same index again (rows above have moved down)
        }
    }

    if (linesCleared > 0) {
        score += linesCleared * 10;
        scoreBoard.innerText = "Score: " + score;
        setHScore();
        tick = Math.max(100, tick - linesCleared * 20);
        clearInterval(tickInterval);
        tickInterval = setInterval(ticker, tick);
        // let lineClearSound = new Audio('sounds/delete line.wav');
        lineClearSound.cloneNode().play();
    }
}

function setHScore() {
    const storedHighScore = parseInt(getHScore());

    if (isNaN(storedHighScore)) {
        localStorage.setItem("highestScore", score);
        highscore.innerText = "High Score: " + score;
    } else if (score > storedHighScore) {
        localStorage.setItem("highestScore", score);
        highscore.innerText = "High Score: " + score;
    } else {
        highscore.innerText = "High Score: " + storedHighScore;
    }
}

function getHScore() {
    return localStorage.getItem("highestScore");
}

function aboutToCollide(grid, pObj) {
    const simulatedPiece = {
        ...pObj,
        y: pObj.y + 1,
    };
    return collides(grid, simulatedPiece);
}

function ticker() {
    pieceObj.y++;
    let played = false;
    if (aboutToCollide(grid, pieceObj) && !collides(grid, pieceObj)) {
        // let touchSound = new Audio('sounds/touch floor.wav');
        touchSound.cloneNode().play();
    }
    if (collides(grid, pieceObj)) {
        pieceObj.y--;
        lockPiece();
        clearLines();
        pieceObj = getRandomPiece();

        if (collides(grid, pieceObj)) {
            // let overSound = new Audio('sounds/gameover.wav');
            overSound.cloneNode().play();
            clearInterval(tickInterval);
            scoreBoard.innerText = "Game Over";
            scoreBoard.style.color = "red";
        }
    }
    render();
}

function generateGrid() {
    let grid = [];
    for (let i = 0; i < ROWS; i++) {
        grid.push([]);
        for (let j = 0; j < COLS; j++) {
            grid[i].push(null);
        }
    }
    return grid;
}

function moveDown() {
    if (aboutToCollide(grid, pieceObj) && !collides(grid, pieceObj)) {
        // let touchSound = new Audio('sounds/touch floor.wav');
        touchSound.cloneNode().play();
    }

    pieceObj.y++;
    if (collides(grid, pieceObj)) {
        pieceObj.y--;
        return 0;
    }
    render();
}

function moveLeft() {
    pieceObj.x--;
    if (collides(grid, pieceObj)) {
        pieceObj.x++;
        return 0;
    }
    render();
}

function moveRight() {
    pieceObj.x++;
    if (collides(grid, pieceObj)) {
        pieceObj.x--;
        return 0;
    }
    render();
}

function rotatePiece(matrix) {
    const N = matrix.length;
    const result = [];
    for (let i = 0; i < N; i++) {
        result.push([]);
        for (let j = 0; j < N; j++) {
            result[i][j] = matrix[N - j - 1][i];
        }
    }
    return result;
}

function rotate() {
    const rotated = rotatePiece(pieceObj.piece);
    const oldPiece = pieceObj.piece;
    pieceObj.piece = rotated;

    if (collides(grid, pieceObj)) {
        pieceObj.piece = oldPiece; // revert if collision occurs
    } else {
        render(); // redraw if successful
    }
}

document.addEventListener("keydown", function (e) {
    let key = e.code;
    if (key == "ArrowDown") {
        moveDown();
    } else if (key == "ArrowLeft") {
        moveLeft();
    } else if (key == "ArrowRight") {
        moveRight();
    } else if (key == "ArrowUp") {
        rotate();
        // let rotateSound = new Audio("sounds/rotation.wav");
        rotateSound.cloneNode().play();
    }
});

window.onload = () => {
    // Warm up all sounds by playing muted
    const sounds = [touchSound, rotateSound, lineClearSound, overSound];
    sounds.forEach((snd) => {
        snd.volume = 0;
        snd.play()
            .then(() => {
                snd.pause();
                snd.currentTime = 0;
                snd.volume = 1;
            })
            .catch((e) => {
                // some browsers block autoplay, ignore silently
            });
    });

    const stored = getHScore();
    if (stored !== null) {
        highscore.innerText = "High Score: " + parseInt(stored);
    } else {
        highscore.innerText = "High Score: 0";
    }
};

let playpauseB = document.getElementById("playpause");
playpauseB.addEventListener("click", () => {
    const currentStyle = getComputedStyle(playpauseB).backgroundImage;
    const firstUrl = currentStyle.split(",")[0].trim();
    const secondUrl = currentStyle.split(",")[1].trim();
    if (firstUrl.includes("pause")) {
        clearInterval(tickInterval);
        playpauseB.style.backgroundImage = 'url("/play.png"), ' + secondUrl;
    } else {
        tickInterval = setInterval(ticker, tick);
        playpauseB.style.backgroundImage = 'url("/pause.png"), ' + secondUrl;
    }
});

let restartB = document.getElementById("restart");
restartB.addEventListener("click", () => {
    location.reload();
});

function hasVerticalScrollbar() {
    return (
        document.documentElement.scrollHeight >
        document.documentElement.clientHeight
    );
}

let scorebs = document.getElementById("scoreBoard");

if (hasVerticalScrollbar()) {
    scorebs.style.fontSize = "18px";
}
