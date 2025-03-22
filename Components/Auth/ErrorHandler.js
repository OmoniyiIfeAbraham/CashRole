import AsyncStorage from "@react-native-async-storage/async-storage";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

async function clearSessionAndNavigate(navigation) {
  try {
    await AsyncStorage.removeItem("cashrole-client-details");
    navigation.navigate("Login");
  } catch (storageError) {
    console.error("Error clearing AsyncStorage:", storageError);
  }
}

async function ErrorHandler(error, navigation, onBoard, screen) {
  console.log("ErrorHandler triggered");
  console.log("Error:", error);
  console.log("Screen:", screen);

  const responseData = error.response?.data;

  if (responseData) {
    console.log("Response Data:", responseData);

    // Handle session expiration
    if (responseData.Access === false) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Session Expired",
        textBody: "Please Sign In again",
      });

      await clearSessionAndNavigate(navigation);
      return;
    }

    // Extract error message
    const errorMessage =
      typeof responseData === "string"
        ? responseData
        : responseData?.Error || "An error occurred";

    console.log("Error Message:", errorMessage);

    // Show appropriate alert based on the screen
    if (screen === "Deposit" || errorMessage === "Amount too small") {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Error",
        textBody: errorMessage,
        button: "Close",
      });
    } else {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Error",
        textBody: errorMessage,
      });
    }

    // If the user is on the onboarding screen, log them out
    if (
      errorMessage === "You are logged Out" ||
      errorMessage === "Invalid or expired token"
    ) {
      console.log("Clearing session due to authentication error...");
      await clearSessionAndNavigate(navigation);
    }
    return;
  }

  // Handle other errors (e.g., network issues)
  console.log("Unhandled Error:", error);

  Toast.show({
    type: ALERT_TYPE.DANGER,
    title: "No Internet",
    textBody: `${error}`,
  });
}

export default ErrorHandler;
