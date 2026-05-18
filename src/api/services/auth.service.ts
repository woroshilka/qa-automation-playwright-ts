import { ApiClient } from "../clients/apiClient";
import { endpoints } from "../endpoints";

interface AuthCredentials extends Record<string, unknown> {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export class AuthService {
  constructor(private apiClient: ApiClient) {}

  async login(credentials: AuthCredentials): Promise<LoginResponse> {
    const response = await this.apiClient.post(endpoints.auth.login, credentials);
    return await response.json();
  }

  async loginRaw(credentials: Record<string, unknown>) {
    return this.apiClient.post(endpoints.auth.login, credentials);
  }

  async getMe(accessToken: string): Promise<LoginResponse> {
    const response = await this.apiClient.get(endpoints.auth.me, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return await response.json();
  }

  async getMeRaw(accessToken: string) {
    return this.apiClient.get(endpoints.auth.me, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await this.apiClient.post(endpoints.auth.refresh, { refreshToken });
    return await response.json();
  }
}
