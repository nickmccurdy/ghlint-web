var app = require('../app');
var assert = require('assert');
var request = require('supertest');

describe('ghlint-web', function () {
  this.timeout(10000);

  describe('GET /', function () {
    it('responds with the home page', function (done) {
      request(app)
        .get('/')
        .expect(200, done);
    });

    context('with ?repo=owner', function () {
      it('redirects to a page with the linter results for a repo', function (done) {
        request(app)
          .get('/?repo=nicolasmccurdy')
          .expect(200)
          .end(function (error, response) {
            assert.equal('/nicolasmccurdy', response.header.location);
            done();
          });
      });
    });

    context('with ?repo=repo', function () {
      it('redirects to a page with the linter results for an owner', function (done) {
        request(app)
          .get('/?repo=nicolasmccurdy/ghlint')
          .expect(200)
          .end(function (error, response) {
            assert.equal('/nicolasmccurdy/ghlint', response.header.location);
            done();
          });
      });
    });
  });

  describe('GET /:owner/:repo', function () {
    context('with a real repo', function () {
      it('responds with the linter results for a repo', function (done) {
        request(app)
          .get('/nicolasmccurdy/ghlint')
          .expect(200, done);
      });
    });

    context('with a fake repo', function () {
      it('responds with an error', function (done) {
        request(app)
          .get('/nicolasmccurdy/qwertyuiop')
          .expect(404, done);
      });
    });

    context('with a fake owner', function () {
      it('responds with an error', function (done) {
        request(app)
          .get('/login/repo')
          .expect(404, done);
      });
    });
  });

  describe('GET /:owner', function () {
    context('with a real owner', function () {
      it('responds with the linter results for an owner', function (done) {
        request(app)
          .get('/nicolasmccurdy')
          .expect(200, done);
      });
    });

    context('with a fake owner', function () {
      it('responds with an error', function (done) {
        request(app)
          .get('/login')
          .expect(404, done);
      });
    });
  });
});
