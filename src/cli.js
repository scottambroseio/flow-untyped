#!/usr/bin/env node
// @flow

// $FlowFixMe
import 'regenerator-runtime/runtime';

import { run } from './index';

run().then(
  (results) => {
    results.sort().forEach((result) => {
      console.log(result);
    });
  },
  () => {
    console.error('Sorry, something went wrong :(');
  },
);
