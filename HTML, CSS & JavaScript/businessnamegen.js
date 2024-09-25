/*Adjectives:
Crazy
Amazing
Fire

Shop Name:
Engine
Foods
Garments

Another Word:
Bros
Limited
Hub*/
let name1="";
let x1=Math.random();
if (x1<0.33){
    name1=name1.concat("Crazy");
}else if(x1>0.33 && x1<0.66){
    name1=name1.concat("Amazing");
}else{
    name1=name1.concat("Fire");
}

let x2=Math.random();
if (x2<0.33){
    name1=name1.concat(" Engine");
}else if(x2>0.33 && x2<0.66){
    name1=name1.concat(" Foods");
}else{
    name1=name1.concat(" Garments");
}

let x3=Math.random();
if (x3<0.33){
    name1=name1.concat(" Bros");
}else if(x3>0.33 && x3<0.66){
    name1=name1.concat(" Limited");
}else{
    name1=name1.concat(" Hub");
}

console.log(`Your buisness name is: ${name1}`);