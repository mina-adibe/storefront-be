import OrderProducts from "../../models/orderProducts";

describe("OrdersModel", () => {
  let orderProducts: OrderProducts;

  beforeAll(async () => {
    orderProducts = new OrderProducts();
  });

  describe("Order Products", () => {
    it("should return an empty array if there are no orders", async () => {
      const orders = await orderProducts.getOrderProducts();
      expect(orders).toEqual([]);
    });
  });
});
