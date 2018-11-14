import "mocha";
import * as request from "supertest";
import { app } from "../../app";

describe("car model", function() {
  // deploy contract
  it('returns error if "0x" are present in the beginning of an address|private key', function(done) {
    request(app)
      .post(
        "/api/Cars/1/requestRegister/0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1"
      )
      .set("Accept", "application/json")
      .expect(200)
      .expect({
        ethResponse:
          "Please provide the private key without specifying the hex type."
      })
      .end(done);
  });
  it("returns correct eth response when given id and private key", function(done) {
    this.timeout(10000);

    setTimeout(function() {
      request(app)
        .post(
          "/api/Cars/1/requestRegister/6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1"
        )
        .expect(200)
        .expect(res => {
          res.body.ethResponse.transactionHash !== null ||
            res.body.ethResponse.transactionHash !== undefined;
        })
        .end(done);
    }, 5000);
  });
  it("registers a car when approved by administrator", function(done) {
    request(app)
      .post("/api/Cars/register/ffcf8fdee72ac11b5c542428b35eef5769c409f0")
      .expect(200)
      .expect(res => {
        res.body.ethResponse.transactionHash !== null ||
          res.body.ethResponse.transactionHash !== undefined;
      })
      .end(done);
  });
  it("returns registered car after approving the registration", function(done) {
    request(app)
      .get("/api/Cars/ffcf8fdee72ac11b5c542428b35eef5769c409f0/1")
      .expect(200)
      .expect(res => {
        res.body.cars.horsePower !== null ||
          res.body.cars.horsePower !== undefined;
      })
      .end(done);
  });
});
