type User = {
  id?: string;
  email: string;
  user_name: string;
  first_name: string;
  last_name: string;
  password: string;
  created_at: Date;
};

export default User;

export type UserWithoutId = Omit<User, "id">;
export type UserWithouPass = Omit<User, "password">;
