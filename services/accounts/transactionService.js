const http = require('http');

const options = {
    host: 'transactions',
    path: '/create',
    port: '5001',
    method: 'POST'
};

const create = (accountId, amount, dataCallback) => {
    const callback = (response) => {
        let result = '';
        response.on('data', function (chunk) {
            result += chunk;
        });

        response.on('end', function () {
            dataCallback(result);
        });
    }

    const req = http.request(options, callback);
    const body = JSON.stringify({accountId, amount});

    req.write(body);
    req.end();
}

module.exports = {
    create
}