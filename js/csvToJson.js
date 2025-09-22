const fs = require("fs");
const csv = require("csv-parser");

function csvToJson(csvFilePath) {
  const results = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      const json = JSON.stringify(results, null, 2);
      fs.writeFile("output.json", json, (err) => {
        if (err) console.error("Error writing to file", err);
        else console.log("JSON saved to output.json");
      });
    });
}

csvToJson("./data2.csv"); // Adjust to your CSV name if needed