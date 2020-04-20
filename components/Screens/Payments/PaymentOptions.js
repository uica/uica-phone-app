import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const PaymentOptions = ({ navigation, route }) => {
  const handleSubmit = () => {
    navigation.navigate("billingInfo", {
      ...route.params,
    });
  };
  return (
    <View>
      <Text style={styles.title}>Choose your type of payment</Text>
      <View style={styles.pageContainer}>
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.debitCard}>
            <FontAwesome style={styles.icon} name="credit-card-alt" />
            <Text style={styles.btnText}>Debit/Credit Card</Text>
          </View>
        </TouchableOpacity>
        {Platform.OS === "ios" && (
          <TouchableOpacity>
            <View style={styles.applePay}>
              <FontAwesome style={styles.icon} name="apple" />
              <Text style={styles.btnText}>Pay</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingVertical: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  pageContainer: {
    height: "50%",
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
  },

  debitCard: {
    backgroundColor: "#52ae67",
    elevation: 3,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
    shadowColor: "#aaa",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    borderRadius: 10,
  },
  applePay: {
    backgroundColor: "#000",
    elevation: 3,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
    shadowColor: "#aaa",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    borderRadius: 10,
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  icon: {
    paddingHorizontal: 5,
    fontSize: 25,
    color: "#fff",
  },
});

export default PaymentOptions;
