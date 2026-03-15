import { useState } from "react";
import { navConentItems } from "./GnbNavItems";
import { useRouter } from "next/navigation";

export default function GnbNav() {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<number>(1);

  return (
    <div className="mt-4 mb-2 hidden md:block md:flex justify-center">
      <nav className="">
        <ul className="flex items-center gap-6 text-[16px] font-medium overflow-x-auto whitespace-nowrap">
          {navConentItems.map((item) => {
            const isActive = item.key === activeKey;
            return (
              <li key={item.key}>
                <a
                  className={[
                    "inline-block",
                    "cursor-pointer",
                    isActive ? "text-violet-600 border-b-2 border-violet-600" : "",
                  ].join(" ")}
                  onClick={() => {
                    setActiveKey(item.key);
                    router.push(item.path || "");
                  }}
                >
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
