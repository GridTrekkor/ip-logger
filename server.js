const connect = require('connect');
const http = require('http');
const app = connect();
const winston = require('winston');

winston.configure({
    transports: [
        new (winston.transports.File)({ filename: 'ip.log' })
    ]
});

// require request-ip and register it as middleware
const requestIp = require('request-ip');
app.use(requestIp.mw());

app.use(function(req, res) {
    const ip = req.clientIp;
    winston.log('info', ip);
    res.end(ip + '\n');
});

// node http server
http.createServer(app).listen(7777);
console.log('Server running on 7777');