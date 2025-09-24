import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {};

const ExpoPermissions = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Expo Permissions</Text>
    </View>
  );
};

export default ExpoPermissions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
