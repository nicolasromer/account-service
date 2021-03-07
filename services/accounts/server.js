const http = require('http');
const route = require('./router.js');

module.exports = () => http.createServer(function (request, response) {
    console.log('request ', request.url);

    try {
        route(request, response);
    } catch {
        response.writeHead(400, { 'Content-Type': 'text/json' });
        response.end("{'error': 'Bad Request'}", 'utf-8');
    }
});