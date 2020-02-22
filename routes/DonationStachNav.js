import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Donation from "../components/Screens/Donation";

const Stack = createStackNavigator();

function DonationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#52ae67", height: 80 }
      }}
    >
      <Stack.Screen
        name="Donation"
        options={{
          title: "DONATION",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 20 }
        }}
        component={Donation}
      />
    </Stack.Navigator>
  );
}

export default DonationStack;
