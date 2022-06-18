const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
// venue date opponent result run balls four sixes strike rate
function proccesScorecard(url) {
  request(url, function (error, response, html) {
    if (error) {
      console.log(error);
    } else {
      extractMatchDetails(html);
    }
  });
}
function extractMatchDetails(html) {
  let $ = cheerio.load(html);
  let description = $(".event .description");
  // description = $(description).text().trim();
  let descriptionArr = description.text().split(",");
  let matchNo = descriptionArr[0].trim();
  let venue = descriptionArr[1].trim();
  let date = descriptionArr[2].trim();
  let resultDetails = $(".event .status-text");
  let result = $(resultDetails).text().trim();
  let innings = $(".card.content-block.match-scorecard-table>.Collapsible");
  let htmlStr = "";
  for (let i = 0; i < innings.length; i++) {
    // htmlStr += $(innings[i]).html();
    let inningsDetail = $(innings[i]).find("h5").text();
    let teamNameArr = inningsDetail.split("INNINGS");
    let teamName = teamNameArr[0].trim();
    let opponentTeamIdx = i ^ 1;
    let opponentTeamName = $(innings[opponentTeamIdx]).find("h5").text();
    let opponentTeamNameArr = opponentTeamName.split("INNINGS");
    opponentTeamName = opponentTeamNameArr[0].trim();
    console.log(
      `MatchNo :${matchNo}  venue :${venue} date :${date} teamName :${teamName} opponentTeamName :${opponentTeamName} result :${result}`
    );
    let currInning = innings[i];
    let allRows = $(currInning).find(".table.batsman tbody tr");
    for (let j = 0; j < allRows.length; j++) {
      let allCols = $(allRows[j]).find("td");
      let isWorthyCol = $(allCols[0]).hasClass("batsman-cell");
      if (isWorthyCol) {
        // console.log(allCols.text());
        let playerName = $(allCols[0]).text().trim();
        let runs = $(allCols[2]).text().trim();
        let balls = $(allCols[3]).text().trim();
        let fours = $(allCols[5]).text().trim();
        let sixes = $(allCols[6]).text().trim();
        let sr = $(allCols[7]).text().trim();
        console.log(
          `${playerName}  ${runs}  ${balls}  ${fours}  ${sixes}  ${sr}`
        );
        proccesPlayer(
          matchNo,
          teamName,
          opponentTeamName,
          playerName,
          runs,
          balls,
          fours,
          sixes,
          sr,
          venue,
          date,
          result
        );
      }
    }
  }
}
module.exports = {
  ps: proccesScorecard,
};
function proccesPlayer(
  matchNo,
  teamName,
  opponentTeamName,
  playerName,
  runs,
  balls,
  fours,
  sixes,
  sr,
  venue,
  date,
  result
) {
  let teamPath = path.join(__dirname, "ipl", teamName);
  dirCreator(teamPath);
  let filePath = path.join(teamPath, playerName + ".xlsx");
  let content = excelReader(filePath, playerName);
  let playerObj = {
    // "teamName":"teamName"  if keys and values are same then write simply one of them
    matchNo,
    teamName,
    opponentTeamName,
    playerName,
    runs,
    balls,
    fours,
    sixes,
    sr,
    venue,
    date,
    result,
  };
  content.push(playerObj);
  excelWriter(filePath, content, playerName);
}
function dirCreator(filePath) {
  if (fs.existsSync(filePath) == false) {
    fs.mkdirSync(filePath);
  }
}
function excelWriter(filePath, json, sheetName) {
  let newWB = xlsx.utils.book_new();
  let newWS = xlsx.utils.json_to_sheet(json);
  xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
  xlsx.writeFile(newWB, filePath);
}
function excelReader(filePath, sheetName) {
  if (fs.existsSync(filePath) == false) {
    return [];
  }
  let wb = xlsx.readFile(filePath);
  let excelData = wb.Sheets[sheetName];
  let ans = xlsx.utils.sheet_to_json(excelData);
  return ans;
}
