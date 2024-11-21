const express = require('express');
const multer = require('multer');
const { encryptFile, decryptFile } = require('./fileHandler.js'); // Assuming you have these functions defined
const tempFileManager = require('./utils/tempFileManager');
const app = express();
const PORT = 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (like HTML, CSS, JavaScript)
app.use(express.static('public'));

// Multer configuration for handling file uploads
const upload = multer({ dest: './temp/' });

// Basic route
app.post('/api/process', upload.single('file'), (req, res) => {
  const { action, key } = req.body; // Get the action (encrypt or decrypt) and key
  const filePath = req.file.path;  // Path to the uploaded file

  console.log(filePath);

  try {
    let processedFile;

    // Encrypt or Decrypt based on the action
    if (action === 'encrypt') {
      processedFile = encryptFile(filePath, key); // Assuming encryptFile function
    } else if (action === 'decrypt') {
      processedFile = decryptFile(filePath, key); // Assuming decryptFile function
    } else {
      return res.status(400).send('Invalid action. Please choose "encrypt" or "decrypt".');
    }

    // Send the processed file to the client for download
    res.download(processedFile, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file.');
      } else {
        // Clean up the temporary file after sending
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error('Error removing temporary file:', unlinkErr);
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing file.');
  }
});

// Basic route
app.get('/', (req, res) => {
  res.send('File Encryption and Decryption App is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});