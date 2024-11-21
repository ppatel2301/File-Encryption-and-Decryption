const fs = require('fs');
const crypto = require('crypto');

function encryptFile(filePath, key) {
    const algorithm = 'aes-256-cbc';
    const iv = crypto.randomBytes(16); // Generate a random IV
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    const input = fs.createReadStream(filePath);

    // Extract the file extension
    const extname = path.extname(filePath); // Get file extension (e.g., '.pdf')

    const outputPath = `./temp/encrypted-${Date.now()}${extname}.enc`; // Include the extension in the output file name
    const output = fs.createWriteStream(outputPath);

    // Write the IV at the beginning of the encrypted file
    output.write(iv);

    input.pipe(cipher).pipe(output);

    return new Promise((resolve, reject) => {
        output.on('finish', () => {
            resolve(outputPath); // Return path to the encrypted file
        });

        output.on('error', (err) => {
            reject(err);
        });
    });
    // const algorithm = 'aes-256-cbc';
    // const iv = crypto.randomBytes(16);
    // const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    // const input = fs.createReadStream(filePath);
    // const outputPath = `./temp/encrypted-${Date.now()}.enc`;
    // const output = fs.createWriteStream(outputPath);
  
    // // Write the IV at the beginning of the encrypted file
    // output.write(iv);

    // input.pipe(cipher).pipe(output);
  
    // return new Promise((resolve, reject) => {
    //     output.on('finish', () => {
    //         resolve(outputPath);
    //     });

    //     output.on('error', (err) => {
    //         reject(err);
    //     });
    // });

    // return outputPath; // Return the path to the encrypted file
}

function decryptFile(filePath, key) {
    // const algorithm = 'aes-256-cbc';
    // const iv = fs.readFileSync(filePath, { start: 0, end: 15 }); // Assuming IV is at the start of the file
    // const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    // const input = fs.createReadStream(filePath, { start: 16 }); // Skip the IV
    // const outputPath = `./temp/decrypted-${Date.now()}.dec`;
    // const output = fs.createWriteStream(outputPath);
  
    // input.pipe(decipher).pipe(output);
    
    // return new Promise((resolve, reject) => {
    //     output.on('finish', () => {
    //         resolve(outputPath);
    //     });

    //     output.on('error', (err) => {
    //         reject(err);
    //     });
    // });

    const algorithm = 'aes-256-cbc';
    const input = fs.createReadStream(filePath);

    // Extract the file extension
    const extname = path.extname(filePath).replace('.enc', ''); // Remove the .enc extension if it exists

    // The decrypted file name should have the same extension as the original file
    const outputPath = `./temp/decrypted-${Date.now()}${extname}`; 
    const output = fs.createWriteStream(outputPath);

    // Read the IV from the beginning of the encrypted file
    const iv = Buffer.alloc(16);
    input.read(16, (err, bytesRead, buffer) => {
        if (err) {
            console.error('Error reading IV:', err);
            return;
        }

        iv.set(buffer.slice(0, bytesRead));

        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);

        // Start piping the decrypted content
        input.pipe(decipher).pipe(output);
    });

    return new Promise((resolve, reject) => {
        output.on('finish', () => {
            resolve(outputPath); // Return path to the decrypted file
        });

        output.on('error', (err) => {
            reject(err);
        });
    });
  }
  
  module.exports = { encryptFile, decryptFile };