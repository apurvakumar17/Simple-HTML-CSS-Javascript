function createCard(title,cname,views,monthsOld,duration,thumbnail){
    
    let strviews = "";

    if (views>=1000&&views<1000000){
        strviews=Math.floor(views/1000)+"K views";
    }else if (views>=1000000){
        strviews = Math.floor(views/1000000)+"M views";
    }else{
        strviews=views+" views";
    }

    document.body.children[0].children[1].querySelector("#title1").insertAdjacentText('afterbegin',title);
    document.body.children[0].children[1].querySelector("#subtitle1").insertAdjacentText('afterbegin',cname+" • "+strviews+" "+" • "+monthsOld+" months ago");
    document.body.children[0].children[1].querySelector("#durationbox").insertAdjacentText('afterbegin',duration);
    document.head.insertAdjacentHTML('afterbegin',"<style>#thumbn2{background-image:url('"+thumbnail+"'); }</style>");

}


let title=prompt("Enter the Video Title");
let cname=prompt("Enter the Channel Name");
let views=prompt("Enter views");
let monthsOld=prompt("Enter no. of Months");
let duration=prompt("Enter the duration: ");
let thumbnail=prompt("Paste the link to thumbnail image")
createCard(title,cname,views,monthsOld,duration,thumbnail)

// createCard("Introduction to Backend | Sigma Web Dev video #2", "CodeWithHarry", 560000, 7, "31:22", "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACwWOixJVrKLFindK92kYMgTcQbw")