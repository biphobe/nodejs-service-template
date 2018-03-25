"use strict";

require('dotenv').config();

require('babel-register');
require('isomorphic-fetch');

require('./src/createServer').default();
