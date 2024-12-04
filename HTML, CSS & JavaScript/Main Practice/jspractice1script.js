/*function add_element() {
    let x = document.getElementById("mainbox");

    let new_box = document.createElement("div");
    new_box.setAttribute("class", "newbox");
    new_box.innerText = "You added me";

    btn = document.createElement("button");
    btn.innerText = "Click me to add a new class to all boxes";
    btn.addEventListener("click", add_class);
    new_box.append(btn);

    x.appendChild(new_box);
}

function add_class() {
    let divs = document.getElementsByClassName("newbox");
    for (let x of divs) {
        x.classList.add("newclass");
    }
}

let boxes = document.getElementsByClassName("newbox");
for (let x of boxes) {
    x.onmoverover = () => {
        x.style.backgroundColor = "dogerblue";
    }
    x.onmouseout = () => {
        x.style.backgroundColor = "aquamarine";
    }
}
for (let box of boxes) {
    box.onmouseover = () => {
        // Change the background color of all "newbox" elements
        for (let b of boxes) {
            b.style.backgroundColor = "yellow"; // Change to desired color
        }
    };

    box.onmouseout = () => {
        // Reset the background color of all "newbox" elements
        for (let b of boxes) {
            b.style.backgroundColor = ""; // Revert to original color
        }
    };
}*/


function add_element() {
    let x = document.getElementById("mainbox");

    let new_box = document.createElement("div");
    new_box.setAttribute("class", "newbox");
    new_box.innerText = "You added me";

    // Add hover functionality to the new box
    new_box.onmouseover = () => {
        let boxes = document.getElementsByClassName("newbox");
        for (let b of boxes) {
            b.style.backgroundColor = "lightgreen"; // Change to desired color
        }
    };

    new_box.onmouseout = () => {
        let boxes = document.getElementsByClassName("newbox");
        for (let b of boxes) {
            b.style.backgroundColor = ""; // Revert to original color
        }
    };

    let btn = document.createElement("button");
    btn.innerText = "Click me to add a new class to all boxes";
    btn.addEventListener("click", add_class);
    new_box.append(btn);

    x.appendChild(new_box);
}

function add_class() {
    let divs = document.getElementsByClassName("newbox");
    for (let x of divs) {
        x.classList.add("newclass");
    }
}
