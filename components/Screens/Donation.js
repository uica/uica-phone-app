import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Payment from "../Payment/Payment";
const Donation = props => {
  return (
    <View style={styles.donationContainer}>
      <Text style={styles.formTitle}>Make donations</Text>
      <Payment />
    </View>
  );
};
const styles = StyleSheet.create({
  donationContainer: {
    padding: 10
  },
  formTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10
  }
});
export default Donation;
