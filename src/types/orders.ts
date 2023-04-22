export type OrderStatus = "active" | "completed";

export interface Order {
  id?: string;
  user_id: string;
  status: OrderStatus;
  created_at?: Date;
}
