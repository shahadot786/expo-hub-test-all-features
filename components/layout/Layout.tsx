import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { ThemedView } from "../themed-view";
import { ThemedText } from "../themed-text";
import { Ionicons } from "@expo/vector-icons"; // expo vector icons
import useThemeStore from "@/store/themeStore";

type Props = {
  children: React.ReactNode;
  title: string;
  navigation?: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
  notificationsCount?: number;
  icon?: React.ReactNode;
  onPressIcon?: () => void;
  alert?: () => void;
  showBackButton?: boolean; // add toggle for back button
};

const Layout = ({
  children,
  title,
  navigation,
  notificationsCount,
  icon,
  onPressIcon,
  alert,
  showBackButton = false,
}: Props) => {
  const { isDark } = useThemeStore();
  return (
    <ThemedView style={styles.themeContainer}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            {/* Back Button */}
            {showBackButton && navigation?.goBack && (
              <TouchableOpacity
                onPress={navigation.goBack}
                style={styles.iconButton}
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={isDark ? "white" : "black"}
                />
              </TouchableOpacity>
            )}

            {/* Title */}
            <ThemedText type="subtitle" style={styles.title}>
              {title}
            </ThemedText>

            {/* Right-side Icon (Custom or Default) */}
            {icon ? (
              <TouchableOpacity onPress={onPressIcon} style={styles.iconButton}>
                {icon}
              </TouchableOpacity>
            ) : notificationsCount ? (
              <TouchableOpacity
                onPress={alert}
                style={[styles.iconButton, styles.notificationContainer]}
              >
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color={isDark ? "white" : "black"}
                />
                {notificationsCount > 0 && (
                  <ThemedView style={styles.badge}>
                    <ThemedText type="default" style={styles.badgeText}>
                      {notificationsCount}
                    </ThemedText>
                  </ThemedView>
                )}
              </TouchableOpacity>
            ) : (
              <View style={styles.iconPlaceholder} />
            )}
          </View>

          {/* Content */}
          <View style={styles.content}>{children}</View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemedView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  themeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 15,
  },
  title: {
    flex: 1,
  },
  iconButton: {
    padding: 8,
  },
  iconPlaceholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  notificationContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "red",
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 10,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
