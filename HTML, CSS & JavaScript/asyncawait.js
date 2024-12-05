function api() {
    return new Promise ((resolve,reject) => {
        setTimeout(() =>  {
            console.log("Today is Sunny");
            resolve("Got Weather");
        },2000);
    });
}

async function getweather() {
    await api();
    await api();
}
getweather();