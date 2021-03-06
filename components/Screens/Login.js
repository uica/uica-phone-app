import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import bg from "../../assets/prayersBG.jpeg";
import { FontAwesome } from "@expo/vector-icons";
import Loading from "./Loading";
import { AuthSession } from "expo";
import env from "../../env";
import axios from "axios";
// import * as AppleAuthentication from "expo-apple-authentication";

const Login = ({ setLoggedIn, setUser, setToken }) => {
  const [loading, setLoading] = useState(false);

  const handleFacebook = async () => {
    setLoading(true);
    const { FB_ID } = env();

    const redirectUrl = AuthSession.getRedirectUrl();

    const { type, params } = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FB_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    }).catch((error) => {
      console.log(error);
      setLoading(false);
      setLoggedIn(false);
      setUser(null);
      setToken(null);
    });

    if (type === "success") {
      const { access_token } = params;
      const { data: user } = await axios.get(
        `https://graph.facebook.com/me?access_token=${access_token}`
      );

      const {
        request: { responseURL: userPicture },
      } = await axios.get(
        `https://graph.facebook.com/me/picture?type=large&access_token=${access_token}`
      );

      setLoading(false);
      setUser({ ...user, userPicture });
      setToken(access_token);
      setLoggedIn(true);
    } else {
      setLoading(false);
      setLoggedIn(false);
      setUser(null);
      setToken(null);
    }
  };

  const handleGoogle = async () => {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = env();
    setLoading(true);

    const redirectUrl = await AuthSession.getRedirectUrl();
    const { type, params } = await AuthSession.startAsync({
      authUrl:
        `https://accounts.google.com/o/oauth2/v2/auth/userinfo.email?` +
        `client_id=${GOOGLE_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&response_type=code` +
        `&access_type=offline` +
        `&scope=profile`,
    }).catch((error) => {
      console.log(error);
      setLoading(false);
      setLoggedIn(false);
      setUser(null);
      setToken(null);
    });

    if (type === "success") {
      const { code } = params;
      const { data } = await axios
        .post(
          `https://accounts.google.com/o/oauth2/token?` +
            `code=${code}` +
            `&client_id=${GOOGLE_CLIENT_ID}` +
            `&client_secret=${GOOGLE_CLIENT_SECRET}&redirect_uri=${redirectUrl}` +
            `&grant_type=authorization_code`
        )
        .then(({ data }) => {
          setToken(data.access_token);
          return axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
            {
              headers: {
                Authorization: "Bearer " + data.access_token,
              },
            }
          );
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setLoggedIn(false);
        });

      const { name, picture } = data;
      setLoading(false);
      setUser({ name, userPicture: picture });
      setLoggedIn(true);
    } else {
      setLoading(false);
      setLoggedIn(false);
      setUser(null);
      setToken(null);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // signed in
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
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
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.appleBtn}
          onPress={handleAppleSignIn}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  loginContainer: {
    padding: 15,
    backgroundColor: "#fff",
    shadowColor: "#aaa",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
  },
  loginHeader: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 20,
  },
  facebookBtn: {
    backgroundColor: "#3b5998",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
  },
  facebookText: {
    color: "#fff",
    marginHorizontal: 5,
  },
  facebookIcon: {
    color: "#fff",
    fontSize: 30,
  },
  googleBtn: {
    backgroundColor: "#db3236",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  googleText: {
    color: "#fff",
    marginHorizontal: 5,
  },
  googleIcon: {
    color: "#fff",
    fontSize: 30,
  },
  appleBtn: {
    width: "100%",
    height: 50,
    marginTop: 5,
  },
});
export default Login;
