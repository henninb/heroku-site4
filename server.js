"use strict";

const express = require('express');
const path = require('path');
const perimeterx = require('perimeterx-node-express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const pxConfig = {
    px_app_id: process.env.PX_APP_ID,
    px_cookie_secret: process.env.PX_COOKIE_SECRET,
    px_auth_token: process.env.PX_AUTH_TOKEN,
    px_module_mode: "active_blocking",
    px_enforced_routes: ['/protected'],
    px_monitored_routes: ['/monitored'],
    px_logger_severity: 'debug',
};

perimeterx.init(pxConfig);

app.use(express.static('public'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next();
});

app.get('/protected', perimeterx.middleware, (req, res) => {
    res.sendFile(path.join(__dirname, '/public/protected.html'));
});

app.get('/monitored', perimeterx.middleware, (req, res) => {
    res.sendFile(path.join(__dirname, '/public/monitored.html'));
});

app.listen(port);
console.log('Server started at port: ' + port);
