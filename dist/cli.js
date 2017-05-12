#!/usr/bin/env node
'use strict';

var _index = require('./index');

(0, _index.run)().then(function (results) {
  results.sort().forEach(function (result) {
    console.log(result);
  });
}, function () {
  console.error('Sorry, something went wrong :(');
});
//# sourceMappingURL=cli.js.map