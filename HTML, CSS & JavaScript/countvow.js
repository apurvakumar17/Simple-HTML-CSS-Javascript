function countvow(str){
    let con=0;
    for (let i of str.toLowerCase()){
        if (i=="a"||i=="e"||i=="i"||i=="o"||i=="u"){
            con++;
        }
    }
    return con;
}

let string=prompt("Enter a string: ");

console.log("There are " ,countvow(string)," vowels in this string. ")

//-----------------------------------------------------------------------------------//
let countvow2 = (str2) =>{
    let con=0;
    for (let i of str2.toLowerCase()){
        if (i=="a"||i=="e"||i=="i"||i=="o"||i=="u"){
            con++;
        }
    }
    return con;
}

console.log("There are " ,countvow2(string)," vowels in this string. ")