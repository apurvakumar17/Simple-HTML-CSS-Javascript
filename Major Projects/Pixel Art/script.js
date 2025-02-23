let container = document.getElementById("container");
let colorp = document.getElementById("colorpicker");
let rows = Math.floor((container.offsetHeight) / 35);
let columns = Math.floor((window.innerWidth) / 35);
console.log(rows + " " + columns);
let clear = document.getElementById("clear");
let draw = false;

function generateGrid() {
    container.innerHTML = "";
    rows = Math.floor((container.offsetHeight) / 35);
    columns = Math.floor((window.innerWidth) / 35);

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