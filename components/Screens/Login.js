import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import bg from "../../assets/prayersBG.jpeg";
import { FontAwesome } from "@expo/vector-icons";
import Loading from "./Loading";
import { AuthSession } from "expo";
import env from "../../env";
import axios from "axios";

const Login = ({ setLoggedIn, setUser, setToken }) => {
  const [loading, setLoading] = useState(false);
  const handleFacebook = async () => {
    setLoading(true);
    const { FB_ID } = env();

    let redirectUrl = AuthSession.getRedirectUrl();

    let {
      params: { access_token }
    } = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FB_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`
    }).catch(error => {
      console.log(error);
      setLoading(false);
      setLoggedIn(false);
      setUser(null);
      setToken(null);
    });

    const { data: user } = await axios.get(
      `https://graph.facebook.com/me?access_token=${access_token}`
    );
    const {
      request: { responseURL: userPicture }
    } = await axios.get(
      `https://graph.facebook.com/me/picture?type=large&access_token=${access_token}`
    );

    setLoading(false);
    setUser({ ...user, userPicture });
    setToken(access_token);
    setLoggedIn(true);
  };
  const handleGoogle = () => {
    console.log("Google");
  };
  return loading ? (
    <Loading />
  ) : (
    <ImageBackground source={bg} style={styles.bg}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.loginContainer}>
        <Text style={styles.loginHeader}>Sign In</Text>
        <TouchableOpacity style={styles.facebookBtn} onPress={handleFacebook}>
          <FontAwesome name="facebook-square" style={styles.facebookIcon} />
          <Text style={styles.facebookText}>Sign in with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleBtn} onPress={handleGoogle}>
          <FontAwesome name="google" style={styles.googleIcon} />
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  loginContainer: {
    padding: 15,
    backgroundColor: "#fff",
    shadowColor: "#aaa",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 1
  },
  loginHeader: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 20
  },
  facebookBtn: {
    backgroundColor: "#3b5998",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5
  },
  facebookText: {
    color: "#fff",
    marginHorizontal: 5
  },
  facebookIcon: {
    color: "#fff",
    fontSize: 30
  },
  googleBtn: {
    backgroundColor: "#db3236",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  googleText: {
    color: "#fff",
    marginHorizontal: 5
  },
  googleIcon: {
    color: "#fff",
    fontSize: 30
  }
});
export default Login;
