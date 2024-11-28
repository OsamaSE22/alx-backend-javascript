const http = require('http');
const fs = require('fs');

const countStudents = (database) => {
  return new Promise((resolve, reject) => {
    fs.readFile(database, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.trim().split('\n').slice(1); // Skip the header line
        const students = {};
        lines.forEach((line) => {
          const [name, , , field] = line.split(',');
          if (!students[field]) {
            students[field] = [];
          }
          students[field].push(name);
        });
        resolve(students);
      }
    });
  });
};

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    console.log('Received request for /');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    console.log('Received request for /students');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    countStudents(process.argv[2])
      .then((students) => {
        let response = 'This is the list of our students\n';
        response += `Number of students: ${Object.values(students).flat().length}\n`;
        for (const [field, names] of Object.entries(students)) {
          response += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
        }
        res.end(response);
      })
      .catch((err) => {
        res.end(`${err.message}\n`);
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(1245, () => {
  console.log('Server running on port 1245');
});

module.exports = app;

