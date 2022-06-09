const request = require("supertest");
const app = require("../app");
const truncate = require("../helpers/truncate");

describe("TESTING COMMENTS CONTROLLERS/api/v1/comments", () => {
  test("CREATE COMMENTS SUCCESS - COMMENTS /", async () => {
    const data = {
      post_id: "1",
      user_id: "1",
      comment: "bagus banget bang",
    };
    await truncate.commentData();
    await request(app)
      .post("/api/v1/comments")
      .send(data)
      .then((res) => {
        expect(res.status).toBeTruthy();
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("data post comment berhasil dibuat");
        expect(res.body.data).toBeTruthy();
        // done();
      })
      .catch((err) => {
        console.log(err);
        // done(err);
      });
  });

  test("GET ALL COMMENTS /api/v1/comments", (done) => {
    request(app)
      .get("/api/v1/comments")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe(
          "berhasil mengambil detail data post comment"
        );
        expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("GET ONE COMMENTS /api/v1/comments", (done) => {
    request(app)
      .get("/api/v1/comments/1")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe(
          "berhasil mengambil detail data post comment"
        );
        expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("GET ONE COMMENTS NOT FOUND /api/v1/comments", (done) => {
    request(app)
      .get("/api/v1/comments/111")
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body.status).toBe("errors");
        expect(res.body.message).toBe("id tidak ditemukan");
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("UPDATE COMMENTS /api/v1/comments", (done) => {
    const data = {
      user_id: "1",
      post_id: "2",
      comment: "bagus ya",
    };
    request(app)
      .put("/api/v1/comments/1")
      .send(data)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("post comment berhasil di update");
        expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  test("DELETE COMMENTS /api/v1/comments", (done) => {
    request(app)
      .delete("/api/v1/comments/1")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("post comment berhasil di hapus");
        expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});
