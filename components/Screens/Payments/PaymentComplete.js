import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const Amount = ({ navigation, route }) => {
  const { receipt, billingInfo } = route.params;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.receiptContainer}>
        <FontAwesome name="check" size={200} style={{ color: "#52ae67" }} />
        <Text style={styles.thankyou}>
          Thank you {billingInfo.firstName} for your generosity
        </Text>
        <TouchableOpacity
          style={styles.receiptBtn}
          onPress={() => Linking.openURL(receipt)}
        >
          <Text style={styles.receiptText}>View a copy of your receipt</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontSize: 12, color: "#555", textAlign: "center" }}>
          Note: Additional copy of this receipt was sent to{" "}
          <Text style={{ fontWeight: "bold" }}>{billingInfo.email}</Text>. If
          you did not receive the email, please feel free to contact the UICA to
          obtain a copy.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
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
    padding: 10,
  },
  thankyou: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },
  receiptBtn: {
    width: "100%",
    padding: 15,
    backgroundColor: "#52ae67",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  receiptText: {
    color: "#fff",
  },
});

export default Amount;
