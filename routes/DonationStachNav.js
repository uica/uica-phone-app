import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Donation,
  Payment,
  BillingInfo,
  Amount,
  PaymentComplete,
  PaymentOptions,
} from "../components/Screens";
import Header from "../components/Shared/Header";
const Stack = createStackNavigator();

function DonationStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#52ae67", height: 100 },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="donation"
        options={{
          title: "Donation",
          headerTitle: () => <Header {...props} />,
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 20 },
        }}
        component={Donation}
      />
      <Stack.Screen
        name="billingInfo"
        options={{
          title: "Contact Information",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 20 },
        }}
        component={BillingInfo}
      />
      <Stack.Screen
        name="amount"
        options={{
          title: "Amount",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 20 },
        }}
        component={Amount}
      />
      <Stack.Screen
        name="paymentOptions"
        options={{
          title: "Payment Options",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 20 },
        }}
        component={PaymentOptions}
      />

      <Stack.Screen
        name="payment"
        options={{
          title: "Make Payment",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 20 },
        }}
        component={Payment}
      />
      <Stack.Screen
        name="paymentComplete"
        options={{
          title: "Thank You",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 20 },
          headerLeft: false,
          gestureEnabled: false,
        }}
        component={PaymentComplete}
      />
    </Stack.Navigator>
  );
}

export default DonationStack;
