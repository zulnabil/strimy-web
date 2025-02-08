import { config } from "~/app/common/constants/config";

const { BASE_URL, ACCESS_TOKEN } = config;

export async function apiClient(endpoint: string, options: RequestInit = {}) {
  try {
    const defaultHeaders = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    };

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} - ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error instanceof Error
      ? error
      : new Error("An unknown error occurred");
  }
}
