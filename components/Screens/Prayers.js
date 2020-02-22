import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground
} from "react-native";
import Prayer from "../Prayer/Prayer";
import masjibBG from "../../assets/prayersBG.jpg";
import axios from "axios";

const Prayers = () => {
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
    <View style={styles.prayersContainer}>
      <ImageBackground
        source={masjibBG}
        style={{ width: "100%", height: "100%" }}
      >
        <FlatList
          data={prayers}
          contentContainerStyle={styles.prayerItem}
          renderItem={({ item }) => <Prayer prayer={item} />}
          keyExtractor={item => item.id.toString()}
          refreshing={refreshing}
          onRefresh={handlePrayerRefresh}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  prayersContainer: {
    flex: 1
  },
  prayerItem: {
    flexGrow: 1,
    justifyContent: "flex-end"
  }
});

export default Prayers;
