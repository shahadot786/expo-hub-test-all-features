import Layout from "@/components/layout/Layout";
import { ThemedText } from "@/components/themed-text";
import React from "react";
import { View, StyleSheet } from "react-native";

type Props = {};

const Lab = (props: Props) => {
  return (
    <Layout title="Lab">
      <View style={styles.container}>
        <ThemedText type="subtitle">Lab Screen</ThemedText>
      </View>
    </Layout>
  );
};

export default Lab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
