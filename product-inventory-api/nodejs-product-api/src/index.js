const http = require('http');
const url = require('url');
const fs = require('fs').promises;
const productsRoute = require('./routes/productsRoute');
const rateLimit = require('./utils/rateLimiter');
const logRequest = require('./utils/logger');

const PORT = process.env.PORT || 3000;

const requestListener = async (req, res) => {
    logRequest(req);
    rateLimit(req, res);

    const parsedUrl = url.parse(req.url, true);
    req.query = parsedUrl.query;

    if (req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
        productsRoute(req, res);
    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Method Not Allowed' }));
    }
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});