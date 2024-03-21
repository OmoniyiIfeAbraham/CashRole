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
        </Stack.Navigator>
      </NavigationContainer>
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
