import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  NativeModules,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { PaymentRequest } from "react-native-payments";
import axios from "axios";
import ENV from "../../../env";

const PaymentOptions = ({ navigation, route }) => {
  const handleSubmit = () => {
    navigation.navigate("payment", {
      ...route.params,
    });
  };

  const handleApplePay = async () => {
    const { apiUrl, STRIPE_PUB_KEY } = ENV();
    const METHOD_DATA = [
      {
        supportedMethods: ["apple-pay"],
        data: {
          merchantIdentifier: "merchant.org.uica",
          supportedNetworks: ["visa", "mastercard", "amex"],
          countryCode: "US",
          currencyCode: "USD",
          paymentMethodTokenizationParameters: {
            parameters: {
              gateway: "stripe",
              "stripe:publishableKey": STRIPE_PUB_KEY,
              "stripe:version": "5.0.0",
            },
          },
        },
      },
    ];
    const DETAILS = {
      id: route.params.description,
      displayItems: [
        {
          label: `${route.params.description} - Donation`,
          amount: { currency: "USD", value: route.params.total },
        },
      ],
      total: {
        label: "UICA",
        amount: { currency: "USD", value: route.params.total },
      },
    };
    // # Don't work
    // const OPTIONS = {
    //   requestPayerName: true,
    //   requestPayerPhone: true,
    //   requestPayerEmail: true,
    // };

    const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
    paymentRequest
      .canMakePayments()
      .then((canMakePayment) => {
        if (!canMakePayment) {
          Alert.alert("Apple Pay", "Apple Pay is not available in this device");
          return;
        }
        paymentRequest
          .show()
          .then((paymentResponse) => {
            const { paymentToken } = paymentResponse.details;

            axios
              .post(`${apiUrl}/charge/applePay`, {
                token: paymentToken,
                ...route.params,
              })
              .then(({ data }) => {
                if (data.success) {
                  paymentResponse.complete("success");
                } else {
                  Alert.alert(
                    "Apple Pay",
                    "Something went wrong!. please try again or use our other payment options"
                  );
                  paymentRequest.abort();
                }
              })
              .catch((error) => {
                paymentRequest.abort();
                console.log("something went wrong", error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => console.log(error));
  };
  return (
    <View>
      <Text style={styles.title}>Choose your method of payment</Text>
      <View style={styles.pageContainer}>
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.debitCard}>
            <FontAwesome style={styles.debitIcon} name="credit-card-alt" />
            <Text style={styles.debitText}>Debit/Credit Card</Text>
          </View>
        </TouchableOpacity>
        {Platform.OS === "ios" && (
          <TouchableOpacity onPress={handleApplePay}>
            <View style={styles.applePay}>
              <FontAwesome style={styles.appleIcon} name="apple" />
              <Text style={styles.appleText}>Pay</Text>
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
    backgroundColor: "#fff",
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
  debitText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  appleText: { color: "#000", fontWeight: "bold", fontSize: 18 },
  debitIcon: {
    paddingHorizontal: 5,
    fontSize: 25,
    color: "#fff",
  },
  appleIcon: {
    paddingHorizontal: 5,
    fontSize: 25,
    color: "#000",
  },
});

export default PaymentOptions;
