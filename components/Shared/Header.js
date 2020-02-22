import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import logo from "../../assets/uicaHeaderWhite.png";
const Header = props => {
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.headerLogo} />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  headerLogo: {
    width: 90,
    height: 35
  }
});
export default Header;
