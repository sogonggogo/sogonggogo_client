export function Logo({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 64 64"
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 외곽 폭발 효과 (대박을 상징) */}
      <g transform="translate(32,32)">
        {/* 큰 폭발 광선들 */}
        <path
          d="M0,-28 L2,-20 L0,-12 L-2,-20 Z"
          fill="#FF6B35"
          transform="rotate(0)"
        />
        <path
          d="M0,-28 L2,-20 L0,-12 L-2,-20 Z"
          fill="#FF8E53"
          transform="rotate(45)"
        />
        <path
          d="M0,-28 L2,-20 L0,-12 L-2,-20 Z"
          fill="#FF6B35"
          transform="rotate(90)"
        />
        <path
          d="M0,-28 L2,-20 L0,-12 L-2,-20 Z"
          fill="#FF8E53"
          transform="rotate(135)"
        />
        <path
          d="M0,-28 L2,-20 L0,-12 L-2,-20 Z"
          fill="#FF6B35"
          transform="rotate(180)"
        />
        <path
          d="M0,-28 L2,-20 L0,-12 L-2,-20 Z"
          fill="#FF8E53"
          transform="rotate(225)"
        />
        <path
          d="M0,-28 L2,-20 L0,-12 L-2,-20 Z"
          fill="#FF6B35"
          transform="rotate(270)"
        />
        <path
          d="M0,-28 L2,-20 L0,-12 L-2,-20 Z"
          fill="#FF8E53"
          transform="rotate(315)"
        />

        {/* 작은 폭발 광선들 */}
        <path
          d="M0,-24 L1,-18 L0,-14 L-1,-18 Z"
          fill="#FFB627"
          transform="rotate(22.5)"
        />
        <path
          d="M0,-24 L1,-18 L0,-14 L-1,-18 Z"
          fill="#FFB627"
          transform="rotate(67.5)"
        />
        <path
          d="M0,-24 L1,-18 L0,-14 L-1,-18 Z"
          fill="#FFB627"
          transform="rotate(112.5)"
        />
        <path
          d="M0,-24 L1,-18 L0,-14 L-1,-18 Z"
          fill="#FFB627"
          transform="rotate(157.5)"
        />
        <path
          d="M0,-24 L1,-18 L0,-14 L-1,-18 Z"
          fill="#FFB627"
          transform="rotate(202.5)"
        />
        <path
          d="M0,-24 L1,-18 L0,-14 L-1,-18 Z"
          fill="#FFB627"
          transform="rotate(247.5)"
        />
        <path
          d="M0,-24 L1,-18 L0,-14 L-1,-18 Z"
          fill="#FFB627"
          transform="rotate(292.5)"
        />
        <path
          d="M0,-24 L1,-18 L0,-14 L-1,-18 Z"
          fill="#FFB627"
          transform="rotate(337.5)"
        />
      </g>

      {/* 중앙 원형 배경 */}
      <circle
        cx="32"
        cy="32"
        r="16"
        fill="#2D1810"
        stroke="#FFB627"
        strokeWidth="2"
      />

      {/* 프리미엄 접시 */}
      <ellipse cx="32" cy="34" rx="12" ry="3" fill="#C9A96E" opacity="0.8" />
      <ellipse cx="32" cy="33" rx="12" ry="3" fill="#D4B574" />

      {/* 포크와 나이프 교차 */}
      <g transform="translate(32,32)">
        {/* 포크 */}
        <g transform="rotate(-25)">
          <rect x="-0.5" y="-10" width="1" height="8" fill="#E8E8E8" />
          <rect x="-2" y="-10" width="0.8" height="3" fill="#E8E8E8" />
          <rect x="-0.4" y="-10" width="0.8" height="3" fill="#E8E8E8" />
          <rect x="1.2" y="-10" width="0.8" height="3" fill="#E8E8E8" />
        </g>

        {/* 나이프 */}
        <g transform="rotate(25)">
          <rect x="-0.5" y="-10" width="1" height="8" fill="#E8E8E8" />
          <path d="M-1.5,-10 L1.5,-10 L0.5,-7 L-0.5,-7 Z" fill="#E8E8E8" />
        </g>
      </g>

      {/* 중앙 다이아몬드 하이라이트 */}
      <path
        d="M32,20 L40,28 L32,36 L24,28 Z"
        fill="none"
        stroke="#FFB627"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* 프리미엄 스타 */}
      <path
        d="M32,24 L33,27 L36,27 L33.5,29 L34.5,32 L32,30 L29.5,32 L30.5,29 L28,27 L31,27 Z"
        fill="#FFB627"
      />
    </svg>
  );
}
