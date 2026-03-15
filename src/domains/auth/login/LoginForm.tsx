"use client";

import { useState } from "react";
import LoginIdPanel from "./LoginIdPanel";

type TabKey = "id" | "otp" | "qr";

export default function LoginForm() {
  const [tab, setTab] = useState<TabKey>("id");

  return (
    <>
      <div>
        <div>
          <div className="text-naver font-extrabold text-4xl text-center">NAVER</div>
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

            {/* 탭 컨텐츠 카드 (스샷의 박스) */}
            <div className="rounded-b-2xl border border-gray-200 bg-white p-6">
              {tab === "id" && (
                <div>
                  <LoginIdPanel />
                </div>
              )}
              {tab === "otp" && <div>여기에 일회용번호 폼</div>}
              {tab === "qr" && <div>여기에 QR 안내</div>}
            </div>
          </div>
        </div>
      </div>
    </>
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
        "cursor-pointer",
        "flex-1 px-4 py-3 text-sm font-semibold",
        "border border-gray-200",
        "first:rounded-tl-2xl last:rounded-tr-2xl",
        "transition",
        active
          ? [
              "bg-white text-gray-900",
              "border-b-white", // 아래 카드와 연결되게
              "-mb-px", // border 겹침 1px 제거 (핵심)
            ].join(" ")
          : "bg-gray-50 text-gray-500 hover:text-gray-700",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
