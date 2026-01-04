import React from "react";
import { TouchableOpacity,Linking, Text, View } from "react-native";
import { Slot, type SlotBanner } from "banner-slot";

const banners: SlotBanner[] = [
  {
    id: "slot-0",
    title: "Ocean view, zero effort",
    body: "",
    cta: "Open demo",
    url: "https://europanite.github.io/dummy_page/",
    imageUri: "https://picsum.photos/seed/goodday_ocean/900/650",
    sponsor: "GOODDAY",
    disclaimer: "Demo ad slot — not a real promotion.",
  },
  {
    id: "slot-1",
    title: "Coffee & quiet time",
    body: "",
    cta: "See more",
    url: "https://europanite.github.io/dummy_page/",
    imageUri: "https://picsum.photos/seed/goodday_coffee/900/650",
    sponsor: "GOODDAY",
    disclaimer: "Demo ad slot — not a real promotion.",
  },
  {
    id: "slot-2",
    title: "Weekend micro trip",
    body: "",
    cta: "View route",
    url: "https://europanite.github.io/dummy_page/",
    imageUri: "https://picsum.photos/seed/goodday_trip/900/650",
    sponsor: "GOODDAY",
    disclaimer: "Demo ad slot — not a real promotion.",
  },
  {
    id: "slot-3",
    title: "Sunset soundtrack",
    body: "",
    cta: "Play",
    url: "https://europanite.github.io/dummy_page/",
    imageUri: "https://picsum.photos/seed/goodday_sunset/900/650",
    sponsor: "GOODDAY",
    disclaimer: "Demo ad slot — not a real promotion.",
  },
  {
    id: "slot-4",
    title: "Mountain air",
    body: "",
    cta: "Learn more",
    url: "https://europanite.github.io/dummy_page/",
    imageUri: "https://picsum.photos/seed/goodday_mountain/900/650",
    sponsor: "GOODDAY",
    disclaimer: "Demo ad slot — not a real promotion.",
  },
  {
    id: "slot-5",
    title: "City lights",
    body: "",
    cta: "Open",
    url: "https://europanite.github.io/dummy_page/",
    imageUri: "https://picsum.photos/seed/goodday_city/900/650",
    sponsor: "GOODDAY",
    disclaimer: "Demo ad slot — not a real promotion.",
  },
];

export default function App() {

    const SIDEBAR_W = 240;
    const CONTENT_MAX_W = 760;

    const APP_BG = "#f6f4ff";
    const BORDER = "#000000";
    const REPO_URL = "https://github.com/europanite/banner-slot";


  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f3f4f6" }}>

      <TouchableOpacity onPress={() => Linking.openURL(REPO_URL)}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
            marginBottom: 12,
            color: "#000000ff",
            textDecorationLine: "underline",
          }}
        >
          banner-slot example
        </Text>
      </TouchableOpacity>

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
            <Slot side="left" banners={banners} />
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
            <Slot side="right" banners={banners} />
          </View>
        </View>
      </View>
    </View>
  );
}
