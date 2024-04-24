const fs = require("fs");
const { parse } = require("csv-parse");
const { finished } = require('node:stream/promises');
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://alyssabawgus:test1@cs120.fjcamx7.mongodb.net/?retryWrites=true&w=majority&appName=CS120";

async function checkDBandLog(row) {  
  const client = new MongoClient(url);
    try {
      var dbo = client.db("PS34NodeJS");
      var places = dbo.collection('places');
      const query = {place:row[0]};

      if ((await places.countDocuments(query)) === 0 ){     
        console.log('INSERT '+row[0])   
        await places.insertOne(
          {place:row[0],
          zips:[row[1]]}
        )
      } else {
        console.log('UPDATE '+row[0])   
        await places.updateOne(
          {"place":row[0]},
          { $push: { zips:row[1]}}
        )
      }
    } finally {
      await client.close()
    }
};

async function loadData() {
  const data = [];
  await finished(fs.createReadStream("zips.csv")
    .pipe(parse({ delimiter: ",", from_line: 1 }))
    .on("data", (row) => {
      data.push(row)
    })
    )
    return data
}

async function rec(i, data) {
  checkDBandLog(data[i]).then(res => {
    if (i<data.length-1){
      rec(i+1, data)
    }}
  )}

loadData()
.then(data => {
  console.log(data)
  try{
    rec(0, data)
  } catch (err) {

  }
})