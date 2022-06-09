const request = require("supertest");
const app = require("../app");
const truncate = require("../helpers/truncate");

describe("TESTING POST CONTROLLERS/api/v1/posts", () => {
  test("CREATE POST SUCCESS - POST /", async () => {
    const data = {
      user_id: "1",
      source_image: "loremipsum",
      post_content: "dolorsitamet",
    };
    await truncate.postData();
    await request(app)
      .post("/api/v1/posts")
      .send(data)
      .then((res) => {
        expect(res.status).toBeTruthy();
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("berhasil membuat postingan baru");
        expect(res.body.data).toBeTruthy();
        // done();
      })
      .catch((err) => {
        console.log(err);
        // done(err);
      });
  });
  //bad request name required error
  test("CREATE POST ERROR REQUIRED - POST /", (done) => {
    const data = {
      source_image: "loremipsum",
    };

    request(app)
      .post("/api/v1/posts")
      .send(data)
      .then((res) => {
        expect(res.status).toBeTruthy();
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("false");
        expect(res.body.message).toBe(
          "user_id or source_image or post_content is required"
        );
        expect(res.body.data).toBe(null);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  test("GET ALL POST /api/v1/posts", (done) => {
    request(app)
      .get("/api/v1/posts")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("sukses mengambil semua data post");
        expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("GET ONE POST /api/v1/posts", (done) => {
    request(app)
      .get("/api/v1/posts/1")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("berhasil mengambil detail data post");
        expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("GET ONE POST NOT FOUND /api/v1/posts", (done) => {
    request(app)
      .get("/api/v1/posts/111")
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("error");
        expect(res.body.message).toBe("data dengan id : 111 tidak ditemukan");
        expect(res.body.data).toBe(null);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("UPDATE POST /api/v1/posts", (done) => {
    const data = {
      user_id: "1",
      source_image: "loremipsum",
      post_content: "dolorsitametttt",
    };
    request(app)
      .put("/api/v1/posts/1")
      .send(data)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("berhasil update post");
        expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("UPDATE POST NOT FOUND /api/v1/posts", (done) => {
    const data = {
      user_id: "1234",
      source_image: "loremipsum",
      post_content: "dolorsitamet",
    };

    request(app)
      .put("/api/v1/posts/1234")
      .send(data)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("false");
        expect(res.body.message).toBe("id tidak ditemukan");
        expect(res.body.data).toBe(null);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  test("DELETE POST /api/v1/posts", (done) => {
    request(app)
      .delete("/api/v1/posts/1")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("data post berhasil hapus");
        expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("DELETE  POST NOT FOUND /api/v1/posts", (done) => {
    request(app)
      .delete("/api/v1/posts/321")
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("false");
        expect(res.body.message).toBe("id tidak ditemukan");
        expect(res.body.data).toBe(null);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});
