import React from "react";
import { View, Text } from "react-native";
import { Slot, type SlotBanner } from "../package/banner_slot";

const SIDEBAR_W = 240;
const CONTENT_MAX_W = 760;

const APP_BG = "#f6f4ff";
const BORDER = "#000000";

const RAW_CONTACT_URL = "https://europanite.github.io/dummy_page/";

const DEMO_BANNERS: SlotBanner[] = [
  {
    id: "slot-0",
    title: "Ocean view, zero effort",
    cta: "Open demo",
    url: RAW_CONTACT_URL,
    imageUri: "https://picsum.photos/seed/goodday_ocean/900/650",
    sponsor: "GOODDAY",
    disclaimer: "Demo ad slot — not a real promotion.",
  },
  {
    id: "slot-1",
    title: "Coffee & quiet time",
    cta: "See more",
    url: RAW_CONTACT_URL,
    imageUri: "https://picsum.photos/seed/goodday_coffee/900/650",
    sponsor: "GOODDAY",
    disclaimer: "Demo ad slot — not a real promotion.",
  },
  // ...必要なだけ
];

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          padding: 6,
          flexDirection: "row",
          backgroundColor: APP_BG,
          alignItems: "stretch",
        }}
      >
        <View style={{ flex: 1, minWidth: SIDEBAR_W, minHeight: 0, marginRight: 12 }}>
          <Slot side="left" banners={DEMO_BANNERS} sticky variant="sidebar" />
        </View>

        <View
          style={{
            borderWidth: 2,
            borderColor: BORDER,
            borderRadius: 12,
            width: CONTENT_MAX_W,
            minWidth: 0,
            padding: 12,
            flexShrink: 1,
          }}
        >
          <Text>Main Content</Text>
        </View>

        <View style={{ flex: 1, minWidth: SIDEBAR_W, minHeight: 0, marginLeft: 12 }}>
          <Slot side="right" banners={DEMO_BANNERS} sticky variant="sidebar" />
        </View>
      </View>
    </View>
  );
}
