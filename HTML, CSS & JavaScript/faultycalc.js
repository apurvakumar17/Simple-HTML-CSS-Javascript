console.log("Welcome to the 10% faulty calculator:");
let fault=0;
let ch="y";
while(ch=="y"){
    let num1=Number(prompt("Enter first number: "));
    let num2=Number(prompt("Enter second number: "));
    console.log("Enter: 1 for Addition");
    console.log("Enter: 2 for Subtraction");
    console.log("Enter: 3 for Multiplication");
    console.log("Enter: 4 for Division");
    let op=Number(prompt("Enter your choice (1/2/3/4): "));
    if (Math.random()<=0.1){
        fault=1;
    }else{
        fault=0;
    }
    if (op==1){
        if (fault==1){
            console.log(num1-num2);
            console.log("With fault !")
        } else{
            console.log(num1+num2);
        }
    } else if (op==2){
        if (fault==1){
            console.log(num1/num2);
            console.log("With fault !")
        } else{
            console.log(num1-num2);
        }
    } else if (op==3){
        if (fault==1){
            console.log(num1+num2);
            console.log("With fault !")
        } else{
            console.log(num1*num2);
        }
    } else if (op==4){
        if (fault==1){
            console.log(num1**num2);
            console.log("With fault !")
        } else{
            console.log(num1/num2);
        }
    } else{
        console.log("Invalid Command !")
    }
    ch=String(prompt("You want to calculate one more time ? (y/n)"))
}
console.log("Calculater closed !")