import { create } from "zustand";

type StoreNotification = {
  message: string;
  status: number;
};

type NotificationStore = {
  message: string;
  status: number;
  open: boolean;
  showNotification: (payload: StoreNotification) => void;
  hideNotification: () => void;
};

export const useStoreNotification = create<NotificationStore>((set: any) => ({
  message: "",
  status: 0,
  open: false,

  showNotification: ({ message, status = 200 }: StoreNotification) =>
    set({ message, status, open: true }),

  hideNotification: () => set({ open: false }),
}));
