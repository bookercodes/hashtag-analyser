const fs = require("fs")
const Papa = require("papaparse")
const PATH = "data.csv"


const csv = fs.readFileSync(PATH, "utf-8") 
Papa.parse(csv, {
  complete: data  => {
    fs.writeFileSync("result.json", JSON.stringify(data))
  }
})

