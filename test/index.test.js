'use strict'

var Buda = require('../lib/index');
var concat = require('concat-stream');
var fs = require('fs');
var nock = require('nock');
var test = require('tape');
var utils = require('../lib/utils');

var url = 'http://api.datos.gob.mx';

nock(url)
  .get(/profeco\.precios/)
  .query(function (query) { return query.page == 1 })
  .reply(200, fs.readFileSync(`${__dirname}/fixtures/page01.json`));
nock(url)
  .get(/profeco\.precios/)
  .query(function (query) { return query.page == 2 })
  .reply(200, fs.readFileSync(`${__dirname}/fixtures/page02.json`));
nock(url)
  .get(/profeco\.precios/)
  .query(function (query) { return query.page == 3 })
  .reply(200, fs.readFileSync(`${__dirname}/fixtures/page0N.json`));

test('moves between pages automagically', function (t) {
  t.plan(4);

  var cs = concat(function (data) {
    t.equal(data.length, 3, 'pages were retrieved');
    var got = data[0].results[0].precio;
    t.equal(got, '11.90', 'find object on the first page');
    got = data[1].results[0].precio;
    t.equal(got, '10.00', 'find object on the second page');
  });

  var counter = 0;
  var dataset = 'profeco.precios';

  var buda = new Buda;
  var bs = buda.download(dataset);
  bs.pipe(cs);

  bs.on('data', function (data) {
    counter += data.results.length;
  }).on('end', function () {
    t.equal(counter, 10, 'we collected 10 resources in 3 calls');
  });

});
