const request = require("supertest");
const app = require("../app");

const data = {
    username: "thomas1",
    password: "slebew123"
};

describe("TESTING LOGIN CONTROLLERS /api/v1/users/login", ()=>{
    test("TEST SUCCESS LOGIN USERS", async ()=>{

        await request(app)
            .post("api/v1/login")
            .send(data)
            .then((res) => {
                expect(res.status).toBeTruthy();
                expect(res.body).toHaveProperty("status");
                expect(res.body).toHaveProperty("message");
                expect(res.body).toHaveProperty("data");
                expect(res.body.status).toBe("success");
                expect(res.body.message).toBe("berhasil login");
                expect(res.body.data).toBeTruthy();
                })
            .catch((err) => {
                console.log(err);
                });
    });

    test("TEST 404 NOT FOUND LOGIN USER", async()=>{
        const data = {
            username: "abcdefg",
            password: "adsfddf"
        }

        await request(app)
            .post("api/v1/login")
            .send(data)
            .then((res) => {
                expect(res.status).toBeTruthy();
                expect(res.body).toHaveProperty("status");
                expect(res.body).toHaveProperty("message");
                expect(res.body).toHaveProperty("data");
                expect(res.body.status).toBe("success");
                expect(res.body.message).toBe("berhasil login");
                expect(res.body.data).toBeTruthy();
                })
            .catch((err) => {
                console.log(err);
                });
    })
})

