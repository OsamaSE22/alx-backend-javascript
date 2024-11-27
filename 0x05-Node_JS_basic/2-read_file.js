const fs = require('fs');  // Required to interact with the filesystem

function countStudents(path) {
  try {
    // Read the file synchronously
    const data = fs.readFileSync(path, 'utf-8');

    // Split the file content into lines
    const lines = data.split('\n');

    // Remove empty lines (i.e. trailing newlines or blank lines)
    const students = lines.filter(line => line.trim() !== '');

    // If there are no students (empty file or only empty lines)
    if (students.length === 0) {
      console.log('No students found');
      return;
    }

    // Get the headers from the first line
    const headers = students[0].split(',');

    // Create an object to store students by field
    const studentData = {};

    // Loop through each student (starting from line 1 as line 0 is the header)
    students.forEach(studentLine => {
      const studentDetails = studentLine.split(',');

      if (studentDetails.length === headers.length) {
        const field = studentDetails[headers.indexOf('field')]; // Assuming 'field' is one of the columns
        const firstName = studentDetails[headers.indexOf('firstname')];

        if (!studentData[field]) {
          studentData[field] = [];
        }

        studentData[field].push(firstName);
      }
    });

    // Print the total number of students
    console.log(`Number of students: ${students.length - 1}`);

    // For each field, print the number of students and the list of their first names
    Object.keys(studentData).forEach(field => {
      const names = studentData[field];
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    });

  } catch (error) {
    // If the file can't be read, throw an error
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;  // Export the function so it can be used in other files

