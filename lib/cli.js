#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var Buda = require('./index');
var util = require('./utils');

if (argv.version || argv.v) {
  console.log(util.version());
} else if (argv.help || argv.h) {
  console.log(util.usage());
} else if (argv.dataset) {
  var params = {};
  if (argv.batch) params.pageSize = argv.batch;

  var bs = new Buda(params);
  bs.download(argv.dataset)
    .on('data', function (d) { console.log('%j', d) });
} else {
  console.log(util.usage());
}
