#!/usr/bin/env node

'use strict';

var _index = require('./index');

(0, _index.run)().then(function (summary) {
	console.log('\n');
	console.log(summary);
	console.log('\n');
});