import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import axios from "axios";
import uicaLogo from "./assets/UICATransparent.png";
export default function App() {
  const [prayers, setPrayers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPrayers();
  }, []);

  const fetchPrayers = () => {
    axios
      .get("http://192.168.0.31:5000/api/prayers")
      .then(({ data }) => {
        setPrayers(data);
        setRefreshing(false);
      })
      .catch(error => {
        setRefreshing(false);
        console.log("error", error);
      });
  };

  const handlePrayerRefresh = () => {
    setRefreshing(true);
    fetchPrayers();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={uicaLogo}
          style={{
            width: 150,
            height: 70,
            marginTop: 20,
            alignSelf: "center"
          }}
        />
      </View>
      <View style={styles.prayerContainer}>
        <Text style={styles.prayerHeaderText}>PRAYER TIMES</Text>
      </View>
      <FlatList
        data={prayers}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-evenly" }}
        renderItem={({ item }) => <PrayerComponent prayer={item} />}
        keyExtractor={item => item.id.toString()}
        refreshing={refreshing}
        onRefresh={handlePrayerRefresh}
      />
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Copyright&copy; Muhammad Al Juburi | 2020
        </Text>
      </View>
    </View>
  );
}

const PrayerComponent = ({ prayer }) => {
  return (
    <View style={styles.prayerContainer}>
      <View style={styles.prayerItem}>
        <Text style={styles.prayerText}>{prayer.prayerName}</Text>
      </View>
      <View style={styles.prayerItem}>
        <Text style={styles.prayerText}>{prayer.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaffea"
  },
  headerContainer: {
    backgroundColor: "#111c1d",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },
  headerText: {
    color: "#00ff00",
    fontWeight: "bold",
    paddingTop: 10,
    fontSize: 40
  },
  headerSubText: {
    color: "#00ff00",
    fontSize: 15
  },
  prayerContainer: {
    backgroundColor: "#e8f8e8",
    padding: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#eaffea"
  },
  prayerHeaderText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  prayerText: {
    fontSize: 20,
    textAlign: "left"
  },
  prayerItem: {
    flex: 1,
    paddingHorizontal: 15
  },
  footerContainer: {
    flex: 1,
    backgroundColor: "#111c1d"
  },
  footerText: {
    flex: 1,
    fontSize: 12,
    textAlign: "center",
    color: "#aaa",
    paddingVertical: 15
  }
});
