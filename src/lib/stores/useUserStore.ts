import create from "zustand";

export type User = {
  id: string;
  email: string;
  password: string;
  username: string;
  created_at: Date;
};

interface IUseUserStore {
  user: Partial<User> | null;
  setUser: (user: Partial<User> | null) => void;
}

export const useUserStore = create<IUseUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
