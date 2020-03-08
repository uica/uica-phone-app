import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import logo from "../../assets/uicaHeaderWhite.png";
const Header = props => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => props.navigation.openDrawer()}
        style={styles.col1}
      >
        <FontAwesome
          style={styles.userIcon}
          name="user-circle-o"
          color="#316d3f"
        />
      </TouchableOpacity>
      <View style={styles.col2}>
        <Image source={logo} style={styles.headerLogo} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  col1: { flexDirection: "row", flexBasis: "35%" },
  col2: { flexDirection: "row", flexBasis: "60%" },
  headerLogo: {
    width: 90,
    height: 35
  },
  userIcon: {
    fontSize: 25
  }
});
export default Header;
