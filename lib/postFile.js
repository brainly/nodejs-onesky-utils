
'use strict';

var queryString = require('querystring');

var _private = rootRequire('lib/privateFunctions.js');
var _globals = rootRequire('lib/globals.js');

var apiAddress = _globals.apiAddress;

/**
 * Post translations file form service
 * @param  {Object}  options
 * @param  {Number}  options.projectId Project ID
 * @param  {String}  options.format File format (see documentation)
 * @param  {String}  options.content File to upload
 * @param  {Boolean} options.keepStrings Keep previous, non present in this file strings
 * @param  {String}  options.secret Private key to OneSky API
 * @param  {String}  options.apiKey Public key to OneSky API
 * @param  {String}  options.language Language of the uploaded file
 * @param  {String}  options.fileName Name of the uploaded file
 */
function postFile (options) {
  options.hash = _private.getDevHash(options.secret);
  return _private.makeRequest(_getUploadOptions(options),
    'Unable to upload document');
}

/**
 * @param  {Object} options
 * @return {Object}
 * @private
 */
function _getUploadOptions (options) {
  return {
    method: 'POST',
    url: apiAddress + '/1/projects/' + options.projectId + '/files?' + queryString.stringify({
      api_key: options.apiKey,
      timestamp: options.hash.timestamp,
      dev_hash: options.hash.devHash
    }),
    formData: {
      file: {
        value: options.content,
        options: {
          filename: options.fileName
        }
      },
      api_key: options.apiKey,
      dev_hash: options.hash.devHash,
      file_format: options.format,
      is_keeping_all_strings: options.keepStrings.toString(),
      locale: options.language,
      timestamp: options.hash.timestamp.toString(),
      is_allow_translation_same_as_original: (options.allowSameAsOriginal || false).toString()
    }
  };
}
module.exports = postFile;
