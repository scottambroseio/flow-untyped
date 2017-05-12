#!/usr/bin/env node
// @flow

'use strict';

import { run } from './index';

run().then(results => {
	results.sort().forEach((result) => {
		console.log(result);
	});
}, () => {
	console.error('Sorry, something went wrong :(');
});
