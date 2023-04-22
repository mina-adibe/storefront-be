import OrdersModel from "../../models/orders";

describe("OrdersModel", () => {
  let ordersModel: OrdersModel;

  beforeAll(async () => {
    ordersModel = new OrdersModel();
  });

  describe("getOrders", () => {
    it("should return an empty array if there are no orders", async () => {
      const orders = await ordersModel.getOrders();
      expect(orders).toEqual([]);
    });
  });
});
