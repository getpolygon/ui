import create from "zustand";

interface IUseTokenStore {
  tokens: {
    access: string | null;
    refresh: string | null;
  };
  setAccess: (access: string | null) => void;
  setRefresh: (refresh: string | null) => void;
}

export const useTokenStore = create<IUseTokenStore>((set) => ({
  tokens: {
    access: null,
    refresh: null,
  },

  setAccess: (access) =>
    set((state) => ({ tokens: { ...state.tokens, access } })),
  setRefresh: (refresh) =>
    set((state) => ({ tokens: { ...state.tokens, refresh } })),
}));
