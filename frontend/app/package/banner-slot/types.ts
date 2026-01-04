export type BannerSlotBanner = {
  id: string;
  title: string;
  body?: string;
  cta?: string;
  url?: string;
  imageUri: string;
  sponsor?: string;
  disclaimer?: string;
};

export type BannerSlotVariant = "sidebar" | "inline";

export type BannerSlotTheme = {
  containerBg?: string;
  cardBg?: string;
  textDim?: string;
  border?: string;

  badgeBg?: string;
  badgeText?: string;

  dotActive?: string;
  dotInactive?: string;

  ctaBg?: string;
  ctaText?: string;
};

export type BannerSlotCardProps = {
  banners: BannerSlotBanner[];
  startIndex?: number;

  sticky?: boolean;
  variant?: BannerSlotVariant;

  rotateMs?: number;
  fadeMs?: number;

  theme?: BannerSlotTheme;

  /**
   * URLを開く実装を差し替えたい場合に注入（Webでwindow.openしたい等）
   */
  openUrl?: (url: string) => void | Promise<void>;

  /**
   * 押下時の挙動を完全に差し替えたい場合（計測→遷移等）
   * 指定した場合は openUrl より優先
   */
  onPressBanner?: (banner: BannerSlotBanner) => void | Promise<void>;

  badgeLabel?: string; // default: "AD"
};

export type BannerSlotProps = Omit<BannerSlotCardProps, "startIndex"> & {
  side?: "left" | "right";

  /**
   * side="right" のときに startIndex をどれだけズラすか（左右の見た目が同じにならない用）
   */
  sideOffset?: number;

  /**
   * startIndex を直指定したい場合はこれ（sideより優先）
   */
  startIndex?: number;
};
