const cheerio = require("cheerio");
const request=require("request");
const url="https://www.espncricinfo.com/series/ipl-2021-1249214/chennai-super-kings-vs-sunrisers-hyderabad-23rd-match-1254080/full-scorecard"
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
    let contentArrRow=$(".table.bowler tbody tr");
    // let mx=-1;
    for(let i=0;i<contentArrRow.length;i++){
        let contentCol=$(contentArrRow[i]).find("td");
        let href=$(contentCol[0]).find("a").attr("href");
        let fullLink="https://www.espncricinfo.com"+href;
        console.log(fullLink);
        let bowlerName=$(contentCol[0]).text().trim();
        getBirthday(fullLink,bowlerName);
        // let wicket=$(contentCol[4]).text();
        // let hwtBowlerName;
        // if(wicket>mx){
        //     mx=wicket;
        //     hwtBowlerName=bowlerName;
        // }
        // console.log(`wicken ticken by ${bowlerName} was \t ${wicket}`);
        // console.log(`Heighest wicken ticken by ${hwtBowlerName} was \t ${mx}`);
    }
    // console.log($(contentArrCol));
    // let winningTeam=$(contentArr[1]).text();
    // console.log(contentArr.length);
    // let bowlerName=$(contentArr[0]).text();
    // let wicket=$(contentArr[4]).text();

}
function getBirthday(href,name){
    request(href,cb);
    function cb(error,response,html){
        if(error){
            console.log(("error",error));
        }
        else{
            extractBirthday(html,name);
        }
    }
    function extractBirthday(html,name){
       let $= cheerio.load(html);
        let details = $(".player_overview-grid h5");
        let birthay=$(details[1]).text().trim();
        console.log(`${name} birthday \t\t ${birthay}`);
    }
}