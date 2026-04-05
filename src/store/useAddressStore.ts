"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUserStore } from "./useUserStore";

export type ShippingAddress = {
  id: string;
  recipient: string;
  roadAddress: string;
  detailAddress: string;
  zipCode?: string;
  phone?: string;
  deliveryMemo?: string;
  isDefault?: boolean;
};

type AddressState = {
  addresses: ShippingAddress[];
  selectedAddressId: string | null;

  selectedAddress: () => ShippingAddress | null;

  setAddresses: (addresses: ShippingAddress[]) => void;
  setSelectedAddress: (id: string) => void;
  addAddress: (address: ShippingAddress) => void;
  updateAddress: (address: ShippingAddress) => void;
  removeAddress: (id: string) => void;
  reset: () => void;
};

const initialAddresses: ShippingAddress[] = [
  {
    id: "addr-1",
    recipient: "조주연",
    roadAddress: "서울특별시 성북구 길음로길 40",
    detailAddress: "(길음동 삼성래미안) 108동 1602호",
    zipCode: "02725",
    phone: "010-1234-5678",
    deliveryMemo: "문 앞에 놓아주세요.",
    isDefault: true,
  },
];

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: initialAddresses,
      selectedAddressId: "addr-1",

      selectedAddress: () => {
        const { isLoggedIn } = useUserStore.getState();
        if (!isLoggedIn) return null;

        const { addresses, selectedAddressId } = get();
        if (!selectedAddressId) return null;

        return addresses.find((address) => address.id === selectedAddressId) ?? null;
      },

      setAddresses: (addresses) => {
        const { isLoggedIn } = useUserStore.getState();
        if (!isLoggedIn) return;

        set({
          addresses,
          selectedAddressId: addresses[0]?.id ?? null,
        });
      },

      setSelectedAddress: (id) => {
        const { isLoggedIn } = useUserStore.getState();
        if (!isLoggedIn) return;

        set({ selectedAddressId: id });
      },

      addAddress: (address) => {
        const { isLoggedIn } = useUserStore.getState();
        if (!isLoggedIn) return;

        set((state) => ({
          addresses: [...state.addresses, address],
        }));
      },

      updateAddress: (updatedAddress) => {
        const { isLoggedIn } = useUserStore.getState();
        if (!isLoggedIn) return;

        set((state) => ({
          addresses: state.addresses.map((address) =>
            address.id === updatedAddress.id ? updatedAddress : address,
          ),
        }));
      },

      removeAddress: (id) => {
        const { isLoggedIn } = useUserStore.getState();
        if (!isLoggedIn) return;

        set((state) => {
          const nextAddresses = state.addresses.filter((address) => address.id !== id);

          const nextSelectedAddressId =
            state.selectedAddressId === id ? (nextAddresses[0]?.id ?? null) : state.selectedAddressId;

          return {
            addresses: nextAddresses,
            selectedAddressId: nextSelectedAddressId,
          };
        });
      },

      reset: () => {
        set({
          addresses: [],
          selectedAddressId: null,
        });
      },
    }),
    {
      name: "address-store",
    },
  ),
);
