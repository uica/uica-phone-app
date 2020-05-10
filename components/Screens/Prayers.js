import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
import Prayer from "../Prayer/Prayer";
import prayersBG from "../../assets/prayers3BG.jpg";
import Loading from "./Loading";
import axios from "axios";
import ENV from "../../env";
const Prayers = () => {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPrayers();
  }, []);

  const fetchPrayers = () => {
    const { apiUrl } = ENV();
    axios
      .get(`${apiUrl}/prayers`)
      .then(({ data: { data } }) => {
        setPrayers(data);
        setRefreshing(false);
        setLoading(false);
      })
      .catch((error) => {
        setRefreshing(false);
        setLoading(false);
        console.log("error", error);
      });
  };

  const handlePrayerRefresh = () => {
    setRefreshing(true);
    fetchPrayers();
  };

  return (
    <View style={styles.prayersContainer}>
      {loading ? (
        <Loading />
      ) : (
        <ImageBackground
          source={prayersBG}
          style={{ width: "100%", height: "100%" }}
        >
          <View>
            <Text style={styles.header}>PRAYERS TIME</Text>
          </View>
          <FlatList
            data={prayers}
            contentContainerStyle={styles.prayerItem}
            renderItem={({ item }) => <Prayer prayer={item} />}
            keyExtractor={(item) => item.id.toString()}
            refreshing={refreshing}
            onRefresh={handlePrayerRefresh}
          />
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    opacity: 0.8,
    paddingVertical: 20,
    fontWeight: "bold",
  },
  prayersContainer: {
    flex: 1,
  },
  prayerItem: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});

export default Prayers;
