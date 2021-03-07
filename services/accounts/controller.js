
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

        console.log(body);

        response.writeHead(200, { 'Content-Type': 'text/json' });
        response.end('{"cool": "yes"}', 'utf-8');
    })

}

module.exports = { createAccount, healthCheck };