import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Picker,
} from "react-native";
import * as yup from "yup";
import states from "../../../utils/states";
import { Formik } from "formik";
const BillingInfo = ({ navigation, route }) => {
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zipCode: yup.number().required(),
    phoneNumber: yup.number().required(),
  });
  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  };

  const handleSubmit = (values) => {
    navigation.navigate("payment", {
      billingInfo: values,
      ...route.params,
    });
  };

  return (
    <ScrollView style={styles.formContainer}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              style={
                errors.email && touched.email ? styles.inputError : styles.input
              }
              autoCompleteType="email"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              value={values.email}
              placeholder="Email"
            />
            <TextInput
              style={
                errors.phoneNumber && touched.phoneNumber
                  ? styles.inputError
                  : styles.input
              }
              autoCompleteType="tel"
              keyboardType="phone-pad"
              onChangeText={handleChange("phoneNumber")}
              value={values.phoneNumber}
              placeholder="Phone number"
            />
            <TextInput
              style={
                errors.firstName && touched.firstName
                  ? styles.inputError
                  : styles.input
              }
              onChangeText={handleChange("firstName")}
              value={values.firstName}
              placeholder="First Name"
            />
            <TextInput
              style={
                errors.lastName && touched.lastName
                  ? styles.inputError
                  : styles.input
              }
              onChangeText={handleChange("lastName")}
              value={values.lastName}
              placeholder="Last Name"
            />
            <TextInput
              style={
                errors.address && touched.address
                  ? styles.inputError
                  : styles.input
              }
              onChangeText={handleChange("address")}
              value={values.address}
              placeholder="Street Address"
            />
            <TextInput
              style={
                errors.city && touched.city ? styles.inputError : styles.input
              }
              onChangeText={handleChange("city")}
              value={values.city}
              placeholder="City"
            />
            <Picker
              style={
                errors.state && touched.state
                  ? styles.stateError
                  : styles.states
              }
              selectedValue={values.state}
              onValueChange={(itemValue, itemIndex) =>
                setFieldValue("state", itemValue)
              }
            >
              <Picker.Item label="Select State" value="" />
              {states.map((state, i) => (
                <Picker.Item
                  key={i}
                  label={state.name}
                  value={state.abbreviation}
                />
              ))}
            </Picker>
            <View>
              <TextInput
                keyboardType="numeric"
                style={
                  errors.zipCode && touched.zipCode
                    ? styles.inputError
                    : styles.input
                }
                onChangeText={handleChange("zipCode")}
                value={values.zipCode}
                placeholder="Zip Code"
              />
            </View>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.continueBtn}>
                <Text style={styles.continueText}>Continue</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View style={{ marginBottom: 300 }}></View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
  },
  input: {
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#cceeff",
    borderRadius: 5,
    fontSize: 16,
  },
  inputError: {
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#D8000C",
    borderRadius: 5,
    fontSize: 16,
  },
  states: {
    backgroundColor: "#fff",
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#cceeff",
    borderRadius: 5,
    fontSize: 16,
  },
  stateError: {
    backgroundColor: "#fff",
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#D8000C",
    borderRadius: 5,
    fontSize: 16,
  },
  continueBtn: {
    width: "100%",
    padding: 15,
    marginVertical: 20,
    backgroundColor: "#52ae67",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
  },
  continueText: {
    color: "white",
    fontWeight: "bold",
  },
});
export default BillingInfo;
