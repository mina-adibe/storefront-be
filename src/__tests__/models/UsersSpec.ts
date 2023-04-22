import UserModel from "../../models/user";
import User, { UserWithouPass, UserWithoutId } from "../../types/user";
import db from "../../database";
import Error from "../../types/error.interface";

let userModel = new UserModel();

const newUser: User = {
  email: "test3@example.com",
  user_name: "testuser3",
  first_name: "Test",
  last_name: "User",
  password: "testpassword",
  created_at: new Date(),
};

afterEach(async () => {
  // clean up the database after each test
  const connection = await db.connect();
  const sqlQuery = "DELETE FROM users";
  await connection.query(sqlQuery);
  connection.release();
});

it("should create a new user in the database", async () => {
  // Test: create a new user and check that the returned user object matches the expected values

  const result = await userModel.createUser(newUser);

  expect(result.email).toBe(newUser.email);
  expect(result.user_name).toBe(newUser.user_name);
  expect(result.first_name).toBe(newUser.first_name);
  expect(result.last_name).toBe(newUser.last_name);
});

it("should get a user with valid id", async () => {
  // Insert a user with known id into test database

  const { rows } = await db.query(
    "INSERT INTO users(email, user_name, first_name, last_name, password) VALUES($1, $2, $3, $4, $5)  RETURNING  id , email, user_name, first_name, last_name, created_at",
    [
      newUser.email,
      newUser.user_name,
      newUser.first_name,
      newUser.last_name,
      newUser.password,
    ]
  );
  const user = rows[0];

  // Call getUser with known id
  const result = await userModel.getUser(user.id);

  // Check if user returned by getUser matches expected user
  expect(result).toEqual(user);
});

it("should return an array of users", async () => {
  const userModel = new UserModel();
  await userModel.createUser(newUser);

  const users = await userModel.getUsers();

  expect(Array.isArray(users)).toBeTrue();
  expect(users.length).toBeGreaterThan(0);
  expect(users[0]).toEqual(
    jasmine.objectContaining({
      id: jasmine.any(String),
      email: jasmine.any(String),
      user_name: jasmine.any(String),
      first_name: jasmine.any(String),
      last_name: jasmine.any(String),
      created_at: jasmine.any(Date),
    })
  );
});

describe("deleteUser", () => {
  let userModel: UserModel;
  let user: User;

  beforeAll(async () => {
    userModel = new UserModel();
    // Create a test user
    user = await userModel.createUser({
      email: "test@example.com",
      user_name: "testuser",
      first_name: "Test",
      last_name: "User",
      password: "testpassword",
      created_at: new Date(),
    });
  });

  afterAll(async () => {
    // Delete the test user after all tests have completed
    // @ts-ignore
    await userModel.deleteUser(user.id);
  });

  it("should throw an error if unable to delete user", async () => {
    const userModelSpy = spyOn(userModel, "deleteUser").and.throwError(
      "Connection error"
    );
    try {
      // @ts-ignore
      await userModel.deleteUser(user.id);
      fail("Error not thrown");
    } catch (error: any) {
      expect(error.message).toContain("Connection error");
    }
    userModelSpy.and.callThrough();
  });
});
