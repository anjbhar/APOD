const axios = require('axios');
require('dotenv').config()

let date = new Date();
console.log(fmtDate(date.toISOString()));
async function makeGetRequest(date) {
    let res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&date=${date}`);
 
    let data = res.data;
        if (data.media_type === 'image') {
            document.getElementById('dt').innerText = data.date;
            document.getElementById('content').innerHTML = `<img src='${data.url}' '>`
            document.getElementById('t').innerText = data.title;
            document.getElementById('text').innerText = data.explanation;
        }
        else {
            document.getElementById('dt').innerText = data.date;
            document.getElementById('content').innerHTML = `<iframe width="640" height="360" src="${data.url}"></iframe>`;
            document.getElementById('t').innerText = data.title;
            document.getElementById('text').innerText = data.explanation;
        }
  }
 makeGetRequest(fmtDate(date.toISOString()));

function prevButton(){
    document.getElementById("next").disabled = false;
    date.setDate(date.getDate() - 1);
    console.log(fmtDate(date.toISOString()));
    makeGetRequest(fmtDate(date.toISOString()));
}

function nextButton() {
    let curr = new Date();
    date.setDate(date.getDate() + 1);
    if (fmtDate(date.toISOString()) === fmtDate(curr.toISOString())) {
        document.getElementById("next").disabled = true;
    }
    console.log(fmtDate(date.toISOString()));
    makeGetRequest(fmtDate(date.toISOString()));
}

function fmtDate(a) {
    return a.substring(0,10);
}
