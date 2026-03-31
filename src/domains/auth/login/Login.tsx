import Link from "next/link";
import ChevronBottomIcon from "@/components/icons/ChevronBottomIcon";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#f7f9fb] px-4 py-5 sm:py-6">
      <div className="mx-auto max-w-[420px]">
        <div className="flex justify-end">
          <div className="relative w-fit">
            <select
              className="cursor-pointer appearance-none rounded-md border border-gray-200 bg-white py-1 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
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

        <div className="mt-8 sm:mt-10">
          <LoginForm />

          <div className="mt-4">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-500 sm:gap-x-10">
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
    </div>
  );
}
