const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const url = "https://www.espncricinfo.com/series/ipl-2021-1249214";
const scoreCardObj = require("./scorecard");
const iplPath = path.join(__dirname, "ipl");
dirCreator(iplPath);
// venue date opponent result run balls four sixes strike rate
request(url, function (error, response, html) {
  if (error) {
    console.log(error);
  } else {
    extractLink(html);
  }
});
function extractLink(html) {
  let $ = cheerio.load(html);
  let anchorEle = $("a[data-hover='View All Fixtures']"); //a[data-hover='View All Results']
  console.log(anchorEle.length);
  let link = anchorEle.attr("href");
  // console.log(link);
  let fullLink = "https://www.espncricinfo.com" + link;
  // fullLink="https://www.espncricinfo.com/series/ipl-2021-1249214/match-results";
  console.log(fullLink);
  getAllMatchesResultsLink(fullLink); //https://www.espncricinfo.com/series/ipl-2021-1249214/match-results
}
function getAllMatchesResultsLink(url) {
  request(url, function (error, response, html) {
    if (error) {
      console.log(error);
    } else {
      getAllMatchesLink(html);
    }
  });
}
function getAllMatchesLink(html) {
  let $ = cheerio.load(html);
  let matchesResultEle = $("a[data-hover].widget-tab-link");
  console.log(matchesResultEle.length);
  let link = $(matchesResultEle[1]).attr("href");
  // console.log(link);
  let fullLink = "https://www.espncricinfo.com" + link;
  getScorcard(fullLink);
}
function getScorcard(url) {
  request(url, function (error, response, html) {
    if (error) {
      console.log(error);
    } else {
      getAllMatchesScorcardLinks(html);
    }
  });
}
function getAllMatchesScorcardLinks(html) {
  let $ = cheerio.load(html);
  let scorcardEle = $("a[data-hover='Scorecard']");
  console.log(scorcardEle.length);
  for (let i = 0; i < scorcardEle.length; i++) {
    let link = $(scorcardEle[i]).attr("href");
    let fullLink = "https://www.espncricinfo.com" + link;
    // console.log(fullLink);
    scoreCardObj.ps(fullLink);
  }
}
function dirCreator(filePath) {
  if (fs.existsSync(filePath) == false) {
    fs.mkdirSync(filePath);
  }
}
