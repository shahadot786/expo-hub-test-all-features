import Layout from "@/components/layout/Layout";
import { ThemedText } from "@/components/themed-text";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {};

const Locate = (props: Props) => {
  return (
    <Layout title="Locate">
      <View style={styles.container}>
        <ThemedText type="subtitle">Locate Screen</ThemedText>
      </View>
    </Layout>
  );
};

export default Locate;

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
