const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error("Cannot load the database"));
      } else {
        const lines = data.split('\n');
        const studentsByField = {};

        lines.forEach((line, index) => {
          // Skip empty lines or the header (index 0)
          if (line.trim() === '' || index === 0) return;

          const [firstName, field] = line.split(',');

          // Skip students with missing information
          if (!firstName || !field) return;

          if (!studentsByField[field]) {
            studentsByField[field] = [];
          }
          studentsByField[field].push(firstName);
        });

        const totalStudents = Object.values(studentsByField).reduce((sum, students) => sum + students.length, 0);
        console.log(`Number of students: ${totalStudents}`);

        Object.keys(studentsByField).forEach(field => {
          console.log(`Number of students in ${field}: ${studentsByField[field].length}. List: ${studentsByField[field].join(', ')}`);
        });

        resolve();
      }
    });
  });
}

module.exports = countStudents;

