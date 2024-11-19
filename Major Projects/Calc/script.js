let input = document.getElementById('inputbox');
let expression = "";

function exp(value) {
    expression += value;
    input.value = expression;
}

function result() {
    try {
        expression = eval(expression).toString(); 
        input.value = expression;
    } catch (error) {
        input.value = "Error";
        expression = "";
    }
}

function allclear() {
    input.value = "";
    expression = "";
}

function del() {
    expression = expression.slice(0, -1); 
    input.value = expression; 
}
