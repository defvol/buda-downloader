var fs = require('fs');

/**
 * Get usage instructions
 * @return {String} the instructions to run this thing
 */
module.exports.usage = function () {
  var u = [];
  u.push('API client for datos.gob.mx');
  u.push('usage: buda-client [options]');
  u.push('');
  u.push(' --help prints this message');
  u.push(' --version prints package version');
  u.push('');
  return u.join('\n');
};

/**
 * Get module version from the package.json file
 * @return {String} version number
 */
module.exports.version = function () {
  var data = fs.readFileSync(__dirname + '/../package.json');
  return JSON.parse(data).version;
};
