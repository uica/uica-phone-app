import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Prayers from "../components/Screens/Prayers";

const Stack = createStackNavigator();

function PrayersStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#52ae67", height: 80 }
      }}
    >
      <Stack.Screen
        name="Prayers"
        options={{
          title: "PRAYER TIME",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 20 }
        }}
        component={Prayers}
      />
    </Stack.Navigator>
  );
}

export default PrayersStack;
