const http = require('http');

// Create an HTTP server
const app = http.createServer((req, res) => {
  // Set the response status code and content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // Send the response body
  res.end('Hello Holberton School!\n');
});

// Make the server listen on port 1245
app.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});

// Export the app to be used elsewhere
module.exports = app;

