/**
 * requesto
 *
 * A module to hide some of the http server details
 * @param response
 * @param message
 */

const badRequest = (response, message = 'Bad Request') => {
    response.writeHead(400, { 'Content-Type': 'text/json' });
    response.end(`{"error": "${message}"}`, 'utf-8');
}

const internalError = (response, message = 'Internal Error') => {
    response.writeHead(500, { 'Content-Type': 'text/json' });
    response.end(`{"error": "${message}"}`, 'utf-8');
}

const success = (response, message = 'true') => {
    response.writeHead(200, { 'Content-Type': 'text/json' });
    response.end(`{"success": "${message}"}`, 'utf-8');
}

const getPostData = (request, response, callback) => {
    let body = '';

    request.on('data', chunk => {
        body += chunk.toString();
    });

    request.on('end', () => {
        const json = body ? JSON.parse(body) : {};

        try {
            callback(json);
        } catch (e) {
            return internalError(response, e.message);
        }

        return;
    });
}

module.exports = {
    badRequest,
    internalError,
    success,
    getPostData,
}