const http = require('http');
const route = require('./router.js');

module.exports = () => http.createServer(function (request, response) {
    console.log('request ', request.url);

    route(request, response);
});