const request = require("supertest");
const app = require("../app");
const truncate = require("../helpers/truncate");

describe("TESTING LIKES CONTROLLERS/api/v1/likes", () => {
  test("CREATE LIKES SUCCESS - LIKES /", async () => {
    const data = {
      post_id: "1",
      user_id: "1",
    };
    await truncate.likesData();
    await request(app)
      .post("/api/v1/likes")
      .send(data)
      .then((res) => {
        expect(res.status).toBeTruthy();
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("data post_like berhasil dibuat");
        expect(res.body.data).toBeTruthy();
        // done();
      })
      .catch((err) => {
        console.log(err);
        // done(err);
      });
  });

  test("GET ALL LIKES /api/v1/likes", (done) => {
    request(app)
      .get("/api/v1/likes")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("sukses mengambil semua data post like");
        expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("GET ONE LIKES /api/v1/likes", (done) => {
    request(app)
      .get("/api/v1/likes/1")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("sukses mengambil detail data post like");
        expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("GET ONE LIKES NOT FOUND /api/v1/likes", (done) => {
    request(app)
      .get("/api/v1/likes/111")
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body.status).toBe("error");
        expect(res.body.message).toBe("id tidak ditemukan");
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("UPDATE LIKES /api/v1/likes", (done) => {
    const data = {
      user_id: "1",
      post_id: "2",
    };
    request(app)
      .put("/api/v1/likes/1")
      .send(data)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("sukses update data post_like");
        expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  test("DELETE LIKES /api/v1/likes", (done) => {
    request(app)
      .delete("/api/v1/likes/1")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("sukses delete data");
        expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});
