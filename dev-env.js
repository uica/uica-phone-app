/*****************************
 * copy this file in the root directory as `env.js`
 * add your staging/production environment variables
 * make sure you gitignore `env.js`
 ******************************/

import Constants from "expo-constants";
import { Platform } from "react-native";

const localhost = Platform.OS === "ios" ? "localhost:8080" : "10.0.2.2:8080";

const ENV = {
  dev: {
    apiUrl: "",
    FB_ID: "",
    GOOGLE_CLIENT_ID: "",
    GOOGLE_CLIENT_SECRET: "",
  },
  staging: {
    apiUrl: "",
    FB_ID: "",
    GOOGLE_CLIENT_ID: "",
    GOOGLE_CLIENT_SECRET: "",
  },
  production: {
    apiUrl: "",
    FB_ID: "",
    GOOGLE_CLIENT_ID: "",
    GOOGLE_CLIENT_SECRET: "",
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "staging") {
    return ENV.staging;
  } else if (env === "production") {
    return ENV.production;
  }
};

export default getEnvVars;
