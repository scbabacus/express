var httpMocks = require('node-mocks-http');
var express = require('..');

// this is currently useless
// see response from a firebaser at
// https://stackoverflow.com/questions/45588740
// and the official source
// https://firebase.google.com/docs/functions/get-started#add_the_addmessage_function
// HTTP functions are synchronous,
// so you should send a response as quickly
// as possible and defer work using the Realtime Database.

describe('app', function () {
  describe('.use(app)', function () {
    it('should propagate the return value from the handler', function (done) {
      var appA = express();
      var appB = express();
      var appMain = express();
      appB.use(function () {
        return Promise.resolve(42);
      });
      appA.use('/app-b', appB);
      appMain.use('/app-a', appA);
      var mockRequest = httpMocks.createRequest({
        method: 'GET',
        url: '/app-a/app-b'
      });
      var mockResponse = httpMocks.createResponse();
      var returned = appMain(mockRequest, mockResponse);

      if (returned && returned.then) {
        done();
      } else {
        done('did not propagate return value');
      }
    })
  });
});
