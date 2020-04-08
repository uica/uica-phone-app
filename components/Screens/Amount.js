import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
const Amount = ({ navigation, route }) => {
  const [total, settotal] = useState(0);
  const [amounts, setAmounts] = useState([
    { id: 1, amount: 1, value: 0 },
    { id: 2, amount: 5, value: 0 },
    { id: 3, amount: 20, value: 0 },
    { id: 4, amount: 100, value: 0 },
    { id: 5, amount: 1000, value: 0 },
  ]);

  const handleInc = (amount) => {
    const newAmounts = amounts.filter((amnt) => {
      if (amnt.id === amount.id) {
        amnt.value += amount.amount;
        const newTotal = total + amount.amount;
        settotal(newTotal);
        return amnt;
      }
      return amnt;
    });
    setAmounts(newAmounts);
  };

  const handleDec = (amount) => {
    const newAmounts = amounts.filter((amnt) => {
      if (amnt.id === amount.id && amnt.value > 0) {
        amnt.value -= amount.amount;
        const newTotal = total - amount.amount;
        settotal(newTotal);
        return amnt;
      }
      return amnt;
    });
    setAmounts(newAmounts);
  };

  const handleContinue = () => {
    if (total === 0) {
      alert("Add money");
    } else {
      navigation.navigate("billingInfo", {
        total,
        ...route.params,
      });
    }
  };

  return (
    <View style={styles.container}>
      {amounts.map((amount) => (
        <View key={amount.id} style={styles.row}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleDec(amount)}
          >
            <Text style={styles.btnText}>- {amount.amount}</Text>
          </TouchableOpacity>
          <Text style={styles.amountText}>{amount.value}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleInc(amount)}
          >
            <Text style={styles.btnText}>+ {amount.amount}</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.totalContainer}>
        <View style={styles.row}>
          <Text style={styles.totalCaption}>TOTAL</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.totalText}>${total}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={handleContinue} style={styles.continueBtn}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  btn: {
    flex: 1,
    backgroundColor: "#52ae67",
    justifyContent: "center",
    paddingVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
  },
  amountText: {
    paddingHorizontal: 20,
    fontSize: 20,
  },
  totalCaption: {
    fontSize: 15,
  },
  totalText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#52ae67",
  },
  totalContainer: {
    backgroundColor: "#fff",
    padding: 10,
    shadowColor: "#aaa",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
    marginTop: 5,
  },
  continueBtn: {
    flex: 1,
    backgroundColor: "#52ae67",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  continueText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Amount;
