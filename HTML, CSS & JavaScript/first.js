alert("Click OK to proceed to the program");

let var1="Apurva";
console.log(var1);
console.log(typeof var1);

let var2=17;
console.log(var2);
console.log(typeof var2);

const obj1={
    name:"Apurva",
    course:"BCA",
    year:1,
    isGood:true
};
console.log(obj1);
console.log(typeof obj1);
console.log(obj1["name"]); //using keys to access its values
console.log(obj1.name);
console.log(obj1["isGood"]);
console.log(obj1.year);
console.log(typeof obj1.year);
obj1.year=obj1.year+1;
console.log(obj1.year);

let x='alpha';
if (x=='alpha'){
    console.log("its alpha");
}else{
    console.log("its not alpha");
}

let num=12;

if (num>=18){
    console.log(num,"Can vote");
}else{
    console.log(num,"Can't vote")
}

let age=num;
console.log(age);
age>18?"Adult":"Not adult";

let name=prompt("Enter something: ");
console.log(name);