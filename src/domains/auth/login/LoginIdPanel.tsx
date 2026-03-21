import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import CloseCircleIcon from "@/components/icons/CloseCircleIcon";
import EyeOffIcon from "@/components/icons/EyeOffIcon";
import Switch from "@/components/Switch";
import { KeyboardEvent, useState } from "react";
import { mockLoginApi } from "./api/login.mock";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

export default function LoginIdPanel() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState<boolean>(false);
  const [keepLogin, setKeepLogin] = useState(false);
  const [loginValidMsg, setLoginValidMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const login = async (e: Event) => {
    // e.preventDefault();
    if (loading) return;
    if (!userId) return setLoginValidMsg("아이디를 입력하세요.");
    if (!password) return setLoginValidMsg("비밀번호를 입력하세요.");
    clearMessage();
    try {
      setLoading(true);
      const response = await mockLoginApi({ userId, password });
      if (response.success) {
        useUserStore.getState().login({
          id: "admin",
          name: "조준희",
          email: "admin@naver.com",
        });
        alert("로그인 성공");
        router.replace("/");
      } else {
        alert("로그인 실패");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearMessage = () => {
    setLoginValidMsg("");
  };

  return (
    <>
      <div className="login_box">
        <div className="relative border border-gray-300 p-2 rounded-tl-xl rounded-tr-lg -mb-[1px]">
          <input
            autoFocus
            placeholder=" "
            className="peer w-full bg-transparent outline-none pt-4 pl-2 pb-1"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                login(e);
              }
            }}
          />
          <label
            className={[
              `absolute top-0 left-4 text-gray-500`,
              userId ? "top-2 text-xs" : "",
              "transition-all duration-300",
              "peer-placeholder-shown:text-[16px]",
              "peer-placeholder-shown:top-4",
              "peer-placeholder-shown:text-gray-400",
              "peer-focus:top-2",
              "peer-focus:text-xs",
              "pointer-events-none",
            ].join(" ")}
          >
            아이디
          </label>
          {userId && (
            <button
              tabIndex={-1}
              className="cursor-pointer"
              onClick={() => {
                setUserId("");
              }}
            >
              <CloseCircleIcon
                className="absolute right-4  top-1/2 -translate-y-1/2"
                size={14}
              />
            </button>
          )}
        </div>

        <div className="relative border border-gray-300 p-2 rounded-bl-xl rounded-br-lg">
          <input
            type={showPw ? "text" : "password"}
            placeholder=" "
            className="peer w-full bg-transparent outline-none pt-4 pl-2 pb-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                login();
              }
            }}
          />
          <button
            tabIndex={-1}
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-14 top-1/2 -translate-y-1/2"
            aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {password ? (
              <EyeOffIcon
                className="w-[14px] text-black cursor-pointer"
                useSlash={!showPw}
              />
            ) : null}
            {/* {showPw ? "숨김" : "보기"} */}
          </button>
          <label
            className={[
              `absolute top-0 left-4 text-gray-500`,
              password ? "top-2 text-xs" : "",
              "transition-all duration-300",
              "peer-placeholder-shown:text-[16px]",
              "peer-placeholder-shown:top-4",
              "peer-placeholder-shown:text-gray-400",
              "peer-focus:top-2",
              "peer-focus:text-xs",
              "pointer-events-none",
            ].join(" ")}
          >
            비밀번호
          </label>
          {password && (
            <button
              tabIndex={-1}
              className="cursor-pointer"
              onClick={() => {
                setPassword("");
              }}
            >
              <CloseCircleIcon
                className="absolute right-4  top-1/2 -translate-y-1/2"
                size={14}
              />
            </button>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between px-1">
          {/* 로그인 상태 유지 */}
          <button
            onClick={() => setKeepLogin(!keepLogin)}
            className="cursor-pointer"
          >
            <div className="flex">
              <CheckCircleIcon
                className="w-[20px]"
                checked={keepLogin}
              />
              <span className="text-sm text-gray-500 ml-2">로그인 상태 유지</span>
            </div>
          </button>
          {/* IP 보안 */}
          <div className="ip_check flex mt-[8px]">
            <a href="">
              <span className="text-sm text-gray-500">IP보안</span>
            </a>
            {/*  */}

            <div className="ml-2">
              <Switch checked={true} />
            </div>
          </div>
        </div>
        <div className="mt-2">
          {/* Validation */}
          <div className="text-red-500 text-sm font-medium py-1">
            <span>{loginValidMsg}</span>
          </div>
          {/* 로그인 버튼 */}
          <button
            className={[
              "w-full  py-3 rounded-md text-white font-bold cursor-pointer",
              userId && password ? "bg-naver" : "bg-gray-400",
            ].join(" ")}
            onClick={login}
          >
            로그인
          </button>
        </div>
      </div>
    </>
  );
}
