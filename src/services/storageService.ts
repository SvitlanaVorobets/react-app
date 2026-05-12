const STORAGE_KEYS = {
  TOKEN: 'token',
} as const;

class StorageService {
  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  getToken(): string | null {
    return this.get(STORAGE_KEYS.TOKEN);
  }

  setToken(token: string): void {
    this.set(STORAGE_KEYS.TOKEN, token);
  }

  removeToken(): void {
    this.remove(STORAGE_KEYS.TOKEN);
  }
}

export const storageService = new StorageService();
