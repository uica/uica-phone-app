import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { Formik } from "formik";
import stripe from "tipsi-stripe";
import { PaymentsStripe } from "expo-payments-stripe";
stripe.setOptions({});

const Payment = props => {
  const initialValues = {
    firstName: "",
    LastName: "",
    Address: {
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: ""
    },
    cardNumber: "",
    cardExpDate: "",
    cardCSV: ""
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log("TCL: values", values);
          console.log("TCL: actions", actions);
        }}
      >
        {props => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={props.handleChange("firstName")}
              value={props.values.firstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={props.handleChange("lastName")}
              value={props.values.lastName}
            />
            <Button
              title="Submit Payment"
              style={styles.submitBtn}
              color="#52ae67"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    marginVertical: 5
  },
  submitBtn: {
    width: "100%"
  }
});

export default Payment;
