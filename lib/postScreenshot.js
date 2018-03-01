'use strict';

var queryString = require('querystring');

var _private = rootRequire('lib/privateFunctions.js');
var _globals = rootRequire('lib/globals.js');

var apiAddress = _globals.apiAddress;

/**
 * Post screenshot file form service
 *
 * OneSky Screenshot documentation
 * @link https://github.com/onesky/api-documentation-platform/blob/master/reference/screenshot.md
 *
 * @param  {Object}    options
 * @param  {Number}    options.projectId Project ID
 * @param  {String}    options.name A unique name to identify where the image located at your website, apps, blogs, etc... (Hints: path of the webpage)
 * @param  {String}    options.image Base64 encoded image data in Data URI scheme structure. Please reference to Data URI scheme and Base64
 * @param  {Object[]}  options.tags Translations bind to the screenshot
 * @param  {String}    options.tags[].key Key of the translation
 * @param  {Number}    options.tags[].x X-axis of the translation component
 * @param  {Number}    options.tags[].y Y-axis of the translation component
 * @param  {Number}    options.tags[].width Width of the translation component
 * @param  {Number}    options.tags[].height Height of the translation component
 * @param  {String}    options.tags[].file Name of the string file
 * @param  {String}    options.secret Private key to OneSky API
 * @param  {String}    options.apiKey Public key to OneSky API
 */
function postScreenshot (options) {
  options.hash = _private.getDevHash(options.secret);
  return _private.makeRequest(_getUploadOptions(options), 'Unable to upload document');
}

/**
 * @param  {Object} options
 * @return {Object}
 * @private
 */
function _getUploadOptions (options) {
  return {
    method: 'POST',
    url:
      apiAddress +
      '/1/projects/' +
      options.projectId +
      '/screenshots?' +
      queryString.stringify({
        api_key: options.apiKey,
        timestamp: options.hash.timestamp,
        dev_hash: options.hash.devHash
      }),
    form: {
      screenshots: [
        {
          name: options.name,
          image: options.image,
          tags: options.tags
        }
      ],
      api_key: options.apiKey,
      dev_hash: options.hash.devHash,
      timestamp: options.hash.timestamp.toString()
    }
  };
}
module.exports = postScreenshot;
