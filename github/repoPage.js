const cheerio=require("cheerio");
const fs=require("fs");
const path=require("path");
const request = require("request");
const requestCodePage=require("./issuesPage");
function requestRepoPage(url,topic){
    request(url,function(error,response,html){
        if(error){
            console.log(error);
        }
        else{
            getCodeLink(html,topic);
        }
    });
}
function getCodeLink(html,topic){
    let $=cheerio.load(html);
    let codeLinkArr=$(".d-flex.flex-auto a.text-bold");
    // console.log(codeLinkArr.length);
    for(let i=0;i<8;i++){
        let href=$(codeLinkArr[i]).attr("href");
        // console.log(topic);
        // console.log(href);
        let fullLinks="https://github.com"+href;
        let repoName = href.split("/").pop();
        requestCodePage(fullLinks,topic,repoName);
    }
    // console.log("`````````````````````````");
}
module.exports=requestRepoPage;