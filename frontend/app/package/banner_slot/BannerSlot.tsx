import React, { useMemo } from "react";
import { BannerSlotCard } from "./BannerSlotCard";
import type { BannerSlotProps } from "./types";

export function BannerSlot({
  banners,
  side = "left",
  sideOffset,
  startIndex,
  ...cardProps
}: BannerSlotProps) {
  if (!banners.length) return null;

  const resolvedStart = useMemo(() => {
    if (typeof startIndex === "number") return startIndex;

    const len = banners.length;
    if (len <= 1) return 0;

    const fallbackOffset = Math.min(2, len - 1);
    const offset = typeof sideOffset === "number" ? sideOffset : fallbackOffset;

    const base = side === "right" ? offset : 0;
    return base % len;
  }, [startIndex, banners.length, side, sideOffset]);

  return <BannerSlotCard banners={banners} startIndex={resolvedStart} {...cardProps} />;
}
