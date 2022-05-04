if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("SW registere");
        console.log(registration);
    }).catch(error => {
        console.log("Sw unre");
        console.log(error);
    })
}