"use client";

import { useState } from "react";
import LoginIdPanel from "./LoginIdPanel";

type TabKey = "id" | "otp" | "qr";

export default function LoginForm() {
  const [tab, setTab] = useState<TabKey>("id");

  return (
    <div>
      <div className="text-center text-4xl font-extrabold text-naver">NAVER</div>
      <div className="mt-8">
        <div className="flex">
          <TabButton
            active={tab === "id"}
            onClick={() => {
              setTab("id");
            }}
          >
            ID/전화번호
          </TabButton>
          <TabButton
            active={tab === "otp"}
            onClick={() => {
              setTab("otp");
            }}
          >
            일회용 번호
          </TabButton>
          <TabButton
            active={tab === "qr"}
            onClick={() => {
              setTab("qr");
            }}
          >
            QR 코드
          </TabButton>
        </div>

        <div className="rounded-b-2xl border border-gray-200 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
          {tab === "id" ? <LoginIdPanel /> : null}
          {tab === "otp" ? <PlaceholderPanel title="일회용 번호 로그인 준비 중" /> : null}
          {tab === "qr" ? <PlaceholderPanel title="QR 코드 로그인 안내 준비 중" /> : null}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex-1 cursor-pointer border border-gray-200 px-4 py-3 text-sm font-semibold transition",
        "first:rounded-tl-2xl last:rounded-tr-2xl",
        active ? "border-b-white bg-white -mb-px text-gray-900" : "bg-gray-50 text-gray-500 hover:text-gray-700",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function PlaceholderPanel({ title }: { title: string }) {
  return (
    <div className="rounded-[16px] border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-[14px] text-gray-500">
      {title}
    </div>
  );
}
