import User from "../../types/user";
import supertest from "supertest";
import db from "../../database";
import app from "../../index";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../types/product";

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

  it("should create a new product ", async () => {
    //@ts-ignore
    const newProduct: Product = {
      name: "ew22",
      price: 23,
      category: "glasses",
    };
    const result = await request
      .post("/api/products/")
      .send(newProduct)
      .set("Authorization", userToken);
    expect(result.status).toBe(200);
  });

  // get all products
  it("should get all products", async () => {
    const result = await request

      .get("/api/products/")
      .set("Authorization", userToken);
    expect(result.status).toBe(200);
  });

  // get product by id
  it("should get a product by id", async () => {
    //@ts-ignore
    const newProductB: Product = {
      name: "glasses-A",
      price: 23,
      category: "glasses",
    };
    const creatResult = await request
      .post("/api/products/")
      .send(newProductB)
      .set("Authorization", userToken);
    productID = creatResult.body.data.product.id;

    const result = await request
      .get(`/api/products/${productID}`)
      .set("Authorization", userToken);

    expect(result.status).toBe(200);
  });

  // DELETE product by id
  it("should delete a product by id", async () => {
    //@ts-ignore
    const newProductB: Product = {
      name: "glasses-A",
      price: 23,
      category: "glasses",
    };
    const creatResult = await request
      .post("/api/products/")
      .send(newProductB)
      .set("Authorization", userToken);
    productID = creatResult.body.data.product.id;

    const result = await request
      .delete(`/api/products/${productID}`)
      .set("Authorization", userToken);

    expect(result.status).toBe(200);
  });
});
