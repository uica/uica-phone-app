import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Drawer from "./components/Navigators/DrawerNavigator";
import Tab from "./components/Navigators/TabNavigator";
import { Login } from "./components/Screens";
import ENV from "./env";
export default function App() {
  const { apiUrl } = ENV();
  // TODO: AUTH: need to work more on the authentication part.
  // Setting loggedIn to true until resolved.
  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return loggedIn ? (
    <NavigationContainer>
      {/* TODO: AUTH: commenting out the Drawer */}
      {/* <Drawer user={user} setLoggedIn={setLoggedIn} /> */}
      {/* Adding Taps until Drawer/Auth resolved */}
      <Tab />
    </NavigationContainer>
  ) : (
    <Login setLoggedIn={setLoggedIn} setToken={setToken} setUser={setUser} />
  );
}
