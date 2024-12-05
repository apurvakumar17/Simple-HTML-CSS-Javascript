setTimeout(() => {
    console.log("hello world");
}, 11000);

for(let i = 0; i <= 10; i++) {
    setTimeout(() => {
        console.log(i);
    }, i * 1000);
}


const twelve = (x) => {
    console.log("hello world 12", x);
};
const thirteen = () => {
    console.log("hello world 13")
}
// Correct usage of setTimeout
setTimeout(() => twelve(" apurva"), 12000);
setTimeout(thirteen, 13000);