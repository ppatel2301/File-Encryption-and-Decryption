document.addEventListener("DOMContentLoaded", () => {

    document.getElementById('encryptBtn').addEventListener('click', () => processFile('encrypt'));
    document.getElementById('decryptBtn').addEventListener('click', () => processFile('decrypt'));

    async function processFile(action) {
        const fileInput = document.getElementById('fileInput');
        const keyInput = document.getElementById('keyInput');
        const output = document.getElementById('output');
    
        if (!fileInput.files.length) {
            alert('Please upload a file.');
            return;
        }
        
        // Get the file from the input
        const file = fileInput.files[0];
        const key = keyInput.value || 'defaultKey12345678901234567890123456'; // This is auto or user entered key is being used
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('key', key);
        formData.append('action', action);

        // Update the user that the encryption/decryption is working
        output.innerHTML = 'Processing...';

        // Now will try to encrypt or decrypt this file given
        try{
            const res = await fetch('http://localhost:3000/api/process', {
               method: 'POST',
               body: formData 
            });
            
            const blob = await res.blob();

            // Create a download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${action === 'encrypt' ? 'encrypted' : 'decrypted'}-${file.name}`;
            link.click();

            output.innerHTML = `File ${action === 'encrypt' ? 'encrypted' : 'decrypted'} successfully!`;
        }catch (error) {
            output.innerHTML = 'An error occurred during processing.';
        }
    }
});