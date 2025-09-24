import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import useThemeStore from "@/store/themeStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const { isDark } = useThemeStore();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[isDark ? "dark" : "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          ...(Platform.OS === "web"
            ? {
                alignItems: "center",
              }
            : {}),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Lab",
          tabBarIcon: ({ color }) => (
            <Ionicons name="flask" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="capture"
        options={{
          title: "Capture",
          tabBarIcon: ({ color }) => (
            <Ionicons name="camera" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="locate"
        options={{
          title: "Locate",
          tabBarIcon: ({ color }) => (
            <Ionicons name="location" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sense"
        options={{
          title: "Sense",
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="speedometer" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="connect"
        options={{
          title: "Connect",
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="wifi" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="settings" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
