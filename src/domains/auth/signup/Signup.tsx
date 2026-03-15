import UserIcon from "@/components/icons/UserIcon";
import LockIcon from "@/components/icons/LockIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import IdCardIcon from "@/components/icons/IdCardIcon";
import GlobeIcon from "@/components/icons/GlobeIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import EyeOffIcon from "@/components/icons/EyeOffIcon";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";

export default function Signup() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[460px] pt-[22px]">
        <div className="flex justify-between items-end mb-[8px]">
          <h1 className="text-[28px] font-extrabold leading-none tracking-[-2px] text-[#03c75a]">
            NAVER
          </h1>

          <div className="flex items-center justify-end text-[12px] text-[#8e8e8e]">
            <span>실명 인증된 아이디로 가입</span>
            <ChevronDownIcon className="ml-[4px] h-[14px] w-[14px] text-[#b8b8b8]" />
          </div>
        </div>

        <div className="overflow-hidden rounded-[6px] border border-[#d9dcdf] bg-white">
          <div className="flex h-[58px] items-center border-b border-[#eceef0] px-[16px]">
            <UserIcon
              className="mr-[12px] h-[20px] w-[20px] text-[#b8b8b8]"
              size={24}
            />
            <input
              type="text"
              placeholder="아이디"
              className="h-full flex-1 border-0 bg-transparent p-0 text-[16px] text-[#222] outline-none placeholder:text-[#b8b8b8]"
            />
            <span className="text-[16px] text-[#8e8e8e]">@naver.com</span>
          </div>

          <div className="flex h-[58px] items-center border-b border-[#eceef0] px-[16px]">
            <LockIcon className="mr-[12px] h-[20px] w-[20px] text-[#b8b8b8]" />
            <input
              type="password"
              placeholder="비밀번호"
              className="h-full flex-1 border-0 bg-transparent p-0 text-[16px] text-[#222] outline-none placeholder:text-[#b8b8b8]"
            />
            <button
              type="button"
              aria-label="비밀번호 표시"
            >
              <EyeOffIcon className="ml-[8px] h-[20px] w-[20px] text-[#b8b8b8]" />
            </button>
          </div>

          <div className="flex h-[58px] items-center px-[16px]">
            <EmailIcon className="mr-[12px] h-[20px] w-[20px] text-[#b8b8b8]" />
            <input
              type="text"
              placeholder="[선택] 이메일주소 (비밀번호 찾기 등 본인 확인용)"
              className="h-full flex-1 border-0 bg-transparent p-0 text-[16px] text-[#222] outline-none placeholder:text-[#b8b8b8]"
            />
          </div>
        </div>

        <div className="mt-[12px] overflow-hidden rounded-[6px] border border-[#d9dcdf] bg-white">
          <div className="flex h-[58px] items-center border-b border-[#eceef0] px-[16px]">
            <UserIcon className="mr-[12px] h-[20px] w-[20px] text-[#b8b8b8]" />
            <input
              type="text"
              placeholder="이름"
              className="h-full flex-1 border-0 bg-transparent p-0 text-[16px] text-[#222] outline-none placeholder:text-[#b8b8b8]"
            />
          </div>

          <div className="flex h-[58px] items-center border-b border-[#eceef0] px-[16px]">
            <IdCardIcon className="mr-[12px] h-[20px] w-[20px] text-[#b8b8b8]" />
            <input
              type="text"
              placeholder="생년월일 8자리"
              className="h-full flex-1 border-0 bg-transparent p-0 text-[16px] text-[#222] outline-none placeholder:text-[#b8b8b8]"
            />
          </div>

          <div className="p-[10px]">
            <div className="grid h-[48px] grid-cols-3 overflow-hidden rounded-[4px] border border-[#d9dcdf]">
              <button
                type="button"
                className="border-r border-[#d9dcdf] bg-white text-[15px] text-[#666]"
              >
                남자
              </button>
              <button
                type="button"
                className="border-r border-[#d9dcdf] bg-white text-[15px] text-[#666]"
              >
                여자
              </button>
              <button
                type="button"
                className="bg-white text-[15px] text-[#9a9a9a]"
              >
                선택안함
              </button>
            </div>
          </div>
        </div>

        <p className="mt-[10px] text-[12px] leading-[16px] text-[#03c75a]">
          신분증상의 이름, 생년월일, 성별과 일치하지 않으면 실명인증이 불가합니다.
        </p>

        <div className="mt-[12px] overflow-hidden rounded-[6px] border border-[#d9dcdf] bg-white">
          <button
            type="button"
            className="flex h-[58px] w-full items-center justify-between border-b border-[#eceef0] px-[16px]"
          >
            <div className="flex items-center">
              <GlobeIcon className="mr-[12px] h-[20px] w-[20px] text-[#666]" />
              <span className="text-[16px] text-[#222]">대한민국 +82</span>
            </div>
            <ChevronDownIcon className="h-[18px] w-[18px] text-[#b8b8b8]" />
          </button>

          <div className="flex h-[58px] items-center px-[16px]">
            <PhoneIcon className="mr-[12px] h-[20px] w-[20px] text-[#b8b8b8]" />
            <input
              type="text"
              placeholder="휴대전화번호"
              className="h-full flex-1 border-0 bg-transparent p-0 text-[16px] text-[#222] outline-none placeholder:text-[#b8b8b8]"
            />
          </div>
        </div>

        <div className="pt-[32px] pb-[24px]">
          <button
            type="button"
            className="h-[56px] w-full rounded-[8px] bg-[#09b83e] text-[20px] font-bold text-white"
          >
            인증요청
          </button>
        </div>
      </div>
    </div>
  );
}
