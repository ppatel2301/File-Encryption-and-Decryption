const express = require('express');
const tempFileManager = require('./utils/tempFileManager');
const app = express();
const PORT = 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (like HTML, CSS, JavaScript)
app.use(express.static('public'));

// Basic route
app.get('/', (req, res) => {
  res.send('File Encryption and Decryption App is running!');
  
  // Create a temporary file
  const tempFilePath = tempFileManager.createTempFile('example.tmp', 'This is a temporary file.');

});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});