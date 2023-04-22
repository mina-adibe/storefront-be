export interface Order {
  id?: string;
  user_id: string;
  status: string;
  created_at?: Date;
}
