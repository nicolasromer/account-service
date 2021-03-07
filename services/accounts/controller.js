const repository = require('./repository.js');


const getPostData = (request, callback) => {
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

/**
 * Check that this service is up
 * @param request
 * @param response
 */
const healthCheck = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/json' });
    response.end("{'success': 'true'}", 'utf-8');
}

/**
 * Create a payments account for a customer
 * @param request
 * @param response
 */
const createAccount = (request, response) => {
    getPostData(request, (body) => {

        if (!body.customerId) {
            return badRequest(response, "customerId is required in the request");
        }

        console.log('creating account for customer: ', body);

        const account = repository.create(body.customerId);
        console.log(account);

        // requestTransaction(account.id, body.initialCredit);

        return success(response, 'created account for customer')
    })

}

const badRequest = (response, message) => {
    response.writeHead(400, { 'Content-Type': 'text/json' });
    response.end(`{"error": "${message}"}`, 'utf-8');
}

const success = (response, message) => {
    response.writeHead(200, { 'Content-Type': 'text/json' });
    response.end(`{"error": "${message}"}`, 'utf-8');
}

module.exports = { createAccount, healthCheck };