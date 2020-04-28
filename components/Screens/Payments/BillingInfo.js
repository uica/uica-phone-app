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
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.number().required(),
  });
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  };

  const handleSubmit = (values) => {
    navigation.navigate("amount", {
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
                errors.firstName && touched.firstName
                  ? styles.inputError
                  : styles.input
              }
              onChangeText={handleChange("firstName")}
              value={values.firstName}
              placeholder="First Name"
              placeholderTextColor="#ccc"
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
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={
                errors.email && touched.email ? styles.inputError : styles.input
              }
              autoCompleteType="email"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              value={values.email}
              placeholder="Email"
              placeholderTextColor="#ccc"
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
              placeholderTextColor="#ccc"
            />

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
    color: "#000",
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
