const fs = require("fs");
const { parse } = require("csv-parse");

const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://alyssabawgus:test1@cs120.fjcamx7.mongodb.net/?retryWrites=true&w=majority&appName=CS120";
 
fs.createReadStream("./zip.csv")
  .pipe(parse({ delimiter: ",", from_line: 0 }))
  .on("data", function (row) {
    console.log(row);
  })

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .send('Hello server is running')
//     .end();
// });
 
// // Start the server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
//   console.log('Press Ctrl+C to quit.');
// });


