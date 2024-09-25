function greet(){
    console.log("Hello User01");
    console.log("Welcome to JavaScript")
}

let cout=prompt("how many times i have to greet you? ");
while (cout!=0){
    greet();
    cout--;
}

let multi = (a,b) =>{
    console.log(a*b);
    return (a+b);
}

multi(2,3);
console.log(multi(2,3));