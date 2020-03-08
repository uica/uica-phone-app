import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions } from "react-native";
import Tabs from "./TabNavigator";
import { Profile } from "../Screens";
import CustomDrawer from "../Shared/CustomDrawer";
const Drawer = createDrawerNavigator();

export default DrawerNavigator = ({ user, setLoggedIn }) => {
  const _ScreenWidth = Math.round(Dimensions.get("window").width);
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawer {...props} user={user} setLoggedIn={setLoggedIn} />
      )}
      drawerContentOptions={{
        activeTintColor: "#316d3f"
      }}
      drawerStyle={{
        width: _ScreenWidth * 0.7
      }}
    >
      <Drawer.Screen name="Home" children={() => <Tabs {...user} />} />
    </Drawer.Navigator>
  );
};
