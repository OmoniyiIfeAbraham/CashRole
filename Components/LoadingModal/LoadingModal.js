import {
  Modal,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import Colors from "./../../Style/ThemeColors";
import OnboardStyleStyle from "./../../Style/General.style";

const LoadingModal = ({ Visible }) => {
  // Animation value
  const animValue = new Animated.Value(0);

  useEffect(() => {
    // Start the animation
    Animated.loop(
      Animated.timing(animValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    return () => {
      animValue.stopAnimation();
    }; // Stop animation when unmounting
  }, []);

  return (
    <Modal
      transparent={true}
      presentationStyle="overFullScreen"
      visible={Visible}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                transform: [
                  {
                    rotate: animValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.logoText}>CASHROLE</Text>
          </Animated.View>
          <ActivityIndicator size="large" color={Colors.white} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: Colors.midnightBlue,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: Colors.white,
  },
});

export default LoadingModal;
