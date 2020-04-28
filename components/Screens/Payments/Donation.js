import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
} from "react-native";

const Donation = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const [otherType, setOtherType] = useState("");

  const donations = [
    { id: 1, name: "Zakah" },
    { id: 2, name: "Daily Operation" },
    { id: 3, name: "Masjid Expansion" },
    { id: 4, name: "Sponsor Our Refugee Students" },
    { id: 5, name: "Other" },
  ];

  handleSelect = (item) => {
    setSelected(item);
    setOtherType("");
  };

  handleContinue = () => {
    const data = {
      description:
        (selected && selected.name !== "Other" && selected.name) ||
        (!!otherType && otherType) ||
        "Other",
    };

    navigation.navigate("billingInfo", data);
  };
  return (
    <SafeAreaView>
      <Text style={styles.title}>Select type of donation</Text>
      <View>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={donations}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <View
                style={
                  selected && selected.id === item.id
                    ? styles.itemSelected
                    : styles.itemContainer
                }
              >
                <Text
                  style={
                    selected && selected.id === item.id && styles.selectedText
                  }
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {selected && selected.name === "Other" && (
        <TextInput
          onChangeText={(text) => setOtherType(text)}
          style={styles.input}
          placeholder="Describe your type of donation"
          value={otherType}
        />
      )}
      {selected && (
        <TouchableOpacity onPress={handleContinue}>
          <View style={styles.continue}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Continue</Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  title: {
    paddingVertical: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
    shadowRadius: 1,
  },
  itemSelected: {
    elevation: 3,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    backgroundColor: "#213326",
    shadowColor: "#aaa",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },
  selectedText: {
    color: "#fff",
  },
  continue: {
    elevation: 3,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
    backgroundColor: "#52ae67",
    shadowColor: "#aaa",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },
  input: {
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#cceeff",
    borderRadius: 5,
    fontSize: 16,
  },
});
export default Donation;
