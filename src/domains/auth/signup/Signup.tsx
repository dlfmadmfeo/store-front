"use client";

import { useState } from "react";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import EyeOffIcon from "@/components/icons/EyeOffIcon";
import GlobeIcon from "@/components/icons/GlobeIcon";
import IdCardIcon from "@/components/icons/IdCardIcon";
import LockIcon from "@/components/icons/LockIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import UserIcon from "@/components/icons/UserIcon";
import { submitSignup } from "@/lib/api/signup";
import type { SignupRequest } from "@/lib/types/signup";

const initialForm: SignupRequest = {
  userId: "",
  password: "",
  email: "",
  name: "",
  birthDate: "",
  gender: "none",
  phone: "",
  countryCode: "+82",
};

export default function Signup() {
  const [form, setForm] = useState<SignupRequest>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; message: string } | null>(
    null,
  );

  const updateField = <K extends keyof SignupRequest>(key: K, value: SignupRequest[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!form.userId || !form.password || !form.name || !form.birthDate || !form.phone) {
      setFeedback({
        type: "error",
        message: "필수 정보를 모두 입력해 주세요.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await submitSignup(form);
      setFeedback({
        type: response.success ? "success" : "error",
        message: response.message,
      });

      if (response.success) {
        setForm(initialForm);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] px-4 py-5 sm:py-6">
      <div className="mx-auto max-w-[460px]">
        <div className="mb-5 flex items-end justify-between">
          <h1 className="text-[28px] font-extrabold leading-none tracking-[-2px] text-[#03c75a]">
            NAVER
          </h1>

          <button type="button" className="flex items-center justify-end text-[12px] text-[#8e8e8e]">
            다른 계정으로 가입
            <ChevronDownIcon className="ml-[4px] h-[14px] w-[14px] text-[#b8b8b8]" />
          </button>
        </div>

        <section
          aria-labelledby="signup-title"
          className="rounded-[18px] bg-white px-4 py-5 shadow-[0_10px_24px_rgba(15,23,42,0.06)] sm:px-5"
        >
          <div className="mb-5">
            <h2 id="signup-title" className="text-[22px] font-bold text-[#111827] sm:text-[24px]">
              회원가입
            </h2>
            <p className="mt-2 text-[14px] text-[#6b7280]">
              모바일에서도 입력 흐름이 자연스럽도록 필수 항목과 보조 정보를 분리했습니다.
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              void handleSubmit();
            }}
            aria-describedby="signup-feedback"
          >
            <Field label="아이디">
              <div className="flex items-center gap-3 rounded-[12px] border border-[#d9dcdf] px-4 py-4">
                <UserIcon className="h-[20px] w-[20px] text-[#b8b8b8]" size={24} />
                <input
                  type="text"
                  value={form.userId}
                  onChange={(event) => updateField("userId", event.target.value)}
                  placeholder="아이디"
                  className="min-w-0 flex-1 border-0 bg-transparent text-[16px] text-[#222] outline-none placeholder:text-[#b8b8b8]"
                  aria-label="아이디"
                />
                <span className="shrink-0 text-[14px] text-[#8e8e8e] sm:text-[15px]">@naver.com</span>
              </div>
            </Field>

            <Field label="비밀번호">
              <div className="flex items-center gap-3 rounded-[12px] border border-[#d9dcdf] px-4 py-4">
                <LockIcon className="h-[20px] w-[20px] text-[#b8b8b8]" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) => updateField("password", event.target.value)}
                  placeholder="비밀번호"
                  className="min-w-0 flex-1 border-0 bg-transparent text-[16px] text-[#222] outline-none placeholder:text-[#b8b8b8]"
                  aria-label="비밀번호"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  <EyeOffIcon className="h-[20px] w-[20px] text-[#b8b8b8]" useSlash={!showPassword} />
                </button>
              </div>
            </Field>

            <Field label="이메일">
              <div className="flex items-center gap-3 rounded-[12px] border border-[#d9dcdf] px-4 py-4">
                <EmailIcon className="h-[20px] w-[20px] text-[#b8b8b8]" size={20} />
                <input
                  type="email"
                  value={form.email ?? ""}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="[선택] 이메일 주소"
                  className="min-w-0 flex-1 border-0 bg-transparent text-[16px] text-[#222] outline-none placeholder:text-[#b8b8b8]"
                  aria-label="이메일 주소"
                />
              </div>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="이름">
                <div className="flex items-center gap-3 rounded-[12px] border border-[#d9dcdf] px-4 py-4">
                  <UserIcon className="h-[20px] w-[20px] text-[#b8b8b8]" size={20} />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="이름"
                    className="min-w-0 flex-1 border-0 bg-transparent text-[16px] text-[#222] outline-none placeholder:text-[#b8b8b8]"
                    aria-label="이름"
                  />
                </div>
              </Field>

              <Field label="생년월일">
                <div className="flex items-center gap-3 rounded-[12px] border border-[#d9dcdf] px-4 py-4">
                  <IdCardIcon className="h-[20px] w-[20px] text-[#b8b8b8]" />
                  <input
                    type="text"
                    value={form.birthDate}
                    onChange={(event) => updateField("birthDate", event.target.value)}
                    placeholder="생년월일 8자리"
                    className="min-w-0 flex-1 border-0 bg-transparent text-[16px] text-[#222] outline-none placeholder:text-[#b8b8b8]"
                    aria-label="생년월일"
                  />
                </div>
              </Field>
            </div>

            <Field label="성별">
              <div className="grid h-[52px] grid-cols-3 overflow-hidden rounded-[12px] border border-[#d9dcdf]">
                <GenderButton active={form.gender === "male"} onClick={() => updateField("gender", "male")}>
                  남자
                </GenderButton>
                <GenderButton active={form.gender === "female"} onClick={() => updateField("gender", "female")}>
                  여자
                </GenderButton>
                <GenderButton active={form.gender === "none"} onClick={() => updateField("gender", "none")}>
                  선택안함
                </GenderButton>
              </div>
            </Field>

            <p className="text-[12px] leading-[18px] text-[#03c75a]">
              입력한 이름, 생년월일, 성별 정보가 실제 정보와 다르면 가입이 제한될 수 있습니다.
            </p>

            <Field label="휴대전화">
              <div className="space-y-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-[12px] border border-[#d9dcdf] px-4 py-4"
                  aria-label="국가 코드 선택"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <GlobeIcon className="h-[20px] w-[20px] shrink-0 text-[#666]" />
                    <span className="truncate text-[16px] text-[#222]">대한민국 {form.countryCode}</span>
                  </div>
                  <ChevronDownIcon className="h-[18px] w-[18px] text-[#b8b8b8]" />
                </button>

                <div className="flex items-center gap-3 rounded-[12px] border border-[#d9dcdf] px-4 py-4">
                  <PhoneIcon className="h-[20px] w-[20px] text-[#b8b8b8]" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder="휴대전화번호"
                    className="min-w-0 flex-1 border-0 bg-transparent text-[16px] text-[#222] outline-none placeholder:text-[#b8b8b8]"
                    aria-label="휴대전화번호"
                  />
                </div>
              </div>
            </Field>

            <p
              id="signup-feedback"
              className={`text-[14px] font-medium ${feedback?.type === "success" ? "text-[#16a34a]" : "text-[#dc2626]"}`}
              role={feedback ? "status" : undefined}
              aria-live="polite"
            >
              {feedback?.message ?? ""}
            </p>

            <div className="pt-2">
              <button
                type="submit"
                className="h-[56px] w-full rounded-[12px] bg-[#09b83e] text-[17px] font-bold text-white disabled:bg-[#9fd8b0] sm:text-[18px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "가입 요청 중..." : "가입 요청"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-[14px] font-semibold text-[#111827]">{label}</div>
      {children}
    </div>
  );
}

function GenderButton({
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
      aria-pressed={active}
      onClick={onClick}
      className={[
        "border-r border-[#d9dcdf] px-1 text-[14px] transition-colors last:border-r-0 sm:text-[15px]",
        active ? "bg-[#effcf4] font-semibold text-[#03c75a]" : "bg-white text-[#666]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
