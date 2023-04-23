import supertest from "supertest";
import db from "../../database";
import app from "../../index";

const request = supertest(app);

const quantity = 3;
let orderID: number;
let orderProductID: number;
let productID: number;

let userID: string;
let userToken: string;

let firstOrder;
let secondOrder;
let thirdOrder;
let firstUser;
let firstProduct;

describe("Orders_Products Handler Suite", () => {
  beforeAll(async () => {
    firstProduct = {
      name: "Product A",
      price: 500,
      category: "Entertainment",
    };

    firstUser = {
      email: "mina11r@gmail.com",
      user_name: "mina11r",
      first_name: "mina11",
      last_name: "bessad11",
      password: "mina11",
    };

    firstOrder = {
      user_id: 1,
      status: "active",
    };
    secondOrder = {
      user_id: 1,
    };
    thirdOrder = {
      user_id: 1,
      status: "completed",
    };

    const user = await request.post("/api/users").send(firstUser);

    userID = user.body.data.id;
    // console.log("userID", userID);

    userToken = user.headers.authorization;

    const product = await request
      .post("/api/products")
      .set("Authorization", userToken)
      .send(firstProduct);

    productID = product.body.data.product.id;

    const order = await request
      .post("/api/orders")
      .set("Authorization", userToken)
      .send({ ...firstOrder, user_id: userID });
    orderID = order.body.data.order.id;
  });

  it("Should add products to order sucessfully", async () => {
    const result = await request
      .post(`/api/order_products/`)
      .set("Authorization", userToken)
      .send({ product_id: productID, quantity, order_id: orderID });
    orderProductID = result.body.data.orderProduct.id;
    // console.log("orderProductID", orderProductID);

    expect(result.statusCode).toBe(201);
  });

  it("Should fetch all products from order successfully", async () => {
    const result = await request
      .get(`/api/order_products`)
      .set("Authorization", userToken);

    expect(result.statusCode).toBe(200);
  });

  // it("Should delete order by id successfully", async () => {
  //   // console.log("orderProductID", orderProductID);

  //   const result = await request
  //     .delete(`/api/order_products/${orderProductID}/`)
  //     .set("Authorization", userToken);

  //   // console.log("result", result);
  //   expect(result.statusCode).toBe(200);
  // });
});
