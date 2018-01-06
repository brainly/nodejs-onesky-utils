/* eslint-env mocha */
'use strict';

function rootRequire (name) {
  return require(__dirname + '/../' + name);
}

var mockery = require('mockery');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var requestPromise;
var oneskyUtils;
var defaultOptions;

chai.use(sinonChai);

describe('POST screenshots', function () {
  afterEach(function () {
    mockery.deregisterSubstitute('request-promise');
    mockery.disable();
  });

  beforeEach(function () {
    defaultOptions = {
      projectId: 'projectId',
      secret: 'secret',
      apiKey: 'apiKey',
      name: 'name',
      image: 'image',
      tags: [
        {
          key: 'key',
          x: 1,
          y: 2,
          width: 3,
          height: 4,
          file: 'file'
        }
      ]
    };
    mockery.registerMock('request-promise', function (request) {
      // Assert well formed request
      expect(request.method).to.equal('POST');
      expect(request.form.secret).to.be.undefined;
      expect(request.form.api_key).to.equal('apiKey');
      expect(request.form.dev_hash).to.not.be.undefined;
      expect(request.form.timestamp).to.not.be.undefined;

      var screenshot = request.form.screenshots[0];
      expect(request.form.screenshots).to.not.be.undefined;

      expect(screenshot.name).to.equal('name');
      expect(screenshot.image).to.equal('image');
      expect(screenshot.tags[0].key).to.equal('key');
      expect(screenshot.tags[0].x).to.equal(1);
      expect(screenshot.tags[0].y).to.equal(2);
      expect(screenshot.tags[0].width).to.equal(3);
      expect(screenshot.tags[0].height).to.equal(4);
      expect(screenshot.tags[0].file).to.equal('file');

      return requestPromise;
    });
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    oneskyUtils = rootRequire('index.js');
  });

  it('Return error request fails with 400', function () {
    requestPromise = new Promise(function (resolve, reject) {
      reject({
        response: {
          body: "{ message: 'Unable to upload document', code: 400 }"
        }
      });
    });

    oneskyUtils
      .postScreenshot(defaultOptions)
      .then(function (data) {
        expect(data).to.be.undefined;
      })
      .catch(function (error) {
        expect(error.code).to.equal(400);
        expect(error.message).to.equal('Unable to upload document');
      });
  });

  it('Return success on valid content', function (done) {
    var successCallback = sinon.spy();
    var errorCallback = sinon.spy();

    requestPromise = new Promise(function (resolve, reject) {
      resolve({
        response: {
          body: '{"meta":{"status":201},"data":{}}'
        }
      });
    });

    oneskyUtils
      .postScreenshot(defaultOptions)
      .then(successCallback, errorCallback)
      .then(function () {
        expect(errorCallback).to.not.have.been.calledOnce;
        expect(successCallback).to.have.been.calledOnce;
      })
      .then(done)
      .catch(done);
  });
});
