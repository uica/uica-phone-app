import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
import Prayer from "../Prayer/Prayer";
import masjibBG from "../../assets/prayers2BG.png";
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
          source={masjibBG}
          style={{ width: "100%", height: "100%" }}
        >
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
  prayersContainer: {
    flex: 1,
  },
  prayerItem: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});

export default Prayers;
