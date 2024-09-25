let colors=["red","brown","orange","green"];
console.log(document.body.children[0].children[0]);
console.log(document.body.children[0].children[1]);
console.log(document.body.children[0].children[2]);
console.log(document.body.children[0].children[3]);

let divs=document.body.children[0];
let i=0;
while (colors.length > 0){
    let randomindex=Math.floor(Math.random()*colors.length);
    divs.children[i].style.backgroundColor=colors[randomindex];
    colors.splice(randomindex,1);
    i++;
}
