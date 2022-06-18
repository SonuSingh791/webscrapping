const cheerio=require("cheerio");
const fs=require("fs");
const path=require("path");
const request = require("request");
const pdfkit=require("pdfkit");
function requestCodePage(url,topic,repoName){
    request(url,function(error,response,html){
        if(error){
            console.log(error);
        }
        else{
            getIssuesLinks(html,topic,repoName);
        }
    });
}
function getIssuesLinks(html,topic,repoName){
    let $=cheerio.load(html);
    let issuesLink=$("#issues-tab");
    let href=$(issuesLink).attr("href");
    // console.log(href);
    let fullLinks="https://github.com"+href;
    requestIssuesPage(fullLinks,topic,repoName);
}
            // https://github.com/arendst/Tasmota/issues/12849
function requestIssuesPage(url,topic,repoName){
    request(url,function(error,response,html){
        if(error){
            console.log(error);
        }
        else{
            getIssuses(html,topic,repoName);
        }
    });
}
function getIssuses(html,topic,repoName){
    let $=cheerio.load(html);  //.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title
    let issuseLinkArr=$(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let arr=[];
    console.log(issuseLinkArr.length);
    for(let i=0;i<issuseLinkArr.length;i++){
        let link=$(issuseLinkArr[i]).attr("href");
        // console.log(link);
        arr.push(link);
    }
    console.log(topic,"   ",arr);
    let folderPath=path.join(__dirname,topic);
    dirCreator(folderPath);
    let filePath=path.join(folderPath,repoName+".pdf");
    let text=JSON.stringify(arr);
    let pdfDoc=new pdfkit();
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(text);
    pdfDoc.end();
}
function dirCreator(folderPath) {
    if(fs.existsSync(folderPath)==false){
        fs.mkdirSync(folderPath);
    }
}
module.exports=requestCodePage;