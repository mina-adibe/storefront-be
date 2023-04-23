export interface OrderProducts {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
}

export type OrderProductsWithoutId = Omit<OrderProducts, "id">;

export type OrderProductsWithoutProduct = Omit<OrderProducts, "product_id">;
