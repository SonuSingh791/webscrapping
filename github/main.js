const cheerio=require("cheerio");
const fs=require("fs");
const path=require("path");
const request = require("request");
const requestRepoPage=require("./repoPage");
const url="https://github.com/topics";
request(url,function(error,response,html){
    if(error){
        console.log(error);
    }
    else{
        getTopicLinks(html);
    }
});

function getTopicLinks(html){
    let $ =cheerio.load(html);
    let linkArr=$(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i=0;i<linkArr.length;i++){
        let href=$(linkArr[i]).attr("href");
        // console.log(href);
        let topic = href.split("/").pop();
        // console.log(topic);
        let fullLinks="https://github.com"+href;
        // console.log(fullLinks);
        requestRepoPage(fullLinks,topic);
    }
}

// function requestTopicPage(url){
//     request(url,function(error,response,html){
//         if(error){
//             console.log(error);
//         }
//         else{
//             getCodeLink(html);
//         }
//     });
// }
// function getCodeLink(html){
//     let $=cheerio.load(html);
//     let codeLinkArr=$(".d-flex.flex-auto a.text-bold");
//     // console.log(codeLinkArr.length);
//     for(let i=0;i<8;i++){
//         let href=$(codeLinkArr).attr("href");
//         // console.log(href);
//         let fullLinks="https://github.com"+href;
//         requestCodePage(fullLinks);
//     }
// }

// function requestCodePage(url){
//     request(url,function(error,response,html){
//         if(error){
//             console.log(error);
//         }
//         else{
//             getIssuesLinks(html);
//         }
//     });
// }

// function getIssuesLinks(html){
//     let $=cheerio.load(html);
//     let issuesLink=$("#issues-tab");
//     let href=$(issuesLink).attr("href");
//     // console.log(href);
//     let fullLinks="https://github.com"+href;
//     requestIssuesPage(fullLinks);
// }

// function requestIssuesPage(url){
//     request(url,function(error,response,html){
//         if(error){
//             console.log(error);
//         }
//         else{

//         }
//     });
// }