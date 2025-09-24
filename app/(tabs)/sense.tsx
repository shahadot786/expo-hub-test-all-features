import Layout from "@/components/layout/Layout";
import { ThemedText } from "@/components/themed-text";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {};

const Sense = (props: Props) => {
  return (
    <Layout title="Sense">
      <View style={styles.container}>
        <ThemedText type="subtitle">Sense Screen</ThemedText>
      </View>
    </Layout>
  );
};

export default Sense;

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
