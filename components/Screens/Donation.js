import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import sadaqa from "../../assets/sadaqa.png";
import masjid from "../../assets/masjidIcon.png";
const Donation = ({ navigation }) => {
  const [donations, setDonations] = useState([
    { id: 1, name: "General", icon: sadaqa },
    { id: 2, name: "Masjid Expansion", icon: masjid }
  ]);
  return (
    <View>
      <Text style={styles.title}>Select type of donation</Text>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={donations}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("amount", { description: item.name })
            }
          >
            <View style={styles.itemContainer}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.donationItemText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    paddingVertical: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  itemContainer: {
    elevation: 3,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    backgroundColor: "#fefefe",
    shadowColor: "#aaa",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 20
  }
});
export default Donation;
