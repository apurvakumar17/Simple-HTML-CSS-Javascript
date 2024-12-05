const getPromise = () => {
    return new Promise((resolve, reject) => {
        console.log("I am a promise");
        let anum = Math.random()
        anum = (10 * anum);
        anum = Math.floor(anum);
        if (anum % 2 == 0) {
            resolve("Success");
        } else {
            reject("error");
        }
        
    });
};

let promiseResult = getPromise();
promiseResult.then(() => {
    console.log("Promise fullfilled!")
});
promiseResult.catch(() => {
    console.log("Unable to fullfill the promise!")
})