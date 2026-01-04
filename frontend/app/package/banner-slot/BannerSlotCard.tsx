import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Linking, Platform, Pressable, Text, View } from "react-native";
import type { BannerSlotBanner, BannerSlotCardProps, BannerSlotTheme } from "./types";

const DEFAULT_ROTATE_MS = 6500;
const DEFAULT_FADE_MS = 800;

const DEFAULT_THEME: Required<BannerSlotTheme> = {
  containerBg: "#f6f4ff",
  cardBg: "#ffffff",
  textDim: "#333333",
  border: "#000000",
  badgeBg: "rgba(0,0,0,0.55)",
  badgeText: "#ffffff",
  dotActive: "#111827",
  dotInactive: "#d1d5db",
  ctaBg: "#ffffff",
  ctaText: "#000000",
};

function clampIndex(idx: number, len: number) {
  if (len <= 0) return 0;
  return ((idx % len) + len) % len;
}

export function BannerSlotCard({
  banners,
  startIndex = 0,
  sticky = false,
  variant = "sidebar",
  rotateMs = DEFAULT_ROTATE_MS,
  fadeMs = DEFAULT_FADE_MS,
  theme: themeProp,
  openUrl,
  onPressBanner,
  badgeLabel = "AD",
}: BannerSlotCardProps) {
  const theme = useMemo(() => ({ ...DEFAULT_THEME, ...(themeProp ?? {}) }), [themeProp]);

  const len = banners.length;
  if (len === 0) return null;

  const safeStart = clampIndex(startIndex, len);

  const [active, setActive] = useState(safeStart);
  const [next, setNext] = useState(clampIndex(safeStart + 1, len));

  const progress = useRef(new Animated.Value(0)).current;

  // clamp
  useEffect(() => {
    if (active >= len) setActive(0);
    if (next >= len) setNext(clampIndex(active + 1, len));
  }, [active, next, len]);

  useEffect(() => {
    if (len <= 1) return;

    let cancelled = false;

    const interval = setInterval(() => {
      const n = clampIndex(active + 1, len);
      setNext(n);

      progress.stopAnimation();
      progress.setValue(0);

      Animated.timing(progress, {
        toValue: 1,
        duration: fadeMs,
        useNativeDriver: Platform.OS !== "web",
      }).start(({ finished }) => {
        if (!finished || cancelled) return;
        setActive(n);
        progress.setValue(0);
      });
    }, rotateMs);

    return () => {
      cancelled = true;
      clearInterval(interval);
      progress.stopAnimation();
    };
  }, [active, len, fadeMs, rotateMs, progress]);

  const activeOpacity =
    len <= 1
      ? 1
      : progress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        });

  const nextOpacity = len <= 1 ? 0 : progress;

  const activeBanner: BannerSlotBanner = banners[active] ?? banners[0]!;
  const nextBanner: BannerSlotBanner = banners[next] ?? banners[0]!;

  const doOpen = useCallback(async () => {
    const b = activeBanner;
    if (onPressBanner) {
      await onPressBanner(b);
      return;
    }
    const url = b.url;
    if (!url) return;

    if (openUrl) {
      await openUrl(url);
      return;
    }

    await Linking.openURL(url).catch(() => {
      // ignore
    });
  }, [activeBanner, onPressBanner, openUrl]);

  const imageAreaStyle =
    variant === "sidebar"
      ? ({ flex: 1, minHeight: 0, backgroundColor: "#e5e7eb" } as const)
      : ({ height: 200, backgroundColor: "#e5e7eb" } as const);

  const shellStyle = {
    ...(variant === "sidebar" ? ({ flex: 1 } as const) : ({ width: "100%" } as const)),
    backgroundColor: theme.containerBg,
    borderRadius: 12,
    ...(sticky && Platform.OS === "web" ? ({ position: "sticky", top: 16 } as any) : null),
  };

  const cardStyle = {
    ...(variant === "sidebar" ? ({ flex: 1, minHeight: 0 } as const) : null),
    backgroundColor: theme.cardBg,
    borderWidth: 2,
    borderColor: theme.border,
    borderRadius: 12,
    overflow: "hidden" as const, // TS2769 fix
  };

  return (
    <View style={shellStyle}>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`Sponsored: ${activeBanner?.title ?? "Ad"}`}
        onPress={() => void doOpen()}
        style={({ pressed }) => ({
          ...(variant === "sidebar" ? ({ flex: 1 } as const) : null),
          opacity: pressed ? 0.92 : 1,
          ...(Platform.OS === "web" ? ({ cursor: "pointer" } as any) : null),
        })}
      >
        <View style={cardStyle}>
          {/* Image area */}
          <View style={imageAreaStyle}>
            <Animated.Image
              source={{ uri: activeBanner.imageUri }}
              resizeMode="cover"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                opacity: activeOpacity as any,
              }}
            />
            {len > 1 ? (
              <Animated.Image
                source={{ uri: nextBanner.imageUri }}
                resizeMode="cover"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  opacity: nextOpacity as any,
                }}
              />
            ) : null}

            {/* badge */}
            <View
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 999,
                backgroundColor: theme.badgeBg,
              }}
            >
              <Text style={{ color: theme.badgeText, fontSize: 10, fontWeight: "800", letterSpacing: 0.4 }}>
                {badgeLabel}
              </Text>
            </View>
          </View>

          {/* Copy */}
          <View style={{ padding: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <Text style={{ color: theme.textDim, fontSize: 11, fontWeight: "700" }}>
                {activeBanner.sponsor ?? "Sponsored"}
              </Text>
              <Text style={{ color: theme.textDim, fontSize: 11, fontWeight: "700" }}>↗</Text>
            </View>

            <Text style={{ color: "#000000", fontSize: 14, fontWeight: "800", lineHeight: 18, marginBottom: 6 }}>
              {activeBanner.title ?? "Sponsored"}
            </Text>

            {activeBanner.body ? (
              <Text style={{ color: theme.textDim, fontSize: 12, lineHeight: 16, marginBottom: 6 }}>
                {activeBanner.body}
              </Text>
            ) : null}

            <View
              style={{
                marginTop: 2,
                alignSelf: "flex-start",
                borderWidth: 2,
                borderColor: theme.border,
                borderRadius: 999,
                paddingHorizontal: 12,
                paddingVertical: 6,
                backgroundColor: theme.ctaBg,
              }}
            >
              <Text style={{ color: theme.ctaText, fontSize: 12, fontWeight: "800" }}>
                {activeBanner.cta ?? "Open"}
              </Text>
            </View>

            {/* Dots */}
            {len > 1 ? (
              <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                {banners.map((b, i) => (
                  <View
                    key={b.id}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      backgroundColor: i === active ? theme.dotActive : theme.dotInactive,
                      marginHorizontal: 3,
                    }}
                  />
                ))}
              </View>
            ) : null}

            {activeBanner.disclaimer ? (
              <Text style={{ color: theme.textDim, fontSize: 10, marginTop: 8, lineHeight: 14 }}>
                {activeBanner.disclaimer}
              </Text>
            ) : null}
          </View>
        </View>
      </Pressable>
    </View>
  );
}
