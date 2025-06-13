import { create } from "zustand";
import { EKey } from "../../constants/commons";

type AuthStore = {
  isLogin: boolean;
  user: any;
  setLogin: (isLogin: boolean) => void;
  setUser: (user: any) => void;
  logout: () => void;
  openLoginCustomer: boolean;
  setOpenLoginCustomer: (openLoginCustomer: boolean) => void;
};

export const useAuth = create<AuthStore>((set: any) => ({
  isLogin: false,
  openLoginCustomer: false,
  user: null,
  setLogin: (isLogin) => set({ isLogin }),
  setOpenLoginCustomer: (openLoginCustomer) => set({ openLoginCustomer }),
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem(EKey.TOKEN_GUEST);
    set({ isLogin: false });
  },
}));
