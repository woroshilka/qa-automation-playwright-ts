import { test, expect } from "@playwright/test";
import { AuthService } from "../../src/api/services/auth.service";
import { ApiClient } from "../../src/api/clients/apiClient";
import { ENV } from "../../src/utils/env";

// dummyjson.com public test credentials
const VALID_USER = { username: "emilys", password: "emilyspass" };

let authService: AuthService;

test.beforeEach(async ({ request }) => {
  const apiClient = new ApiClient(request, ENV.AUTH_URL);
  authService = new AuthService(apiClient);
});

test.describe("Auth API", () => {
  test("should login with valid credentials and return accessToken", async () => {
    const response = await authService.login(VALID_USER);

    expect(response.accessToken).toBeDefined();
    expect(typeof response.accessToken).toBe("string");
    expect(response.accessToken).toMatch(/^eyJ/); // JWT format
    expect(response.username).toBe(VALID_USER.username);
  });

  test("should return 400 for invalid credentials", async () => {
    const response = await authService.loginRaw({ username: "wrong", password: "wrong" });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toBeDefined();
  });

  test("should return 400 when password is missing", async () => {
    const response = await authService.loginRaw({ username: "emilys" });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toContain("required");
  });

  test("should get current user profile with valid token", async () => {
    const loginResponse = await authService.login(VALID_USER);
    const profile = await authService.getMe(loginResponse.accessToken);

    expect(profile.id).toBeDefined();
    expect(profile.username).toBe(VALID_USER.username);
    expect(profile.email).toBeDefined();
  });

  test("should return 401 when accessing profile without token", async () => {
    const response = await authService.getMeRaw("");

    expect(response.status()).toBe(401);
  });

  test("should refresh access token and return new accessToken", async () => {
    const loginResponse = await authService.login(VALID_USER);
    const refreshed = await authService.refreshAccessToken(loginResponse.refreshToken);

    expect(refreshed.accessToken).toBeDefined();
    expect(refreshed.accessToken).toMatch(/^eyJ/);
    expect(refreshed.refreshToken).toBeDefined();
  });
});
