const { parse } = require("csv-parse")
const fs = require("fs")

const results = []

//create a readStream by using the file system module
fs.createReadStream("kepler_data.csv")
  .on("data", (data) => {
    results.push(data)
  })
  .on("error", () => {
    console.log(err)
  })
  .on("end", () => {
    console.log(results)
    console.log("done")
  })
