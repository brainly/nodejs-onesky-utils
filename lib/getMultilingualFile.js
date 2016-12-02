'use strict';

var queryString = require('querystring');

var _private = rootRequire('lib/privateFunctions.js');
var _globals = rootRequire('lib/globals.js');

var apiAddress = _globals.apiAddress;

/**
 * Get translations file form service
 * @param  {Object} options
 * @param  {Number} options.projectId Project ID
 * @param  {String} options.secret Private key to OneSky API
 * @param  {String} options.apiKey Public key to OneSky API
 * @param  {String} options.language Language to download
 * @param  {String} options.fileName File name to download
 * @param  {String} options.format Expected file format of response
 */
function getMultilingualFile (options) {
  options.hash = _private.getDevHash(options.secret);
  return _private.makeRequest(_getLink(options),
    'Unable to fetch document');
}

/**
 * @param  {Object} options
 * @return {String}
 * @private
 */
function _getLink (options) {
  return apiAddress + '/1/projects/' + options.projectId + '/translations/multilingual?' + queryString.stringify({
    api_key: options.apiKey,
    timestamp: options.hash.timestamp,
    dev_hash: options.hash.devHash,
    source_file_name: options.fileName,
    file_format: options.format || 'I18NEXT_MULTILINGUAL_JSON'
  });
}

module.exports = getMultilingualFile;
