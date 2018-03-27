"use strict";

if (process.env.NODE_ENV !== "production") {
    require('babel-register');
}

require('dotenv').config();
require('isomorphic-fetch');

require('./src/createServer').default();
