let container = document.getElementById("container");
let colorp = document.getElementById("colorpicker");
let inpWidth = document.getElementById("density");
let inpWidthOutput = document.getElementById("widthOut");
let pixels = inpWidth.value;
let eraserpro = document.getElementById("eraser");
let imgSave = document.getElementById("saveasimg");
let rows = Math.floor((container.offsetHeight) / pixels);
let columns = Math.floor((window.innerWidth) / pixels);
console.log(rows + " " + columns);
let clear = document.getElementById("clear");
let draw = false;



function generateGrid() {
    container.innerHTML = "";
    rows = Math.floor((container.offsetHeight) / pixels);
    columns = Math.floor((window.innerWidth) / pixels);

    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= columns; j++) {
            let pixel = document.createElement("div");
            pixel.setAttribute("id", `${i}-${j}`);
            pixel.classList.add('box');
            pixel.addEventListener('mouseover', function(){
                if(draw) {
                    pixel.style.backgroundColor = colorp.value;
                }
            })
            pixel.addEventListener("mousedown", () => {
                pixel.style.backgroundColor = colorp.value;
            });
            container.appendChild(pixel);
        }
    }

}
window.addEventListener("mousedown", function(){
    draw = true
})
window.addEventListener("mouseup", function(){
    draw = false
})
generateGrid();
clear.addEventListener("click", () => {
    generateGrid();
});

let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        generateGrid(); // Regenerate grid on resize
    }, 200);
});


let widthTimer;
inpWidth.addEventListener("input", () => {
    inpWidthOutput.innerText = inpWidth.value;
    clearTimeout(widthTimer);
    widthTimer = setTimeout(() => {
        updateCellSize(inpWidth.value);
        generateGrid(); // Regenerate grid on width change
    }, 200);
});


function updateCellSize(size) {
    container.innerHTML = "";
    document.documentElement.style.setProperty('--cell-size', size + 'px');
    pixels = size;
    //min 20
    //max 100
}

function captureElement() {
    let element = document.getElementById("container"); // Target element

    html2canvas(element).then(canvas => {
        let imageURL = canvas.toDataURL("image/png"); // Convert to PNG

        let link = document.createElement("a"); // Create a download link
        link.href = imageURL;
        link.download = "screenshot.png"; // File name
        link.click(); // Trigger download
    });
}

eraserpro.addEventListener("click", () => {
    colorp.value = "#1b1b1b";
});
imgSave.addEventListener("click", () => {
    captureElement();
});