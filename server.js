// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .send('Hello server is running')
//     .end();
// });

const http = require('http');
const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('test')
})

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});