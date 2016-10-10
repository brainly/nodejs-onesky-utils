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
describe('GET multilingual translations with wrong credentials', function () {
  before(function () {
    mockery.registerMock('request-promise', function () {
      return requestPromise;
    });
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    oneskyUtils = rootRequire('index.js');
  });

  after(function () {
    mockery.deregisterSubstitute('request-promise');
    mockery.disable();
  });

  beforeEach(function () {
    defaultOptions = {
      projectId: 'projectId',
      secret: 'secret',
      apiKey: 'apiKey'
    };
  });

  it('Return error when request fails', function () {
    requestPromise = new Promise(function (resolve, reject) {
      reject({
        response: {
          body: '{"meta":{"status":400,"message":"Invalid source file"},"data":{}}'
        }
      });
    });

    oneskyUtils.getMultilingualFile(defaultOptions)
      .then(function (data) {
        expect(data).to.be.undefined;
      })
      .catch(function (error) {
        expect(error.code).to.equal(400);
        expect(error.message).to.equal('Invalid source file');
      });
  });

  it('Return success on valid content', function (done) {
    var successCallback = sinon.spy();
    var errorCallback = sinon.spy();

    requestPromise = new Promise(function (resolve, reject) {
      resolve('msgid "test"\nmsgstr "test_content"');
    });

    oneskyUtils.getMultilingualFile(defaultOptions)
      .then(successCallback, errorCallback)
      .then(function () {
        expect(errorCallback).to.not.have.been.calledOnce;
        expect(successCallback).to.have.been.calledWith('msgid "test"\nmsgstr "test_content"');
      })
      .then(done)
      .catch(done);
  });
});
