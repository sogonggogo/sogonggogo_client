export const theme = {
  colors: {
    primary: "#d62300",
    secondary: "#ffa500",
    accent: "#5c3317",
    background: "#f5f5dc",
    border: "#e5dcc8",
    white: "#ffffff",
    black: "#000000",

    // Gradients
    gradientOrange: "linear-gradient(180deg, #ffa500 0%, #ff8c00 100%)",
    gradientBrown: "linear-gradient(180deg, #6b4423 0%, #4a2c1a 100%)",

    // Alpha colors
    whiteAlpha80: "rgba(255, 255, 255, 0.8)",
    whiteAlpha60: "rgba(255, 255, 255, 0.6)",
    whiteAlpha50: "rgba(255, 255, 255, 0.5)",
    blackAlpha10: "rgba(0, 0, 0, 0.1)",
    blackAlpha15: "rgba(0, 0, 0, 0.15)",
    blackAlpha25: "rgba(0, 0, 0, 0.25)",
    accentAlpha70: "rgba(92, 51, 23, 0.7)",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    xxxl: "64px",

    // Layout specific
    section: "80px",
    container: "96px",
    headerHeight: "88px",
  },

  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "20px",
    xl: "24px",
    xxl: "30px",
    xxxl: "36px",
    hero: "60px",
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },

  fontFamily: {
    primary: "'Arial Black', Arial, sans-serif",
    secondary: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
    ttangsbudae: "var(--font-ttangsbudae), 'TTangsbudae', sans-serif",
  },

  borderRadius: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "26px",
    full: "9999px",
  },

  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    lg: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
    xl: "0px 25px 50px 0px rgba(0, 0, 0, 0.15)",
  },

  transition: {
    fast: "0.2s",
    normal: "0.3s",
    slow: "0.5s",
  },

  zIndex: {
    base: 1,
    dropdown: 10,
    sticky: 20,
    fixed: 50,
    overlay: 100,
    modal: 200,
  },

  breakpoints: {
    mobile: "640px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1280px",
    ultrawide: "1440px",
  },

  sizes: {
    maxWidth: "1280px",
    maxWidthFull: "1440px",
    heroWidth: "824px",
    sidebarWidth: "400px",
    heroHeight: "465px",
    orderCardHeight: "225px",
    orderHistoryHeight: "465px",
    controlButton: "40px",
    indicatorSmall: "12px",
    indicatorLarge: "48px",
    iconSm: "20px",
    iconMd: "24px",
    iconLg: "48px",
  },
} as const;

export type Theme = typeof theme;
