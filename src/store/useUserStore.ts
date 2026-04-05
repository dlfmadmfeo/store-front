"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginPayload } from "@/lib/types/auth";
import { useAddressStore } from "./useAddressStore";

export type User = Pick<LoginPayload, "id" | "name" | "email"> & {
  profileImageUrl?: string;
};

type UserState = {
  user: User | null;
  isLoggedIn: boolean;

  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "user-store",
    },
  ),
);
