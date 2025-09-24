import Layout from "@/components/layout/Layout";
import { ThemedText } from "@/components/themed-text";
import useThemeStore from "@/store/themeStore";
import React from "react";
import { View, StyleSheet, Switch } from "react-native";

type Props = {};

const Settings = (props: Props) => {
  const { isDark, toggleTheme } = useThemeStore();
  return (
    <Layout title="Settings">
      <View style={styles.container}>
        {/* 1: Appearance */}
        <View>
          <ThemedText type="defaultSemiBold">Appearance</ThemedText>
          <View style={styles.row}>
            <ThemedText type="default">Dark Mode</ThemedText>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
});
