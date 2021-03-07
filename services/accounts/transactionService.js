const http = require('http');

const host = 'transactions';
const port = '5001';

const create = (accountId, amount, dataCallback) => {
    const options = {
        host,
        port,
        path: '/create',
        method: 'POST'
    };

    const callback = getResponseData(dataCallback)
    const req = http.request(options, callback);
    const body = JSON.stringify({accountId, amount});

    req.write(body);
    req.end();
}

const getForAccount = (accountId, dataCallback) => {
    const options = {
        host,
        port,
        path: `/for-account/${accountId}`,
        method: 'GET'
    };

    const callback = getResponseData(dataCallback)

    const req = http.request(options, callback);
    req.on('error', error => {
        console.log('Error fetching transactions: ', error);
    })
    req.end();
}

const getResponseData = callback => response => {
    let result = '';
    response.on('data', function (chunk) {
        result += chunk;
    });

    response.on('end', function () {
        callback(result);
    });
}

module.exports = {
    create,
    getForAccount,
}