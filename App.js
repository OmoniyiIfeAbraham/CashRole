import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useFonts,
  AlegreyaSans_700Bold,
  AlegreyaSans_400Regular,
  AlegreyaSans_800ExtraBold,
  AlegreyaSans_300Light,
  AlegreyaSans_500Medium,
} from "@expo-google-fonts/alegreya-sans";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Colors from "./Style/ThemeColors";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./Screens/Splash";
import Onboarding1 from "./Screens/Onboarding/Onboarding1";
import Onboarding2 from "./Screens/Onboarding/Onboarding2";
import Onboarding3 from "./Screens/Onboarding/Onboarding3";
import Register from "./Screens/Auth/Register";
import Login from "./Screens/Auth/Login";
import Otp from "./Screens/Auth/Otp";
import MainTabNavigator from "./Components/Navigators/MainTabNavigator";
import CreateSeller from "./Screens/Sellers Screens/CreateSeller";
import ConnectSeller from "./Screens/Sellers Screens/ConnectSeller";
import RegisteredSellers from "./Screens/Sellers Screens/RegisteredSellers";
import Withdraw from "./Screens/Sellers Screens/Withdraw";
import { AlertNotificationRoot } from "react-native-alert-notification";
import Stores from "./Screens/Sellers Screens/Stores";

const Stack = createNativeStackNavigator();

export default function App() {
  // loading fonts
  let [fontsLoaded] = useFonts({
    AlegreyaSans_700Bold,
    AlegreyaSans_400Regular,
    AlegreyaSans_800ExtraBold,
    AlegreyaSans_300Light,
    AlegreyaSans_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <AlertNotificationRoot theme="light">
      <SafeAreaProvider style={{ flex: 1, backgroundColor: Colors.white }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="splash"
            screenOptions={{ headerShown: false, animation: "slide_from_left" }}
          >
            <Stack.Screen name="splash" component={Splash} />

            {/* Onboarding */}
            <Stack.Group>
              <Stack.Screen name="Onboarding1" component={Onboarding1} />
              <Stack.Screen name="Onboarding2" component={Onboarding2} />
              <Stack.Screen name="Onboarding3" component={Onboarding3} />
            </Stack.Group>

            {/* Auth */}
            <Stack.Group>
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Otp" component={Otp} />
            </Stack.Group>

            {/* Home Screen */}
            <Stack.Screen name="HomeTabs" component={MainTabNavigator} />

            {/* Sellers Screens */}
            <Stack.Group>
              <Stack.Screen name="CreateSeller" component={CreateSeller} />
              <Stack.Screen name="ConnectSeller" component={ConnectSeller} />
              <Stack.Screen
                name="RegisteredSellers"
                component={RegisteredSellers}
              />
              <Stack.Screen name="Withdraw" component={Withdraw} />
              <Stack.Screen name="Stores" component={Stores} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="light" />
      </SafeAreaProvider>
    </AlertNotificationRoot>
  );
}
