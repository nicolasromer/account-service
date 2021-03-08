const http = require('http');
const path = require('path');
const fs = require('fs');

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
};

module.exports = () => http.createServer(function (request, response) {

    console.log('request ', request.url);

    // move to router
    if (request.url === '/create' && request.method === 'POST') {
        // Post details to the account service
    }

    if (request.url === '/{customerId}/account' && request.method === 'GET') {
        // Stitch together the data needed for the frontend
        // customerService.get(customerId)
        // account = accountService.getForCustomer(customerId)
        // transactionService.getForAccount(account.id)
    }


    let filePath = '.' + request.url;

    if (filePath === './') {
        filePath = './index.html';
    }

    const extension = String(path.extname(filePath)).toLowerCase();

    const contentType = mimeTypes[extension];

    fs.readFile(filePath, function(error, content) {
        if (!error) {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');

            return;
        }

        if(error.code === 'ENOENT') {
            fs.readFile('./404.html', function(error, content) {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end(content, 'utf-8');
            });
        } else {
            response.writeHead(500);
            response.end('Check your computer for smoke or fire: '+error.code+' ..\n');
        }
    });
});