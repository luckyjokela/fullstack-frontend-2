import { create } from "zustand";

interface UserState {
  updateProfile: any;
  id: string | null;
  email: string | null;
  username: string | null;
  isAuthenticated: boolean;
  login: (id: string, email: string, username: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: null,
  email: null,
  username: null,
  isAuthenticated: false,

  login: (id, email, username) => {
    // localStorage.setItem("user", JSON.stringify({ id, email, username}));
    set({ id, email, username, isAuthenticated: true });
  },

  logout: () => {
    fetch('/auth/logout', { method: 'POST' });
    
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    set({ id: null, email: null, isAuthenticated: false });
  },

  hydrate: () => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const { id, email, username } = JSON.parse(saved);
      set({ id, email, username, isAuthenticated: true });
    }
  },

  updateProfile: (data: {
    email?: string;
    username?: string;
    name?: string;
    middleName?: string;
    surname?: string;
  }) => {
    set((state) => {
      const updated = { ...state, ...data };
      localStorage.setItem("user", JSON.stringify({
        id: state.id,
        email: data.email || state.email,
        username: data.username || state.username,
        name: data.name,
        middleName: data.middleName,
        surname: data.surname,
      }));
      return updated;
    });
  },
}));
