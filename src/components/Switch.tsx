"use client";

import { useState } from "react";

type Props = {
  checked?: boolean;
  onChange?: (value: boolean) => void;
};

export default function Switch({ checked = false, onChange }: Props) {
  const [isOn, setIsOn] = useState(checked);

  const toggle = () => {
    const next = !isOn;
    setIsOn(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`
        relative inline-flex h-6 w-13 items-center rounded-full
        transition-colors duration-200
        cursor-pointer
        ${isOn ? "bg-naver" : "bg-gray-400"}
      `}
    >
      {/* ON TEXT */}
      {isOn ? (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] font-bold text-white">
          ON
        </span>
      ) : (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-bold text-white">
          OFF
        </span>
      )}

      {/* Thumb */}
      <span
        className={`
          absolute
            inline-block h-4 w-4 transform rounded-full bg-white
          transition-transform duration-200
          ${isOn ? "translate-x-8" : "translate-x-1"}
        `}
      />
    </button>
  );
}
