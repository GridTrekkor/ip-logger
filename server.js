const connect = require('connect');
const app = connect();
const http = require('http');
const winston = require('winston');

winston.configure({
    transports: [
        new (winston.transports.File)({
            json: false,
            name: 'ip-log',
            filename: 'ip.log',
            level: 'info',
            timestamp: function () {
                return new Date().toLocaleString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    hour12: false,
                    minute: '2-digit',
                    second: '2-digit',
                }).replace(',', '')
            },
        })
    ]
});

// require request-ip and register it as middleware
const requestIp = require('request-ip');
app.use(requestIp.mw());

// log the request
app.use(function (req, res) {
    const ip = req.clientIp;
    winston.log('info', ip);
    res.end(ip + '\n');
});

// node http server
http.createServer(app).listen(7777);
console.log('Server running on 7777');
