import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Slot, SlotCard, type SlotBanner } from "banner-slot";

const banners: SlotBanner[] = [
  {
    id: "b1",
    title: "BannerSlot Demo",
    body: "This is a sidebar banner. Click to open a link.",
    cta: "Open",
    url: "https://example.com",
    imageUri: "https://placehold.co/1200x630/png",
    sponsor: "Sponsored",
    disclaimer: "Demo content"
  },
  {
    id: "b2",
    title: "Rotate & Fade",
    body: "Auto-rotates with a fade transition.",
    cta: "Learn more",
    url: "https://example.com/docs",
    imageUri: "https://placehold.co/1200x630/jpg",
    sponsor: "Ad",
    disclaimer: "Demo content"
  },
  {
    id: "b3",
    title: "Inline Variant",
    body: "You can also render as inline card.",
    cta: "Try",
    url: "https://example.com/try",
    imageUri: "https://placehold.co/1200x630/webp",
    sponsor: "Sponsored",
    disclaimer: "Demo content"
  }
];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f3f4f6" }}>
      <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 12 }}>
        banner-slot example (Expo Web → GitHub Pages)
      </Text>

      <View style={{ flex: 1, flexDirection: "row", gap: 12 }}>
        {/* Left sidebar */}
        <View style={{ width: 320 }}>
          <Slot
            banners={banners}
            side="left"
            variant="sidebar"
            sticky
            rotateMs={5500}
            fadeMs={700}
          />
        </View>

        {/* Main */}
        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: 12, backgroundColor: "#ffffff", borderRadius: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 8 }}>Main content</Text>
            <Text style={{ marginBottom: 12 }}>
              This page shows left/right sidebars using Slot, and an inline card below.
            </Text>

            <SlotCard
              banners={banners}
              startIndex={1}
              variant="inline"
              rotateMs={6500}
              fadeMs={800}
            />
          </View>

          <View style={{ height: 800 }} />
        </ScrollView>

        {/* Right sidebar */}
        <View style={{ width: 320 }}>
          <Slot
            banners={banners}
            side="right"
            variant="sidebar"
            sticky
            rotateMs={5500}
            fadeMs={700}
          />
        </View>
      </View>
    </View>
  );
}
