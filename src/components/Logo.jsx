/* Inline so the mark renders with the first paint (no extra request) and can inherit
   theme colours. Kept visually identical to public/logo.svg, which is the favicon,
   PWA icon and social-preview source. */
export default function Logo({ className = 'size-9' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" role="img" aria-label="telc A2·B1 Trainer logo">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4c8ee0" />
          <stop offset="1" stopColor="#2a78d6" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#logo-g)" />
      <rect x="14" y="11" width="30" height="42" rx="4" fill="#fff" opacity=".95" />
      <g fill="#2a78d6" opacity=".35">
        <rect x="19" y="18" width="20" height="3" rx="1.5" />
        <rect x="19" y="25" width="20" height="3" rx="1.5" />
        <rect x="19" y="32" width="13" height="3" rx="1.5" />
      </g>
      <circle cx="44" cy="44" r="13" fill="#0ca30c" />
      <path d="M38.5 44.5l3.8 3.8 7.2-7.6" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
