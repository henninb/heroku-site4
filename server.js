"use strict";

const express = require('express');
const path = require('path');
const perimeterx = require('perimeterx-node-express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

/* PerimeterX Bot Defender Config */

console.log(process.env.PX_APP_ID)
const pxConfig = {
    px_app_id: process.env.PX_APP_ID,
    px_cookie_secret: process.env.PX_COOKIE_SECRET,
    px_auth_token: PX_AUTH_TOKEN,
    px_module_mode: "active_blocking",
    px_enforced_routes: ['/protected'],
    px_monitored_routes: ['/monitored'],
    // px_additional_activity_handler: function(pxCtx, config) {
    //     console.log(pxCtx);
    // },
    px_logger_severity: 'debug',
    // px_bypass_monitor_header: "x-px-block",
    // px_blocking_score: 0
};
/* Initialize Defender */
perimeterx.init(pxConfig);

app.use(express.static('public'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next();
});

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, '/index.html'));
// });

app.get('/protected', perimeterx.middleware, (req, res) => {
    res.sendFile(path.join(__dirname, '/public/protected.html'));
});

app.get('/monitored', perimeterx.middleware, (req, res) => {
    res.sendFile(path.join(__dirname, '/public/monitored.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
