export const ENV = {
  BASE_URL: process.env.BASE_URL || "https://www.saucedemo.com",
  BASE_URL_PATH: process.env.BASE_URL_PATH || "/",
  API_URL: process.env.API_URL || "https://jsonplaceholder.typicode.com",
  AUTH_URL: process.env.AUTH_URL || "https://dummyjson.com",
  TEST_USERNAME: process.env.TEST_USERNAME || "standard_user",
  TEST_PASSWORD: process.env.TEST_PASSWORD || "secret_sauce",
  TIMEOUT: parseInt(process.env.TIMEOUT || "30000"),
  DEBUG: process.env.DEBUG === "true",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};

