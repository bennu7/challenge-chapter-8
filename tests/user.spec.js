const request = require("supertest");
const app = require("../app");
const truncate = require("../helpers/truncate");

describe("GET /", () => {
  test("GET /", (done) => {
    request(app)
      .get("/")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("Hello World!");
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("TESTING USER CONTROLLERS/api/v1/users", () => {
  test("CREATE USER SUCCESS - POST /", async () => {
    const data = {
      name: "thomas5",
      username: "thomas5",
      email: "thomas5@gmail.com",
      password: "slebew123",
    };
    await truncate.userData();
    await request(app)
      .post("/api/v1/users")
      .send(data)
      .then((res) => {
        expect(res.status).toBeTruthy();
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("data user instagram baru telah di buat");
        expect(res.body.data.name).toBe(data.name);
        expect(res.body.data.username).toBe(data.username);
        expect(res.body.data.email).toBe(data.email);
        expect(res.body.data.password).toBe(data.password);
        // done();
      })
      .catch((err) => {
        console.log(err);
        // done(err);
      });
  });
  //bad request name required error
  test("CREATE USER ERROR REQUIRED - POST /", (done) => {
    const data = {
      username: "thomas3",
      email: "thomas3@gmail.com",
      password: "slebew123",
    };

    request(app)
      .post("/api/v1/users")
      .send(data)
      .then((res) => {
        expect(res.status).toBeTruthy();
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body.status).toBe("false");
        expect(res.body.message).toBe(
          "name or username or email or password is required!"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  //username exist
  test("CREATE USER ERROR EMAIL EXIST - POST /", (done) => {
    const data = {
      name: "thomasslebew",
      username: "thomas1",
      email: "thomas1@gmail.com",
      password: "slebew123",
    };

    request(app)
      .post("/api/v1/users")
      .send(data)
      .then((res) => {
        expect(res.status).toBeTruthy();
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body.status).toBeTruthy();
        expect(res.body.message).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("GET ALL USER /api/v1/users", (done) => {
    request(app)
      .get("/api/v1/users")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("berhasil mengambil semua data user");
        expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("GET ONE USER /api/v1/users", (done) => {
    request(app)
      .get("/api/v1/users/1")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("berhasil mengambil detail user");
        expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("GET ONE USER NOT FOUND /api/v1/users", (done) => {
    request(app)
      .get("/api/v1/users/111")
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("error");
        expect(res.body.message).toBe("tidak ditemukan dengan id : 111");
        expect(res.body.data).toBe(null);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("UPDATE USER /api/v1/users", (done) => {
    const data = {
      name: "thomasslebew",
      username: "thomas1",
      email: "thomas1@gmail.com",
      password: "slebew1223",
    };
    request(app)
      .put("/api/v1/users/1")
      .send(data)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("berhasil update user!");
        expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("UPDATE USER NOT FOUND /api/v1/users", (done) => {
    const data = {
      name: "thomasslebew",
      username: "thomas1243432",
      email: "thomas1@gmail.com",
      password: "slebew1223",
    };

    request(app)
      .put("/api/v1/users/1234")
      .send(data)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        // expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("false");
        expect(res.body.message).toBe("id tidak ditemukan");
        // expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  test("DELETE USER /api/v1/users", (done) => {
    request(app)
      .delete("/api/v1/users/1")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("success");
        expect(res.body.message).toBe("berhasil menghapus user");
        expect(res.body.data).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
  test("DELETE  USER NOT FOUND /api/v1/users", (done) => {
    request(app)
      .delete("/api/v1/users/321")
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        // expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe("false");
        expect(res.body.message).toBe("id tidak ditemukan");
        // expect(res.body.data).toBe(null);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});
