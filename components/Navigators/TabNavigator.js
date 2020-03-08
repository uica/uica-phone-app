import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeStack from "../../routes/HomeStackNav";
import PrayersStack from "../../routes/PrayersStackNav";
import DonationStack from "../../routes/DonationStachNav";
import { FontAwesome } from "@expo/vector-icons";
const Tab = createMaterialBottomTabNavigator();

function MyTabs(props) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#316d3f"
      barStyle={{
        backgroundColor: "#52ae67",
        height: 60
      }}
      shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome
              name="home"
              size={24}
              color={focused ? color : "#316d3f"}
            />
          )
        }}
      />
      <Tab.Screen
        name="Prayers"
        component={PrayersStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome
              name="clock-o"
              size={24}
              color={focused ? color : "#316d3f"}
            />
          )
        }}
      />
      <Tab.Screen
        name="Donation"
        component={DonationStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome
              name="dollar"
              size={24}
              color={focused ? color : "#316d3f"}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
