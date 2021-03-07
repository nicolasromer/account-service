const controller = require('./controller.js');

module.exports = (request, response) => {
    const { url, method } = request;

    // GET /health
    if (url === '/health' && method === 'GET') {
        controller.healthCheck(request, response)
        return;
    }

    // POST /account
    if (url === '/account' && method === 'POST') {
        controller.createAccount(request, response)
        return;
    }

    // GET /account/45
    const accountRegex = /^\/account\/([a-z\d-]{10,})$/;
    if (accountRegex.test(url) && method === 'GET') {
        const accountId = accountRegex.exec(url)[1];
        controller.getAccount(response, accountId)
        return;
    }

    throw new Error('Bad Request');
}
