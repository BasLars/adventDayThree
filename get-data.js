const fetch = require("node-fetch");
const fs = require("fs");

function getData(day) {
  const url = `https://adventofcode.com/2018/day/${day}/input`;
  const cookie =
    "53616c7465645f5f71f3ee9595839d5edfd7ae18e1774e08c92108bbf5a45d7d366853dccb5f79764f0b7a075398a380";

  if (fs.existsSync(`./${day}.txt`)) {
    console.log("Read from file");
    return new Promise((resolve, reject) =>
      fs.readFile(`./${day}.txt`, "utf-8", (err, data) => {
        err ? reject(err) : resolve(data);
      })
    );
  } else {
    console.log("Read from url");

    return fetch(url, {
      headers: {
        cookie: `session=${cookie}`
      }
    })
      .then(response => response.text())
      .then(data => {
        saveDateToFile(data, `./${day}.txt`);
        return data;
      });
  }
}

function saveDateToFile(data, filename) {
  fs.writeFileSync(filename, data, err => {
    if (err) {
      console.log(err);
    }
    console.log("The file was saved.");
  });
}

module.exports = getData;
