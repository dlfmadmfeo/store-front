"use client";

import { create } from "zustand";
import { useAddressStore } from "./useAddressStore";

export type User = {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
};

type UserState = {
  user: User | null;
  isLoggedIn: boolean;

  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,

  login: (user) => {
    set({
      user,
      isLoggedIn: true,
    });
  },

  logout: () => {
    set({
      user: null,
      isLoggedIn: false,
    });

    // 로그아웃 시 배송지 상태 초기화
    useAddressStore.getState().reset();
  },

  setUser: (user) => {
    set({
      user,
      isLoggedIn: !!user,
    });

    if (!user) {
      useAddressStore.getState().reset();
    }
  },
}));