'use strict';

var queryString = require('querystring');

var _private = rootRequire('lib/privateFunctions.js');
var _globals = rootRequire('lib/globals.js');

var apiAddress = _globals.apiAddress;

/**
 * Get list of project languages
 * @param  {Object} options
 * @param  {Number} options.projectId Project ID
 * @param  {String} options.secret Private key to OneSky API
 * @param  {String} options.apiKey Public key to OneSky API
 */
function getImportTask(options) {
  options.hash = _private.getDevHash(options.secret);
  return _private.makeRequest(_getLink(options), 'Unable to fetch import tasks');
}

/**
 * @param  {Object} options
 * @return {String}
 * @private
 */
function _getLink(options) {
  const query = queryString.stringify({
    api_key: options.apiKey,
    timestamp: options.hash.timestamp,
    dev_hash: options.hash.devHash
  });

  return `${apiAddress}/1/projects/${options.projectId}/import-tasks?${query}`;
}

module.exports = getImportTask;
