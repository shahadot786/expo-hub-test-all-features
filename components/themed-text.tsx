import { StyleSheet, Text, type TextProps } from "react-native";
import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const textColor = useThemeColor("text");
  const linkColor = useThemeColor("link");

  return (
    <Text
      style={[
        { color: type === "link" ? linkColor : textColor },
        type === "default" && styles.default,
        type === "title" && styles.title,
        type === "defaultSemiBold" && styles.defaultSemiBold,
        type === "subtitle" && styles.subtitle,
        type === "link" && styles.link,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
