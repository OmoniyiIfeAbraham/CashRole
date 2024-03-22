import React, { useEffect } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Assuming you're using React Navigation for navigation
import Colors from "../Style/ThemeColors";
import OnboardStyleStyle from "../Style/OnboardStyle.style";

const Splash = () => {
  const navigation = useNavigation();

  // Animation value
  const animValue = new Animated.Value(0);

  useEffect(() => {
    // Start the animation
    Animated.timing(animValue, {
      toValue: 3,
      duration: 5000, // 3 seconds
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    // Navigate to the onboarding screens after the animation
    const timeout = setTimeout(() => {
      navigation.navigate("Onboarding1"); // Replace 'Onboarding' with your actual screen name
    }, 5000);

    return () => clearTimeout(timeout); // Clear the timeout if component unmounts
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.midnightBlue }}>
      <Animated.View
        style={{
          opacity: animValue,
          transform: [{ scale: animValue }],
        }}
      >
        <Text style={OnboardStyleStyle.Title}>CASHROLE</Text>
      </Animated.View>
    </View>
  );
};

export default Splash;
