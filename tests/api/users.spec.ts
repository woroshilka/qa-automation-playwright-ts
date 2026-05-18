import { test, expect } from "@playwright/test";
import { UsersService } from "../../src/api/services/users.service";
import { ApiClient } from "../../src/api/clients/apiClient";
import { ENV } from "../../src/utils/env";

let apiClient: ApiClient;
let usersService: UsersService;

test.beforeEach(async ({ request }) => {
  apiClient = new ApiClient(request, ENV.API_URL);
  usersService = new UsersService(apiClient);
});

test.describe("Users API", () => {
  test("should get all users", async () => {
    const users = await usersService.getAllUsers();
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBeTruthy();
  });

  test("should get user by id", async () => {
    const user = await usersService.getUserById(1);
    expect(user).toBeDefined();
    expect(user.id).toBe(1);
  });

  test("should return 404 for non-existent user", async () => {
    const statusCode = await usersService.getUserStatusCode(99999);
    expect(statusCode).toBe(404);
  });

  test("should create new user", async () => {
    const newUser = { name: "Test User", email: "test@example.com" };
    const user = await usersService.createUser(newUser);
    expect(user).toBeDefined();
    expect(user.name).toBe(newUser.name);
  });

  test("should update existing user", async () => {
    const updates = { name: "Updated User", email: "updated@example.com" };
    const user = await usersService.updateUser(1, updates);
    expect(user).toBeDefined();
    expect(user.name).toBe(updates.name);
  });

  test("should delete user", async () => {
    const response = await usersService.deleteUser(1);
    expect([200, 204]).toContain(response.status());
  });
});
