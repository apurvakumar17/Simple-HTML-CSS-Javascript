hrs = document.getElementById('hrs');
mins = document.getElementById('mins');
secs = document.getElementById('secs');
date = document.getElementById('date');

currentTime = new Date();
hrs.innerHTML = currentTime.getHours();
mins.innerHTML = currentTime.getMinutes();
secs.innerHTML = currentTime.getSeconds();

setInterval(()=>{
    currentTime = new Date();
    hrs.innerHTML = (currentTime.getHours() < 10 ? "0"+currentTime.getHours() : currentTime.getHours());
    mins.innerHTML = (currentTime.getMinutes() < 10 ? "0"+currentTime.getMinutes() : currentTime.getMinutes());
    secs.innerHTML = (currentTime.getSeconds() < 10 ? "0"+currentTime.getSeconds() : currentTime.getSeconds());
},1000);

date.innerHTML = currentTime.toDateString();
