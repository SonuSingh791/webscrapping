const request = require('request');
const cheerio=require("cheerio");
const chalk=require("chalk");
console.log("befor");
request('https://www.worldometers.info/coronavirus/', cb);
console.log("after");
function cb(error, response, html) {
    console.error('error:', error); // Print the error if one occurred
    if(error){
        console.log("error",error);
    }
    else{
        handelhtml(html);
    }
  }
  function handelhtml(html){
    let selTool=cheerio.load(html);
    let contentArr=selTool("#maincounter-wrap span");
    // for(let i=0;i<contentArr.length;i++){
    //     let data=selTool(contentArr[i]).text();
    //     console.log("Data "+data);
    // }
    let totalCases=selTool(contentArr[0]).text();
    let death=selTool(contentArr[1]).text();
    let recovered=selTool(contentArr[2]).text();
    console.log(chalk.gray("totalCases "+totalCases));
    console.log(chalk.red("deaths "+death));
    console.log(chalk.green("recovered "+recovered));
  }