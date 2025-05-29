const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/requests.log');

function logRequest(method, url) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${method} ${url}\n`;
    
    fs.promises.appendFile(logFilePath, logEntry)
        .catch(err => {
            console.error('Failed to write to log file:', err);
        });
}

module.exports = logRequest;