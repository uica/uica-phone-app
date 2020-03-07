import React from "react";
import { ActivityIndicator, View, StyleSheet, StatusBar } from "react-native";
const Loading = props => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ActivityIndicator size="large" color="#52ae67" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default Loading;
