import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, View, Text } from "react-native";
import ImageSlide from "../Shared/ImageSlide";
import Loading from "./Loading";
import env from "../../env";
const Home = props => {
  const { apiUrl } = env();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${apiUrl}/slideimages`)
      .then(({ data }) => {
        setImages(data);
        setLoading(false);
      })
      .catch(err => console.log(err));
    setLoading(false);
  }, []);

  return loading ? (
    <View style={{ width: "100%", height: "100%" }}>
      <Loading />
    </View>
  ) : (
    <View style={{ width: "100%", height: "100%" }}>
      <ImageSlide {...props} images={images} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Next Prayer</Text>
      </View>
      <View style={styles.nextPrayerContainer}>
        <Text style={styles.nextPrayerNameText}>Fajr</Text>
        <Text style={styles.nextPrayerTimeText}>06:00 AM</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "#52ae67"
  },
  headerText: {
    fontSize: 20,
    color: "#fff"
  },
  nextPrayerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#316d3f"
  },
  nextPrayerNameText: { fontSize: 25, color: "#ccc" },
  nextPrayerTimeText: {
    fontSize: 35,
    color: "#fff"
  }
});
export default Home;
