import React from "react";
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
  const DEVICE_WIDTH = Dimensions.get("window").width;
  const handlePress = () => {
    navigation.navigate("Donation");
  };
  return (
    <View style={{ height: "50%", width: "100%" }}>
      <ScrollView horizontal pagingEnabled>
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
  }
});

export default ImageSlide;
