import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {};

const Capture = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Capture</Text>
    </View>
  );
};

export default Capture;

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
