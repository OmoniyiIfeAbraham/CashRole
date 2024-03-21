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
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
