const server = require('./server.js');

const port = 5000;
const host = '0.0.0.0';

server().listen(port, host, error => {
    if (!error) {
        console.log(`Server running at ${host}:${port}`);
    }
});