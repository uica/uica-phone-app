import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Prayers from "../components/Screens/Prayers";
import Header from "../components/Shared/Header";
const Stack = createStackNavigator();

function PrayersStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#52ae67", height: 100 },
      }}
    >
      <Stack.Screen
        name="Prayers"
        options={{
          title: "PRAYER TIME",
          headerTitle: () => <Header {...props} />,
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 20 },
        }}
        component={Prayers}
      />
    </Stack.Navigator>
  );
}

export default PrayersStack;
