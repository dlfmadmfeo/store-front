import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import CloseCircleIcon from "@/components/icons/CloseCircleIcon";
import EyeOffIcon from "@/components/icons/EyeOffIcon";
import Switch from "@/components/Switch";
import { loginWithMockApi } from "@/lib/api/auth";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginIdPanel() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [keepLogin, setKeepLogin] = useState(false);
  const [loginValidMsg, setLoginValidMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const login = async () => {
    if (loading) return;
    if (!userId) return setLoginValidMsg("아이디를 입력해 주세요.");
    if (!password) return setLoginValidMsg("비밀번호를 입력해 주세요.");

    setLoginValidMsg("");

    try {
      setLoading(true);
      const response = await loginWithMockApi({ userId, password });

      if (response.success && response.payload) {
        useUserStore.getState().login({
          id: response.payload.id,
          name: response.payload.name,
          email: response.payload.email,
        });

        alert("로그인에 성공했습니다.");
        router.replace("/");
      } else {
        setLoginValidMsg(response.message ?? "로그인에 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="login_box"
      onSubmit={(event) => {
        event.preventDefault();
        void login();
      }}
      aria-describedby="login-feedback"
    >
      <div className="relative -mb-[1px] rounded-tl-xl rounded-tr-lg border border-gray-300 p-2">
        <input
          autoFocus
          placeholder=" "
          className="peer w-full bg-transparent pb-1 pl-2 pt-4 outline-none"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          aria-label="아이디"
          aria-invalid={Boolean(loginValidMsg) && !userId}
        />
        <label
          className={[
            "pointer-events-none absolute left-4 top-0 text-gray-500",
            userId ? "top-2 text-xs" : "",
            "transition-all duration-300",
            "peer-placeholder-shown:top-4",
            "peer-placeholder-shown:text-[16px]",
            "peer-placeholder-shown:text-gray-400",
            "peer-focus:top-2",
            "peer-focus:text-xs",
          ].join(" ")}
        >
          아이디
        </label>
        {userId ? (
          <button
            type="button"
            tabIndex={-1}
            className="cursor-pointer"
            onClick={() => {
              setUserId("");
            }}
            aria-label="아이디 지우기"
          >
            <CloseCircleIcon
              className="absolute right-4 top-1/2 -translate-y-1/2"
              size={14}
            />
          </button>
        ) : null}
      </div>

      <div className="relative rounded-bl-xl rounded-br-lg border border-gray-300 p-2">
        <input
          type={showPw ? "text" : "password"}
          placeholder=" "
          className="peer w-full bg-transparent pb-1 pl-2 pt-4 outline-none"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-label="비밀번호"
          aria-invalid={Boolean(loginValidMsg) && !password}
        />
        <button
          tabIndex={-1}
          type="button"
          onClick={() => setShowPw((value) => !value)}
          className="absolute right-14 top-1/2 -translate-y-1/2"
          aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
          {password ? (
            <EyeOffIcon
              className="w-[14px] cursor-pointer text-black"
              useSlash={!showPw}
            />
          ) : null}
        </button>
        <label
          className={[
            "pointer-events-none absolute left-4 top-0 text-gray-500",
            password ? "top-2 text-xs" : "",
            "transition-all duration-300",
            "peer-placeholder-shown:top-4",
            "peer-placeholder-shown:text-[16px]",
            "peer-placeholder-shown:text-gray-400",
            "peer-focus:top-2",
            "peer-focus:text-xs",
          ].join(" ")}
        >
          비밀번호
        </label>
        {password ? (
          <button
            type="button"
            tabIndex={-1}
            className="cursor-pointer"
            onClick={() => {
              setPassword("");
            }}
            aria-label="비밀번호 지우기"
          >
            <CloseCircleIcon
              className="absolute right-4 top-1/2 -translate-y-1/2"
              size={14}
            />
          </button>
        ) : null}
      </div>

      <div className="mt-3 flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => setKeepLogin(!keepLogin)}
          className="cursor-pointer"
          aria-pressed={keepLogin}
        >
          <div className="flex">
            <CheckCircleIcon
              className="w-[20px]"
              checked={keepLogin}
            />
            <span className="ml-2 text-sm text-gray-500">로그인 상태 유지</span>
          </div>
        </button>

        <div className="ip_check mt-[8px] flex">
          <button
            type="button"
            className="text-sm text-gray-500"
          >
            IP보안
          </button>

          <div className="ml-2">
            <Switch checked />
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div
          id="login-feedback"
          className="py-1 text-sm font-medium text-red-500"
          role={loginValidMsg ? "alert" : undefined}
          aria-live="polite"
        >
          <span>{loginValidMsg}</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={[
            "w-full cursor-pointer rounded-md py-3 font-bold text-white",
            userId && password ? "bg-naver" : "bg-gray-400",
          ].join(" ")}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </div>
    </form>
  );
}
