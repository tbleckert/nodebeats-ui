'use strict';

const http   = require('http');
const fs     = require('fs');
const path   = require('path');
const config = require('./config.json');

const server = http.createServer(function (request, response) {
    let js = 'index.js';

    if (process.env.NODE_ENV === 'production') {
        js = 'index.' + config.assetVersion + '.min.js';
    }

    if (request.url === '/') {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write('<!DOCTYPE html><script src="' + js + '"></script>');
        response.end();
    } else if (request.url === '/' + js) {
        fs.readFile(path.join(__dirname, 'public/' + js), function (error, file) {
            response.writeHead(200, {"Content-Type": "text/javascript"});
            response.write(file);
            response.end();
        });
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"})
        response.write('404 Not found');
        response.end();
    }
});

server.listen(config.port, function () {
    console.log('app running on port %s', config.port);
});
