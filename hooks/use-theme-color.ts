import useThemeStore from "@/store/themeStore";

const Colors = {
  light: {
    background: "#ffffff",
    text: "#000000",
    card: "#f5f5f5",
    link: "#0a7ea4",
  },
  dark: {
    background: "#121212",
    text: "#ffffff",
    card: "#1e1e1e",
    link: "#4da6ff",
  },
};

export function useThemeColor(colorName: keyof typeof Colors.light) {
  const isDark = useThemeStore((state) => state.isDark);
  const theme = isDark ? "dark" : "light";
  return Colors[theme][colorName];
}
