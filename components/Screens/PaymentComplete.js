import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const Amount = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.receiptContainer}>
        <FontAwesome name="check" size={250} style={{ color: "#52ae67" }} />
        <Text style={styles.thankyou}>Thank you for your generosity</Text>
        <TouchableOpacity
          style={styles.receiptBtn}
          onPress={() => Linking.openURL(route.params.receipt)}
        >
          <Text style={styles.receiptText}>View Your Receipt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25
  },
  receiptContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#aaa",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
    padding: 10
  },
  thankyou: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20
  },
  receiptBtn: {
    width: "100%",
    padding: 15,
    backgroundColor: "#52ae67",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  receiptText: {
    color: "#fff"
  }
});

export default Amount;
