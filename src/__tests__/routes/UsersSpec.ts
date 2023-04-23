import User from "../../types/user";
import supertest from "supertest";
import db from "../../database";
import app from "../../index";
import { v4 as uuidv4 } from "uuid";

const request = supertest(app);

// // const userID: string;
// let token: string;

let userID: string;
let userToken: string;

describe("users ", () => {
  //@ts-ignore
  const newUser: User = {
    email: `${uuidv4().substring(0, 6)}@example.com`,
    user_name: uuidv4().substring(0, 8),
    first_name: "mina112",
    last_name: "bessad112",
    password: "mina112",
  };

  it("should create a new user ++ ", async () => {
    const result = await request.post("/api/users/").send(newUser);
    userID = result.body.data.id;
    console.log("userID", userID);
    userToken = result.headers.authorization;
    expect(result.status).toBe(200);
  });

  it("should get all users", async () => {
    const result = await request
      .get("/api/users/")
      .set("Authorization", userToken);
    expect(result.status).toBe(200);
  });

  it("should get a user by id", async () => {
    const creatResult = await request.post("/api/users/").send(newUser);
    userID = creatResult.body.data.id;

    const result = await request
      .get(`/api/users/${userID}`)
      .set("Authorization", userToken);

    expect(result.status).toBe(200);
  });

  // delete user
  it("should delete a user by id", async () => {
    const creatResult = await request.post("/api/users/").send(newUser);
    userID = creatResult.body.data.id;

    const result = await request
      .delete(`/api/users/${userID}`)
      .set("Authorization", userToken);

    expect(result.status).toBe(200);
  });
});
