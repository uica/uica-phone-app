import React from "react";
import { StyleSheet, Text, View } from "react-native";
import twelve from "twentyfour-to-twelve";
const Prayer = ({ prayer }) => {
  return (
    <View style={styles.prayerContainer}>
      <View style={styles.prayerItem}>
        <Text style={styles.prayerName}>{prayer.prayerName}</Text>
      </View>
      <View style={styles.prayerItem}>
        <Text style={styles.prayerTime}>{twelve(prayer.time)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  prayerContainer: {
    backgroundColor: "#e8f8e8",
    padding: 15,
    flexDirection: "row",
    borderWidth: 1,
    opacity: 0.8,
    borderColor: "#fff",
    shadowColor: "#aaa",
    shadowOpacity: 0.2,
    shadowOffset: { height: 1, width: 1 }
  },
  prayerItem: {
    flex: 1
  },
  prayerName: {
    fontSize: 18,
    textAlign: "left"
  },
  prayerTime: {
    fontSize: 18,
    textAlign: "right"
  }
});

export default Prayer;
