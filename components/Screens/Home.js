import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, View, Text } from "react-native";
import ImageSlide from "../Shared/ImageSlide";
import Loading from "./Loading";
import ENV from "../../env";
import moment from "moment";
import twelve from "twentyfour-to-twelve";
const Home = (props) => {
  const { apiUrl } = ENV();
  const [images, setImages] = useState([]);
  const [nextPrayer, setNextPrayer] = useState("00:00");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${apiUrl}/slideimages`)
      .then(({ data }) => {
        setImages(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });

    axios
      .get(`${apiUrl}/prayers`)
      .then(({ data: { data } }) => {
        const now = moment();
        let nextPrayer = {};
        for (let p of data) {
          if (p.name !== "JUMU'AH" && now.isBefore(moment(p.time, "HH:mm"))) {
            nextPrayer = p;
            break;
          } else {
            nextPrayer = data.find((p) => p.name === "FAJR");
          }
        }
        setNextPrayer(nextPrayer);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
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
        <Text style={styles.nextPrayerNameText}>{nextPrayer.name}</Text>
        <Text style={styles.nextPrayerTimeText}>{twelve(nextPrayer.time)}</Text>
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
    backgroundColor: "#52ae67",
  },
  headerText: {
    fontSize: 20,
    color: "#fff",
  },
  nextPrayerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#316d3f",
  },
  nextPrayerNameText: { fontSize: 25, color: "#ccc" },
  nextPrayerTimeText: {
    fontSize: 35,
    color: "#fff",
  },
});
export default Home;
