import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import axios from "axios";
import CCFront from "../../assets/CCFront.png";
import CCBack from "../../assets/CCBack.png";
import env from "../../env";
const stripe = require("stripe-client")(
  "pk_test_eFhv63saelXFMcMdelXpmgiI005wcvWRU1"
);

const Payment = ({ navigation, route }) => {
  const [cardInfo, setCardInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    const { apiUrl } = env();
    setLoading(true);
    const { number, name, cvc, expiry } = cardInfo.values;
    const [exp_month, exp_year] = expiry.split("/");

    const token = await stripe
      .createToken({
        card: {
          name,
          number: number.replace(/ /g, ""),
          exp_month,
          exp_year: `20${exp_year}`,
          cvc,
        },
      })
      .catch((error) => {
        console.log("something went wrong", error);
        setLoading(false);
      });

    const { data } = await axios
      .post(`${apiUrl}/charge`, {
        token,
        ...route.params,
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    if (data.success) {
      navigation.navigate("paymentComplete", { receipt: data.receipt_url });
    }
    setLoading(false);
  };

  const handleConfirmPayment = () => {
    Alert.alert(
      "Confirm Payment",
      `Your card will be changed $${route.params.total}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Canceled"),
          style: "cancel",
        },
        { text: "Pay", onPress: () => handlePayment() },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.paymentContainer}>
      <CreditCardInput
        requiresName={true}
        cardImageFront={CCFront}
        cardImageBack={CCBack}
        onChange={(cardInfo) => setCardInfo(cardInfo)}
        validColor="#52ae67"
        inputContainerStyle={{
          borderBottomColor: "#316d3f",
          borderBottomWidth: 1,
        }}
        labelStyle={{
          color: "#316d3f",
        }}
      />
      <View style={styles.checkoutBtnContainer}>
        <TouchableOpacity onPress={handleConfirmPayment} disabled={loading}>
          <View style={styles.checkoutBtn}>
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.checkoutText}>Pay now</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  paymentContainer: {
    paddingVertical: 20,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    marginVertical: 5,
  },
  checkoutBtnContainer: {
    padding: 20,
  },
  checkoutBtn: {
    width: "100%",
    padding: 15,
    backgroundColor: "#52ae67",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
  },
  checkoutText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Payment;
