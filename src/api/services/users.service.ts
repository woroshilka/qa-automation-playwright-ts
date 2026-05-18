import { ApiClient } from "../clients/apiClient";
import { endpoints } from "../endpoints";

interface User {
  id: number;
  name: string;
  email: string;
  [key: string]: unknown;
}

interface UserPayload extends Record<string, unknown> {
  name: string;
  email: string;
}

export class UsersService {
  constructor(private apiClient: ApiClient) {}

  async getAllUsers(): Promise<User[]> {
    const response = await this.apiClient.get(endpoints.users.getAll);
    return await response.json();
  }

  async getUserById(id: number): Promise<User> {
    const response = await this.apiClient.get(endpoints.users.getById(id));
    return await response.json();
  }

  async createUser(userData: UserPayload): Promise<User> {
    const response = await this.apiClient.post(
      endpoints.users.getAll,
      userData,
    );
    return await response.json();
  }

  async updateUser(id: number, userData: UserPayload): Promise<User> {
    const response = await this.apiClient.put(
      endpoints.users.getById(id),
      userData,
    );
    return await response.json();
  }

  async deleteUser(id: number) {
    return await this.apiClient.delete(endpoints.users.getById(id));
  }

  async getUserStatusCode(id: number): Promise<number> {
    const response = await this.apiClient.get(endpoints.users.getById(id));
    return response.status();
  }
}
