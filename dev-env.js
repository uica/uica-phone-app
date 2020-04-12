/*****************************
 * copy this file in the root directory as `env.js`
 * add your staging/production environment variables
 * make sure you gitignore `env.js`
 ******************************/

import Constants from "expo-constants";

const ENV = {
  development: {
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
    return ENV.development;
  } else if (env === "production") {
    return ENV.production;
  }
};
export default getEnvVars;
