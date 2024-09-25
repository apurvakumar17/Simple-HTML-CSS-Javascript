let ch=Number(prompt("Guess a number between 0 to 20"));
let num=Math.floor(Math.random()*21);
let rounds=1;
while(true){
    if (ch>num){
        console.log("Enter a lesser number");
        rounds++;
        ch=Number(prompt("Guess a number between 0 to 20"));
    }else if(ch<num){
        console.log("Enter a greater number");
        rounds++;
        ch=Number(prompt("Guess a number between 0 to 20"));
    }else if(ch==num){
        console.log("Correct guess!");
        break;
    }
}
console.log(rounds," guesses");