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
let pallete = [];
let palletecls = document.getElementById("recentc").children;

function rgbToHex(rgb) {
    let rgbArray = rgb.match(/\d+/g); // Extract numbers
    return `#${rgbArray.map(x => ('0' + parseInt(x).toString(16)).slice(-2)).join('')}`;
}

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
    // try try but don't cry

    
    for (let i of palletecls) {
        pallete.push(i);
        i.addEventListener("click", function() {
            colorp.value = rgbToHex(window.getComputedStyle(this).getPropertyValue('background-color'));
        });
        console.log(window.getComputedStyle(i).getPropertyValue('background-color'));
    }

    inpWidthOutput.innerText = (Math.floor((container.offsetHeight) / inpWidth.value)).toString() + "X" + (Math.floor((container.offsetWidth) / inpWidth.value)).toString();

}
window.addEventListener("mousedown", function(){
    draw = true
    updateColorPallete();
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
    inpWidthOutput.innerText = (Math.floor((container.offsetHeight) / inpWidth.value)).toString() + "X" + (Math.floor((container.offsetWidth) / inpWidth.value)).toString();
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

function updateColorPallete(colour) {
    

    let pallete0Rgb = window.getComputedStyle(pallete[0]).getPropertyValue('background-color');
    let pallete0Hex = rgbToHex(pallete0Rgb);
    let currcolor = colorp.value.toLowerCase(); // Ensure lowercase for uniformity

    console.log(pallete0Hex, currcolor); // Debugging

    if (pallete0Hex !== currcolor) {
        for (let i = pallete.length - 1; i > 0; i--) {
            pallete[i].style.backgroundColor = pallete[i - 1].style.backgroundColor;
        }
        pallete[0].style.backgroundColor = currcolor;
    }
}