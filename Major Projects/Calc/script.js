let input = document.getElementById('inputbox');
let expression ="";
function exp(value) {
    expression = expression + value;
    input.value = expression;
}
function result() {
    input.value = eval(expression);
}
function allclear() {
    input.value = "";
    expression = "";
}
function del() {
    expression = expression.slice(0,-1);
    input.value = expression;
}