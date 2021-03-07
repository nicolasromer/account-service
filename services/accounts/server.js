const http = require('http');
const route = require('./router.js');
const requesto = require('./requesto.js')

module.exports = () => http.createServer(function (request, response) {
    console.log('request ', request.url);

    try {
        route(request, response);
    } catch {
        requesto.badRequest(response);
    }
});