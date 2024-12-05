function fetchdata(nos, callBack) {
    setTimeout(() => {
        console.log(nos);
        if (callBack) {
            callBack();
        }
    }, 1000);
}
fetchdata(1, () => {
    fetchdata(2, () => {
        fetchdata(3, () => {
            fetchdata(4, () => {
                fetchdata(5);
            })
        })
    })
})