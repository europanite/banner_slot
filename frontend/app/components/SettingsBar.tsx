import React from "react";
import { 
  View, 
  Text, 
  Linking,
  TouchableOpacity,
  useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const BAR_BG = "#000000ff";
const CONTENT_MAX_W = 480;
const REPO_URL      = "https://github.com/europanite/banner-slot";
const REPO_URL_PAGE = "https://europanite.github.io/banner-slot/";

export default function SettingsBar() {
  const { width } = useWindowDimensions();
  const isNarrow = width < 420;

  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: BAR_BG }}>
      <StatusBar style="dark" backgroundColor={BAR_BG} />
      <View style={{ backgroundColor: BAR_BG, paddingHorizontal: 12, paddingVertical: 10 }}>
        <View style={{ alignItems: "center" }}>
          <View style={{ width: "100%", maxWidth: CONTENT_MAX_W, gap: 8 }}>
            <View
              style={{
                flexDirection: isNarrow ? "column" : "row",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
            <View
                style={{
                  alignSelf: "center",
                  width: "100%",
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  gap: 8,
                }}
            >
              <TouchableOpacity onPress={() => Linking.openURL(REPO_URL)}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "800",
                    color: "#ffffffff",
                    textDecorationLine: "underline",
                  }}
                >
                  Banner Slot Sample
                </Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
