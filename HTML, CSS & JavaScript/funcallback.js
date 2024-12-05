function sum(a, b) {
    console.log(a + b);
}
function sub(a, b) {
    console.log(a-b);
}
function calculator(x, y, sumCallback) {
    sumCallback(x, y);
}

calculator(6, 17, sum);
calculator(6, 17, sub);