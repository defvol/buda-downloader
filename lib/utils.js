var fs = require('fs');

/**
 * Parse package.json
 * @return {object} metadata
 */
function package() {
  var data = fs.readFileSync(__dirname + '/../package.json');
  return JSON.parse(data);
};

/**
 * Get usage instructions
 * @return {String} the instructions to run this thing
 */
module.exports.usage = function () {
  var u = [];
  var p = package();
  u.push(p.description);
  u.push('usage: ' + p.name + ' [options]');
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
  return package().version;
};
