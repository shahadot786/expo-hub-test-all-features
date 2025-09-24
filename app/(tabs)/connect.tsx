import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {};

const Connect = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Connect</Text>
    </View>
  );
};

export default Connect;

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
