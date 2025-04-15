const form = document.getElementById('userForm');
const statusDiv = document.getElementById('status');
const submitButton = document.getElementById('submitButton');

// Replace with your actual deployed Google Apps Script URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbzdUasiHAnoJI6mjBWFtEBdQTMN4gISbpYdOvr58MdfOs21l8ECIeTuMjQxH54gVepo/exec';

form.addEventListener('submit', e => {
    e.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    statusDiv.textContent = '';
    statusDiv.className = '';

    const formData = new FormData(form);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data.result === 'success') {
                statusDiv.textContent = 'Form submitted successfully!';
                statusDiv.className = 'success';
                form.reset();
            } else {
                statusDiv.textContent = `Error: ${data.message || 'Submission failed.'}`;
                statusDiv.className = 'error';
                console.error('Error details:', data.error);
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            statusDiv.textContent = 'An error occurred during submission. Please try again.';
            statusDiv.className = 'error';
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        });
});
