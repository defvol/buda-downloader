var q = require('query-string');
var pager = require('paged-http-stream');

function Buda(opts) {
  if (!(this instanceof Buda)) return new Buda(opts);
  if (!opts) return new Buda({});

  this.version = opts.version || '1';
  this.base = (opts.uri || 'http://api.datos.gob.mx/');
  this.uri = this.base + this.version;
  this.page = opts.page || 1;
  this.pageSize = opts.pageSize || 1000;
};

/**
 * Build request parameters for paged-http-stream
 * A full uri looks like this:
 * http://api.datos.gob.mx/v1/profeco.precios?page=2&pageSize=5
 * @param {object} opts for the http request
 * @return {object} crafted opts to request the next page
 */
Buda.prototype._reqOpts = function (opts) {
  var query = q.stringify({
    page: opts.page || this.page,
    pageSize: this.pageSize
  });
  return {
    method: 'GET',
    uri: this.uri + '/' + opts.dataset + query
  };
};

/**
 * Return parameters for the next page to fetch
 * @param {object} data returned by the http request
 * @return null if no more results to fetch; otherwise the next parameters
 */
function next (data) {
  if (data.error) throw new Error(data.error);
  if (data.results && data.results.length === 0) return null;

  var opts = {
    dataset: this.dataset,
    page: parseInt(data.page + 1)
  };

  return this._reqOpts(opts);
}

/**
* Open a download stream
* @param {string} dataset to download
* @return {function} readable stream
*/
Buda.prototype.download = function (dataset) {
  this.dataset = dataset;
  var query = this._reqOpts({ dataset: dataset });

  return pager(query, next.bind(this));
};

module.exports = Buda;
