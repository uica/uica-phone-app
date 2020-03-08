import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";
import { Image, StyleSheet, View, Text, Alert } from "react-native";
import Animated from "react-native-reanimated";
export default CustomDrawerContent = ({ progress, ...rest }) => {
  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0]
  });

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      `Are you sure you want to logout?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Canceled"),
          style: "cancel"
        },
        { text: "Logout", onPress: () => rest.setLoggedIn(false) }
      ],
      { cancelable: false }
    );
  };

  return (
    <DrawerContentScrollView {...rest}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <View style={styles.profilePicContainer}>
          <Image
            source={{ uri: rest.user.userPicture }}
            style={styles.profilePic}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{rest.user.name}</Text>
        </View>
        <DrawerItemList state={styles.items} {...rest} />
        <DrawerItem
          inactiveTintColor="red"
          label="Logout"
          onPress={handleLogout}
        />
      </Animated.View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profilePicContainer: {
    alignItems: "center",
    shadowColor: "#aaa",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "#fff",
    borderWidth: 1,
    marginVertical: 10
  },
  nameContainer: {
    alignItems: "center",
    marginBottom: 10
  },
  name: {
    color: "#88aa88"
  }
});
