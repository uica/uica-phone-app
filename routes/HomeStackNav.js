import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../components/Screens/Home";
import Header from "../components/Shared/Header";
const Stack = createStackNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#52ae67",
          height: 80
        }
      }}
    >
      <Stack.Screen
        name="Home"
        options={{
          title: "UICA",
          headerTitle: () => <Header {...props} />,
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 28 }
        }}
        component={Home}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
