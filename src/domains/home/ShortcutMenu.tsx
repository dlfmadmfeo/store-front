import Link from "next/link";
import Image from "next/image";

type ShortcutItem = {
  key: string;
  label: string;
  href: string;
  src: string; // 이미지 아이콘일 때
  icon?: React.ReactNode; // SVG/컴포넌트 아이콘일 때
};

const items: ShortcutItem[] = [
  {
    key: "holiday",
    label: "연휴 끝까지",
    href: "https://shop-phinf.pstatic.net/20260213_38/177094075760953i3x_GIF/EC97B0ED9CB4EB819DEBB0B0EC86A1_ED80B5EBA781ED81AC_120x12.gif?type=f305_305",
    src: "/images/shortcut_1.gif",
  },
  {
    key: "new",
    label: "신상선오픈",
    href: "https://shop-phinf.pstatic.net/20260212_262/1770858983004UW6Yd_PNG/favicon_EBA3A8EC9790EBB88CEBA5B4.png?type=f156_png",
    src: "/images/shortcut_2.gif",
  },
  {
    key: "today",
    label: "오늘끝딜",
    href: "https://shop-phinf.pstatic.net/20260210_155/1770708349691bdVLe_PNG/favicon_EC98A4EB8A98EB819DEB949C_26EB85842EC9B9410EC9DBC%2BE.png?type=f156_png",
    src: "/images/shortcut_3.gif",
  },
  {
    key: "kurly",
    label: "컬리N마트",
    href: "https://shop-phinf.pstatic.net/20260115_97/17684736223736n3iS_PNG/favicon_ECBBACEBA6ACEBA788ED8AB8_EC8898ECA095.png?type=f156_png",
    src: "/images/shortcut_4.gif",
  },
  { key: "point", label: "슈퍼적립", href: "/point", src: "/images/shortcut_5.gif" },

  {
    key: "holiday1",
    label: "연휴 끝까지",
    href: "https://shop-phinf.pstatic.net/20260213_38/177094075760953i3x_GIF/EC97B0ED9CB4EB819DEBB0B0EC86A1_ED80B5EBA781ED81AC_120x12.gif?type=f305_305",
    src: "/images/shortcut_1.gif",
  },
  {
    key: "new1",
    label: "신상선오픈",
    href: "https://shop-phinf.pstatic.net/20260212_262/1770858983004UW6Yd_PNG/favicon_EBA3A8EC9790EBB88CEBA5B4.png?type=f156_png",
    src: "/images/shortcut_2.gif",
  },
  {
    key: "today1",
    label: "오늘끝딜",
    href: "https://shop-phinf.pstatic.net/20260210_155/1770708349691bdVLe_PNG/favicon_EC98A4EB8A98EB819DEB949C_26EB85842EC9B9410EC9DBC%2BE.png?type=f156_png",
    src: "/images/shortcut_3.gif",
  },
  {
    key: "kurly1",
    label: "컬리N마트",
    href: "https://shop-phinf.pstatic.net/20260115_97/17684736223736n3iS_PNG/favicon_ECBBACEBA6ACEBA788ED8AB8_EC8898ECA095.png?type=f156_png",
    src: "/images/shortcut_4.gif",
  },
  { key: "point1", label: "슈퍼적립", href: "/point", src: "/images/shortcut_5.gif" },
];

export default function ShortcutMenu() {
  return (
    <nav
      aria-label="바로가기 메뉴"
      className="w-full flex justify-center overflow-x-auto scrollbar-none"
    >
      <ul className="flex items-center gap-4 flex-nowrap">
        {items.map((item) => {
          return (
            <li
              key={item.key}
              className="w-[64px] h-[64px]"
            >
              <Image
                src={item.src}
                alt={item.label}
                width={64}
                height={64}
                className="rounded-xl"
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
