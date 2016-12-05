# nodejs-onesky-utils [![Build Status](https://travis-ci.org/brainly/nodejs-onesky-utils.svg?branch=master)](https://travis-ci.org/brainly/nodejs-onesky-utils) [![Code Climate](https://codeclimate.com/github/brainly/nodejs-onesky-utils/badges/gpa.svg)](https://codeclimate.com/github/brainly/nodejs-onesky-utils) [![npm version](https://badge.fury.io/js/onesky-utils.svg)](http://badge.fury.io/js/onesky-utils)
Node.js utils for working with [OneSky](http://www.oneskyapp.com/) translation service.

## Example

### getFile

```js
var onesky = require('onesky-utils');

var options = {
  language: 'en_EN',
  secret: '1234567',
  apiKey: 'abcdefg',
  projectId: '123',
  fileName: 'translations.po'
};

onesky.getFile(options).then(function(content) {
  console.log(content);
}).catch(function(error) {
  console.log(error);
});
```
### getMultiLingualFile

```js
var onesky = require('onesky-utils');

var options = {
  language: 'en_EN',
  secret: '1234567',
  apiKey: 'abcdefg',
  projectId: '123',
  fileName: 'translations.po',
  format: 'I18NEXT_MULTILINGUAL_JSON'
};

onesky.getMultiLingualFile(options).then(function(content) {
  console.log(content);
}).catch(function(error) {
  console.log(error);
});
```


### postFile

```js
var onesky = require('onesky-utils');

var options = {
  language: 'en-US',
  secret: '1234567',
  apiKey: 'abcdefg',
  projectId: '123',
  fileName: 'translations.json',
  format: 'HIERARCHICAL_JSON',
  content: JSON.stringify(translations),
  keepStrings: true
};

onesky.postFile(options).then(function(content) {
  console.log(content);
}).catch(function(error) {
  console.log(error);
});
```

## Install

```
$ npm install onesky-utils
```

## API

### getFile(options)
Downloads translation file from OneSky.

Returns file content via promise.

The `options` object is required. Options include:

- **options.projectId** - Numerical ID of the project
- **options.fileName** - Name of the translation file
- **options.language** - Language version
- **options.secret** - `secret` and `apiKey` are used for authentication
- **options.apiKey**

### getMultiLingualFile(options)
Downloads multi-language translations from OneSky.

Returns file content via promise.

The `options` object is required. Options include:

- **options.projectId** - Numerical ID of the project
- **options.fileName** - Name of the translation file
- **options.format** - Response file format (Optional. Defaults to `I18NEXT_MULTILINGUAL_JSON`)
- **options.language** - Language version
- **options.secret** - `secret` and `apiKey` are used for authentication
- **options.apiKey**

### postFile(options)
Uploads translation file to OneSky.

The `options` object is required. Options include:

- **options.projectId** - Numerical ID of the project
- **options.fileName** - Name of the translation file
- **options.language** - Language version
- **options.format** - File format ([list here](https://github.com/onesky/api-documentation-platform/blob/master/reference/format.md))
- **options.content** String with the content of the file
- **options.keepStrings** Boolean saying if already uploaded strings not present on this file should be deprecated or keept
- **options.secret** - `secret` and `apiKey` are used for authentication
- **options.apiKey**

Returns JSON API response content via promise.
Example:

````JSON
{
    "meta": {
        "status": 200,
        "record_count": 16
    },
    "data": [
        {
            "name": "translations.json",
            "string_count": 236,
            "last_import": {
                "id": 123,
                "status": "in-progress"
            },
            "uploaded_at": "2013-10-07T15:27:10+0000",
            "uploaded_at_timestamp": 1381159630
        }
    ]
}
````

## Tests

```
$ npm test
```

## License

[MIT](./LICENSE)
