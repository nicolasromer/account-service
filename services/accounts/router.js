const controller = require('./controller.js');

module.exports = (request, response) => {
    const { url, method } = request;

    if (url === '/health' && method === 'GET') {
        controller.healthCheck(request, response)
        return;
    }

    if (url === '/account' && method === 'POST') {
        controller.createAccount(request, response)
        return;
    }

    throw new Error('Bad Request');
}
