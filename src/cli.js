#!/usr/bin/env node
// @flow

'use strict';

import { run } from './index';

run().then(summary => {
	console.log('\n');
	console.log(summary);
	console.log('\n');
});
