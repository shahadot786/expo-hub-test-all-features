import { create } from "zustand";

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setDark: (value: boolean) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  isDark: false, // initial value, will override from system
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
  setDark: (value: boolean) => set({ isDark: value }),
}));

export default useThemeStore;
