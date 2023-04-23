import User from "../../types/user";
import supertest from "supertest";
import db from "../../database";
import app from "../../index";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../types/product";
import { Order } from "../../types/orders";

const request = supertest(app);

// // const userID: string;
// let token: string;

let userID: string;
let userToken: string;

const quantity = 3;
let orderID: number;
let orderProductID: number;
let productID: number;

let firstOrder;
let secondOrder;
let thirdOrder;
let firstUser;
let firstProduct;

describe("users ", () => {
  beforeAll(async () => {
    firstUser = {
      email: "mina11r@gmail.com",
      user_name: "mina11r",
      first_name: "mina11",
      last_name: "bessad11",
      password: "mina11",
    };

    const user = await request.post("/api/users").send(firstUser);
    userID = user.body.data.id;
    userToken = user.headers.authorization;
  });

  it("should create a new order ", async () => {
    //@ts-ignore
    const newOrder: Order = {
      user_id: userID,
      status: "active",
    };
    const result = await request
      .post("/api/orders/")
      .send(newOrder)
      .set("Authorization", userToken);
    expect(result.status).toBe(201);
  });

  // get all products
  it("should get all orders", async () => {
    const result = await request

      .get("/api/orders/")
      .set("Authorization", userToken);
    expect(result.status).toBe(200);
  });

  // get product by id
  it("should get a order by id", async () => {
    const thirdUser = {
      email: "mina12@gmail.com",
      user_name: "mina11q",
      first_name: "mina11",
      last_name: "bessad11",
      password: "mina11",
    };

    const user = await request.post("/api/users").send(thirdUser);
    const userID = user.body.data.id;
    const userToken = user.headers.authorization;

    //@ts-ignore
    const newOrderC: Order = {
      user_id: userID,
      status: "active",
    };
    const creatResult = await request
      .post("/api/orders/")
      .send(newOrderC)
      .set("Authorization", userToken);
    orderID = creatResult.body.data.order.id;

    const result = await request
      .get(`/api/orders/${orderID}`)
      .set("Authorization", userToken);

    expect(result.status).toBe(200);
  });

  // DELETE product by id
  it("should delete a order by id", async () => {
    const secondtUser = {
      email: "mina11r@gmail.com",
      user_name: "mina11r",
      first_name: "mina11",
      last_name: "bessad11",
      password: "mina11",
    };

    const user = await request.post("/api/users").send(secondtUser);
    const userID = user.body.data.id;
    const userToken = user.headers.authorization;

    //@ts-ignore
    const newOrder: Order = {
      user_id: userID,
      status: "active",
    };
    const creatResult = await request
      .post("/api/orders/")
      .send(newOrder)
      .set("Authorization", userToken);

    orderID = creatResult.body.data.order.id;

    const result = await request
      .delete(`/api/orders/${orderID}`)
      .set("Authorization", userToken);

    expect(result.status).toBe(200);
  });
});
