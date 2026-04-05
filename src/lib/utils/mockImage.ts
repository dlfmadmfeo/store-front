type MockImageOptions = {
  label: string;
  startColor: string;
  endColor: string;
  textColor?: string;
};

export function createMockImageDataUrl({
  label,
  startColor,
  endColor,
  textColor = "#ffffff",
}: MockImageOptions) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
      <defs>
      </defs>
      <rect width="640" height="640" rx="36" fill="url(#surface)" />
      <rect x="1" y="1" width="638" height="638" rx="35" fill="none" stroke="#e5e7eb" />
      <rect x="72" y="92" width="496" height="364" rx="28" fill="url(#product)" />
      <rect x="72" y="476" width="220" height="22" rx="11" fill="#d1d5db" />
      <rect x="72" y="514" width="320" height="18" rx="9" fill="#e5e7eb" />
      <rect x="72" y="552" width="164" height="18" rx="9" fill="#e5e7eb" />
      <rect x="460" y="536" width="108" height="34" rx="17" fill="#111827" />
      <text
        x="514"
        y="553"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="${textColor}"
        font-family="Arial, sans-serif"
        font-size="16"
        font-weight="700"
        letter-spacing="0.4"
      >
        ${label}
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
