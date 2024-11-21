const path = require('path');
const fs = require('fs');

// Path to the temp directory
const tempDir = path.join(__dirname, '../temp');

// Ensure temp directory exists
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

module.exports = {
  createTempFile: (fileName, content) => {
    const filePath = path.join(tempDir, fileName);
    fs.writeFileSync(filePath, content);
    console.log(`Temporary file created: ${filePath}`);
    return filePath;
  },
  deleteTempFile: (filePath) => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Temporary file deleted: ${filePath}`);
    }
  },
};