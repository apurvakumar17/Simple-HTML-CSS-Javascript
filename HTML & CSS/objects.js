let obj1 = {
    namer : "Apurva Kuamr",
    age : 18,
}
console.log(obj1.namer);

let obj2 = new Object();
obj2.namer = "Ananya";
obj2.age = 12;
console.log(obj2.namer);

function Objectbana(name,ager) {
    this.namer = name;
    this.age = ager;
}
let obj3 = new Objectbana("Rekha", 20);
console.log(obj3.namer);
