import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Drawer from "./components/Navigators/DrawerNavigator";
import { Login } from "./components/Screens";
import env from "./env";
export default function App() {
  const { apiUrl } = env();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return loggedIn ? (
    <NavigationContainer>
      <Drawer user={user} setLoggedIn={setLoggedIn} />
    </NavigationContainer>
  ) : (
    <Login setLoggedIn={setLoggedIn} setToken={setToken} setUser={setUser} />
  );
}
