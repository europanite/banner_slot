import React, { useMemo } from "react";
import { BannerSlotCard } from "./BannerSlotCard";
import type { BannerSlotProps } from "./types";

export function BannerSlot({
  banners,
  side = "left",
  sideOffset = 2,
  startIndex,
  ...cardProps
}: BannerSlotProps) {
  if (!banners.length) return null;

  const resolvedStart = useMemo(() => {
    if (typeof startIndex === "number") return startIndex;
    if (banners.length <= 1) return 0;
    const base = side === "right" ? sideOffset : 0;
    return base % banners.length;
  }, [startIndex, banners.length, side, sideOffset]);

  return <BannerSlotCard banners={banners} startIndex={resolvedStart} {...cardProps} />;
}
