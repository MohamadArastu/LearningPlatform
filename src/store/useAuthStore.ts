import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  username: string;
  role: "user" | "admin";
  token: string; // Simulating a JWT token
}

interface AuthStore {
  user: User | null;
  login: (username: string, password?: string) => Promise<void>;
  register: (username: string, password?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (username) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulated API response
        const fakeToken = "fake-jwt-token-123456";
        const user: User = {
          username,
          role: username === "admin" ? "admin" : "user",
          token: fakeToken,
        };

        set({ user, isAuthenticated: true });
      },

      register: async (username) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const fakeToken = "fake-jwt-token-654321";
        const user: User = { username, role: "user", token: fakeToken };

        set({ user, isAuthenticated: true });
      },

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
