const container = document.getElementById('container'); 

function updateStorage() {
    localStorage.setItem("notes", container.innerHTML)
}

function showNotes() {
    container.innerHTML = localStorage.getItem("notes");
}
showNotes();

function addnote() {
    newnote = document.createElement("p"); 
    newnote.setAttribute('class', 'notebox');
    newnote.setAttribute('contenteditable', 'true'); 
    newnote.innerHTML = `
        <img src="https://cdn-icons-png.flaticon.com/512/3807/3807871.png" alt="delete" onclick="delnote(this)">
    `;

    container.appendChild(newnote); 
    updateStorage();
}

function delnote(element) {
    const note = element.parentElement; 
    note.remove();
    updateStorage();
}


