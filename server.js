// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .send('Hello server is running')
//     .end();
// });

const http = require('http');
const fs = require('fs');

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
  } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
  }
})

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});