import AsyncStorage from "@react-native-async-storage/async-storage";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

async function ErrorHandler(error, navigation) {
    console.log('here')
  console.log(error);
  // console.log("yoo1");

  if (error.response?.data) {
    console.log(error.response?.data);
    // console.log("yoo2");

    if (error.response?.data.Access === false) {
      // console.log("yoo");
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Session Expired",
        textBody: "Please Sign In again",
      });

      try {
        // Remove the items before navigating
        await AsyncStorage.removeItem("cashrole-client-details");

        // Navigate to ProfileScreen after clearing storage
        navigation.navigate("Login");
      } catch (storageError) {
        console.error("Error clearing AsyncStorage:", storageError);
      }
      return;
    }

    const errorMessage =
      typeof error.response?.data === "string"
        ? error.response?.data
        : error.response?.data?.Error || "An error occurred";

    // console.log("message: ", errorMessage);

    Toast.show({
      type: ALERT_TYPE.WARNING,
      title: "Error",
      textBody: errorMessage,
    });

    if (errorMessage === "You are logged Out") {
      // console.log("hmmmmmm");

      try {
        // Remove the items before navigating
        await AsyncStorage.removeItem("cashrole-client-details");

        // console.log("done");

        // Navigate to ProfileScreen after clearing storage
        navigation.navigate("Login");
      } catch (storageError) {
        console.error("Error clearing AsyncStorage:", storageError);
      }
      // console.log("finish");
    }
    return;
  }

  console.log(error);
  // console.log("yoo3");
  // Toast.show({
  //   type: ALERT_TYPE.DANGER,
  //   title: "No Internet",
  //   textBody: "Please check internet connection",
  // });
  Toast.show({
    type: ALERT_TYPE.DANGER,
    title: "No Internet",
    textBody: `${error}`,
  });
}

export default ErrorHandler;
