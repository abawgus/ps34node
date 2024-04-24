const http = require('http');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://alyssabawgus:test1@cs120.fjcamx7.mongodb.net/?retryWrites=true&w=majority&appName=CS120";

async function getLocInfo(query) {
  const client = new MongoClient(url);
  try {
      var dbo = client.db("PS34NodeJS");
      var places = dbo.collection('places');
      var qdata = await places.findOne(query, {projection: {_id: 0, place:1, zips:1}})
      return qdata
  } finally {
      await client.close()
  }      
}

const app = http.createServer((req, res) => {
  if (req.url === '/') {    
    var html = `
    <!DOCTYPE html>
      <html>
      <head>
      </head>
      <body>
        <h1>Problem set 3-4 </h1>
        <h2>Node JS Web App #2</h2>

        <form action="/process" method="post">
          <label for="location">Place or Zip:</label>
          <input type="text" id="location" name="location" required><br><br>    
          </a><input type="submit" value="Submit">
        </form>
      </body>
      </html>    
    `;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html)
  } else if (req.method === 'POST' && req.url === '/process') {
      let body = '';
      let query = {};

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
      
        const formData = new URLSearchParams(body);
        const location = formData.get('location');
        
        if (/^\d+$/.test(location[0])) {
          console.log('Zip')
          query = {zips:location};
        } else {
          console.log('Place')
          query = {place:location};
        }

        getLocInfo(query).then(qdata =>{
          console.log(qdata)
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write('<b>Place:</b> '+qdata.place)
          res.write('<br>')
          res.write('<b>Zips:</b> '+qdata.zips.join(', '))
          
          res.end('');
        })
        
        // res.write(location);
        // res.end('End Process Screen');
      });
    }
  else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
  }
})

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});