const cheerio = require("cheerio");
const request=require("request");
request("https://www.espncricinfo.com/series/ipl-2021-1249214/chennai-super-kings-vs-sunrisers-hyderabad-23rd-match-1254080/full-scorecard",cb);
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
    let contentArr=$(".match-header .teams .name");
    let winningTeam=$(contentArr[1]).text();
    console.log(`Winning Team is ${winningTeam}`);
}