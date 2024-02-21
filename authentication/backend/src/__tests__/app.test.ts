import app from "../app.js";
import request from "supertest";

describe("User", function () {
  it("should save without error", function () {
    // expect(2 + 2).toBe(4);
    request(app)
      .get("/")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
