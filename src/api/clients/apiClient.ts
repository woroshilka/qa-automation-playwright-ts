import { APIRequestContext } from "@playwright/test";

type RequestData = Record<string, unknown>;
type RequestOptions = Record<string, unknown>;

export class ApiClient {
  constructor(
    private request: APIRequestContext,
    private baseURL: string = "",
  ) {}

  private getFullURL(url: string): string {
    return this.baseURL ? `${this.baseURL}${url}` : url;
  }

  async get(url: string, options: RequestOptions = {}) {
    return await this.request.get(this.getFullURL(url), options);
  }

  async post(url: string, data?: RequestData, options: RequestOptions = {}) {
    return await this.request.post(this.getFullURL(url), {
      data,
      ...options,
    });
  }

  async put(url: string, data?: RequestData, options: RequestOptions = {}) {
    return await this.request.put(this.getFullURL(url), {
      data,
      ...options,
    });
  }

  async delete(url: string, options: RequestOptions = {}) {
    return await this.request.delete(this.getFullURL(url), options);
  }

  async patch(url: string, data?: RequestData, options: RequestOptions = {}) {
    return await this.request.patch(this.getFullURL(url), {
      data,
      ...options,
    });
  }
}
