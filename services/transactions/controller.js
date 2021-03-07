const worker = require('./worker.js');
const repository = require('./repository.js');

/**
 * Check that this service is up
 * @param request
 * @param response
 */
const healthCheck = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/json' });
    response.end(`{"success": "Just a healthful service here"}`, 'utf-8');
}

/**
 * Create a new Transaction
 * @param request
 * @param response
 */
const createTransaction = (request, response) => {
    getPostData(request,response, body => {
        const {accountId, amount} = body;

        const transaction = repository.create(accountId, amount);

        // todo: queue transaction

        worker.performTransaction({transactionId: transaction.id});

        response.writeHead(200, { 'Content-Type': 'text/json' });
        response.end(`{"success": "Transaction submitted"}`, 'utf-8');
    });
}

/**
 * Get all transactions associated with an account
 * @param response
 * @param accountId
 * @returns {string[]}
 */
const getForAccount = (response, accountId) => {
    const body = repository.getForAccount(accountId);

    // todo: transformer

    response.writeHead(200, { 'Content-Type': 'text/json' });
    response.end(body, 'utf-8');
}

const getPostData = (request, response, callback) => {
    let body = '';

    request.on('data', chunk => {
        body += chunk.toString();
    });

    request.on('end', () => {
        const json = body ? JSON.parse(body) : {};

            callback(json);

        return;
    });
}

module.exports = { healthCheck, createTransaction, getForAccount };