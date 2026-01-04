import React, { useEffect, useCallback, useMemo, useRef, useState } from "react";
import { 
  View, 
  Text, 
  Pressable, 
  Animated,
  Platform,
  Linking 
} from "react-native";

const RAW_CONTACT_URL = "https://www.google.com/";
const SIDEBAR_W = 240;
const CONTENT_MAX_W = 760;

const APP_BG = "#f6f4ff";
const CARD_BG = "#ffffff";
const TEXT_DIM = "#333333";
const BORDER = "#000000";

type SlotBanner = {
  id: string;
  title: string;
  body: string;
  cta: string;
  url: string;
  imageUri: string;
  sponsor?: string;
  disclaimer?: string;
};

const SLOT_ROTATE_MS = 6500;
const SLOT_FADE_MS = 800;

const SLOT_BANNERS: SlotBanner[] = [
  {
    id: "slot-0",
    title: "Ocean view, zero effort",
    body: "",
    cta: "Open demo",
    url: RAW_CONTACT_URL,
    imageUri: "https://picsum.photos/seed/goodday_ocean/900/650",
    sponsor: "GOODDAY",
    disclaimer: "Demo ad slot — not a real promotion.",
  },
  {
    id: "slot-1",
    title: "Coffee & quiet time",
    body: "",
    cta: "See more",
    url: RAW_CONTACT_URL,
    imageUri: "https://picsum.photos/seed/goodday_coffee/900/650",
    sponsor: "GOODDAY",
    disclaimer: "Demo ad slot — not a real promotion.",
  },
  {
    id: "slot-2",
    title: "Weekend micro trip",
    body: "",
    cta: "View route",
    url: RAW_CONTACT_URL,
    imageUri: "https://picsum.photos/seed/goodday_trip/900/650",
    sponsor: "GOODDAY",
    disclaimer: "Demo ad slot — not a real promotion.",
  },
  {
    id: "slot-3",
    title: "Sunset soundtrack",
    body: "",
    cta: "Play",
    url: RAW_CONTACT_URL,
    imageUri: "https://picsum.photos/seed/goodday_sunset/900/650",
    sponsor: "GOODDAY",
    disclaimer: "Demo ad slot — not a real promotion.",
  },
  {
    id: "slot-4",
    title: "Mountain air",
    body: "",
    cta: "Learn more",
    url: RAW_CONTACT_URL,
    imageUri: "https://picsum.photos/seed/goodday_mountain/900/650",
    sponsor: "GOODDAY",
    disclaimer: "Demo ad slot — not a real promotion.",
  },
  {
    id: "slot-5",
    title: "City lights",
    body: "",
    cta: "Open",
    url: RAW_CONTACT_URL,
    imageUri: "https://picsum.photos/seed/goodday_city/900/650",
    sponsor: "GOODDAY",
    disclaimer: "Demo ad slot — not a real promotion.",
  },
];

type SlotCardVariant = "sidebar" | "inline";

function SlotCard({
  banners,
  startIndex,
  sticky = false,
  variant = "sidebar",
}: {
  banners: SlotBanner[];
  startIndex: number;
  sticky?: boolean;
  variant?: SlotCardVariant;
}) {
  const len = Math.max(1, banners.length);
  const safeStart = ((startIndex % len) + len) % len;

  const [active, setActive] = useState(safeStart);
  const [next, setNext] = useState((safeStart + 1) % len);

  // Cross-fade progress: 0 → show "active", 1 → show "next"
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // If banners length changes (it shouldn't), clamp indices.
    if (active >= len) setActive(0);
    if (next >= len) setNext((active + 1) % len);
  }, [active, next, len]);

  useEffect(() => {
    if (len <= 1) return;

    let cancelled = false;

    const interval = setInterval(() => {
      const n = (active + 1) % len;
      setNext(n);

      progress.stopAnimation();
      progress.setValue(0);

      Animated.timing(progress, {
        toValue: 1,
        duration: SLOT_FADE_MS,
        useNativeDriver: Platform.OS !== "web",
      }).start(({ finished }) => {
        if (!finished || cancelled) return;
        setActive(n);
        // Snap back to the stable state (active fully visible).
        progress.setValue(0);
      });
    }, SLOT_ROTATE_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
      progress.stopAnimation();
    };
  }, [active, len, progress]);

  const activeOpacity =
    len <= 1
      ? 1
      : progress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        });

  const nextOpacity = len <= 1 ? 0 : progress;

  const activeBanner = banners[active] ?? banners[0];
  const nextBanner = banners[next] ?? banners[0];

  const onPress = useCallback(() => {
    const url = activeBanner?.url;
    if (!url) return;
    void Linking.openURL(url).catch(() => {
      // ignore
    });
  }, [activeBanner?.url]);

  const imageAreaStyle =
    variant === "sidebar"
      ? ({ flex: 1, minHeight: 0, backgroundColor: "#e5e7eb" } as const)
      : ({ height: 200, backgroundColor: "#e5e7eb" } as const);

  const shellStyle = {
    ...(variant === "sidebar" ? ({ flex: 1 } as const) : ({ width: "100%" } as const)),
    backgroundColor: APP_BG,
    borderRadius: 12,
    ...(sticky && Platform.OS === "web" ? ({ position: "sticky", top: 16 } as any) : null),
  };

  const cardStyle = {
    ...(variant === "sidebar" ? ({ flex: 1, minHeight: 0 } as const) : null),
    backgroundColor: CARD_BG,
    borderWidth: 2,
    borderColor: BORDER,
    borderRadius: 12,
    overflow: "hidden",
  };

  return (
    <View style={shellStyle}>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`Sponsored: ${activeBanner?.title ?? "Ad"}`}
        onPress={onPress}
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
              source={{ uri: activeBanner?.imageUri }}
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
                source={{ uri: nextBanner?.imageUri }}
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
                backgroundColor: "rgba(0,0,0,0.55)",
              }}
            >
              <Text style={{ color: "#ffffff", fontSize: 10, fontWeight: "800", letterSpacing: 0.4 }}>AD</Text>
            </View>
          </View>

          {/* Copy */}
          <View style={{ padding: 12, gap: 6 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: TEXT_DIM, fontSize: 11, fontWeight: "700" }}>{activeBanner?.sponsor ?? "Sponsored"}</Text>
              <Text style={{ color: TEXT_DIM, fontSize: 11, fontWeight: "700" }}>↗</Text>
            </View>

            <Text style={{ color: "#000000", fontSize: 14, fontWeight: "800", lineHeight: 18 }}>
              {activeBanner?.title ?? "Sponsored"}
            </Text>

            <Text style={{ color: TEXT_DIM, fontSize: 12, lineHeight: 16 }}>{activeBanner?.body ?? ""}</Text>

            <View
              style={{
                marginTop: 6,
                alignSelf: "flex-start",
                borderWidth: 2,
                borderColor: BORDER,
                borderRadius: 999,
                paddingHorizontal: 12,
                paddingVertical: 6,
                backgroundColor: "#ffffff",
              }}
            >
              <Text style={{ color: "#000000", fontSize: 12, fontWeight: "800" }}>{activeBanner?.cta ?? "Open"}</Text>
            </View>

            {/* Dots */}
            {len > 1 ? (
              <View style={{ flexDirection: "row", justifyContent: "center", gap: 6, marginTop: 8 }}>
                {banners.map((b, i) => (
                  <View
                    key={b.id}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      backgroundColor: i === active ? "#111827" : "#d1d5db",
                    }}
                  />
                ))}
              </View>
            ) : null}

            {activeBanner?.disclaimer ? (
              <Text style={{ color: TEXT_DIM, fontSize: 10, marginTop: 8, lineHeight: 14 }}>
                {activeBanner.disclaimer}
              </Text>
            ) : null}
          </View>
        </View>
      </Pressable>
    </View>
  );
}


function Slot({ side }: { side: "left" | "right" }) {

  const banners = SLOT_BANNERS;
  if (!banners.length) return null;

  // Offset the starting banner so L/R columns don't look identical.
  const startIndex = useMemo(() => {
    if (banners.length <= 1) return 0;
    const base = side === "right" ? 2 : 0;
    return base % banners.length;
  }, [banners.length, side]);

  return <SlotCard 
    banners={banners} 
    startIndex={startIndex} 
    sticky variant="sidebar" />;
}

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          padding: 6,
          flexDirection: "row",
          backgroundColor: APP_BG,
          gap: 12,
          alignItems: "stretch",
        }}
      >
        {/* Left sidebar: grows to consume extra space */}
        <View style={{ flex: 1, minWidth: SIDEBAR_W, minHeight: 0 }}>
          <Slot side="left" />
        </View>

        {/* Center: keep 760 as the “target” width, but allow shrinking */}
        <View style={{ 
          borderWidth: 2,
          borderColor: BORDER,
          borderRadius: 12,
          width: CONTENT_MAX_W, 
          minWidth: 0, 
          padding: 12,
          flexShrink: 1 }}>
          <Text>
            Main Content
          </Text>
        </View>

        {/* Right sidebar: grows to consume extra space */}
        <View style={{ flex: 1, minWidth: SIDEBAR_W, minHeight: 0 }}>
          <Slot side="right" />
        </View>
      </View>
    </View>
  );
}
