import ChevronBottomIcon from "@/components/icons/ChevronBottomIcon";
import LoginForm from "./LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <div className="min-h-screen p-2">
        <div className="flex justify-end">
          {/* 언어 선택 (우상단) */}
          <div className="relative w-fit">
            <select
              className="rounded-md border border-gray-200
            pl-3 pr-8 py-1 text-sm text-gray-700 focus:outline-none
            focus:ring-1 focus:ring-gray-400
            bg-white cursor-pointer appearance-none"
              defaultValue="ko"
              aria-label="언어 선택"
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="zh">中文</option>
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <ChevronBottomIcon />
            </span>
          </div>
        </div>

        <div className="w-full h-screen md:w-[420px] md:h-[600px] mx-auto">
          <LoginForm />
          {/* 비밀번호 찾기 / 아이디 찾기 */}
          <div className="mt-2">
            <ul className="flex justify-center gap-10 text-gray-500 font-medium text-sm">
              <li>
                <Link href="/find-pwd">비밀번호 찾기</Link>
              </li>
              <li>
                <Link href="/find-id">아이디 찾기</Link>
              </li>
              <li>
                <Link href="/signup">회원가입</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
