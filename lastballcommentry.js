const url="https://www.espncricinfo.com/series/ipl-2021-1249214/chennai-super-kings-vs-sunrisers-hyderabad-23rd-match-1254080/ball-by-ball-commentary";
const cheerio = require("cheerio");
const request=require("request");
request(url,cb);
function cb(error,response,html){
    if(error){
        console.log(("error",error));
    }
    else{
        extractHtml(html);
    }
}
function extractHtml(html){
    let $=cheerio.load(html);
    let contentArr=$(".match-comment .col-14.col-md-15.col-lg-14 .match-comment-long-text");
    let lastBallCommentry=$(contentArr[0]).text();
    // console.log(contentArr.length);
    console.log(`Last Ball Commentry : ${lastBallCommentry}`);
}
