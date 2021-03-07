const controller = require('./controller.js');

module.exports = (request, response) => {
    const { url, method } = request;

    if (url === '/health' && method === 'GET') {
        controller.healthCheck(request, response)
        return;
    }

    if (url === '/create' && method === 'POST') {
        controller.createTransaction(request, response)
        return;
    }

    response.writeHead(400, { 'Content-Type': 'text/json' });
    response.end(`{"error": "No such endpoint"}`, 'utf-8');
}
