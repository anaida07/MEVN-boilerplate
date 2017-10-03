var request = require("supertest");
var expect = require("expect.js");
var server = require("../src/app");

describe("MEVN-boilerplate - TESTS", function () {
  after(function () {
    process.exit();
  });
  describe("posts", function () {
    it("GET /posts", function (done) {
      request(server)
        .get('/posts')
        .expect(200, done);
    });
    it("GET /post/:id", function () {
      //TODO
    });
    it("POST /add_post", function () {
      //TODO
    });
    it("PUT /posts/:id", function () {
      //TODO
    });
    it("DELETE /posts/:id", function () {
      //TODO
    });
  });
});
