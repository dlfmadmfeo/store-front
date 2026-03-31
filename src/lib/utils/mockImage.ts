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
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${startColor}" />
          <stop offset="100%" stop-color="${endColor}" />
        </linearGradient>
      </defs>
      <rect width="640" height="640" rx="36" fill="url(#g)" />
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="${textColor}"
        font-family="Arial, sans-serif"
        font-size="40"
        font-weight="700"
        letter-spacing="2"
      >
        ${label}
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
