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

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('form.html', (err, data) => {
      if (err) {
        console.log('Error')
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });

  } else if (req.method === 'POST' && req.url === '/process') {
    let body = '';
    let query = {};

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      
      const formData = new URLSearchParams(body);
      const location = formData.get('location');
      
      console.log('Input:', location);
      
      if (/^\d+$/.test(location[0])) {
        console.log('Zip')
        query = {zips:location};
      } else {
        console.log('Place')
        query = {place:location};
      }
      getLocInfo(query).then(qdata =>{
        console.log(qdata)
        res.write('<b>Place:</b> '+qdata.place)
        res.write('<br>')
        res.write('<b>Zips:</b> '+qdata.zips.join(', '))
        
        res.end('');
      })
      res.writeHead(200, { 'Content-Type': 'text/html' });
   
    });
  } else {
    // Handle 404 Not Found
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
