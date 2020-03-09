import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity
} from "react-native";

const ImageSlide = ({ images, navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const DEVICE_WIDTH = Dimensions.get("window").width;
  const scrollRef = useRef();

  useEffect(() => {
    const thisInterval = setInterval(() => {
      setSelectedIndex(
        selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
      );
    }, 5000);
    scrollRef.current.scrollTo({
      animated: true,
      y: 0,
      x: DEVICE_WIDTH * selectedIndex
    });
    return () => clearInterval(thisInterval);
  }, [selectedIndex]);

  const handlePress = () => {
    navigation.navigate("Donation");
  };

  const handleSelectIndex = event => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;

    setSelectedIndex(Math.floor(offset / viewSize));
  };
  return (
    <View style={{ height: "50%", width: "100%" }}>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        onMomentumScrollEnd={handleSelectIndex}
      >
        {images.length > 0 &&
          images.map(img => (
            <ImageBackground
              key={img.id}
              source={{
                uri: `${img.image_url}`
              }}
              style={{ width: DEVICE_WIDTH, height: "100%" }}
            >
              <View style={styles.textContainer}>
                <Text style={styles.text}>{img.caption}</Text>
                {img.hasBtn && (
                  <TouchableOpacity
                    onPress={() => handlePress(img.btnLinkTo)}
                    style={styles.slideBtn}
                  >
                    <Text style={styles.btnText}>{img.btnText}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </ImageBackground>
          ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {images.length > 0 &&
          images.map((img, i) => (
            <View
              key={i}
              style={[
                styles.dots,
                {
                  opacity: i === selectedIndex ? 1 : 0.6,
                  width: i === selectedIndex ? 8 : 6,
                  height: i === selectedIndex ? 8 : 6,
                  borderRadius: i === selectedIndex ? 4 : 3
                }
              ]}
            ></View>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    marginVertical: 20
  },
  text: {
    color: "#fff",
    fontSize: 20,
    backgroundColor: "#002b0a70",
    textAlign: "center",
    width: "100%",
    padding: 10
  },
  slideBtn: {
    backgroundColor: "#316d3f",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#333",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 1
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  },
  dotsContainer: {
    position: "absolute",
    bottom: 0,
    height: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  dots: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: "#fff",
    margin: 5
  }
});

export default ImageSlide;
