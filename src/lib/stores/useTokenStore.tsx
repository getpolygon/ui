import create from "zustand";

interface IUseTokenStore {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (v: string) => void;
  setRefreshToken: (v: string) => void;
}

export const useTokenStore = create<IUseTokenStore>((set) => ({
  accessToken: "",
  refreshToken: "",
  setAccessToken: (v) => set({ accessToken: v }),
  setRefreshToken: (v) => set({ refreshToken: v }),
}));
