const URL = "https://cat-fact.herokuapp.com/facts";

async function getfact() {
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data[4].text);
}

getfact();