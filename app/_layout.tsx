/* eslint-disable react-hooks/exhaustive-deps */
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import useThemeStore from "@/store/themeStore";

// Splash screen options
SplashScreen.setOptions({ duration: 1000, fade: true });
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme(); // "light" | "dark"
  const { isDark, setDark } = useThemeStore();

  // Initialize theme based on system and hide splash
  useEffect(() => {
    setDark(colorScheme === "dark");
    SplashScreen.hideAsync();
  }, [colorScheme]);

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={isDark ? "light" : "dark"} />
    </ThemeProvider>
  );
}
