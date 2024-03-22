import React from "react";
import { View, StyleSheet } from "react-native";
import GeneralStyle from "../../Style/General.style";

const OnboardingProgress = ({ totalScreens, activeScreenIndex }) => {
  return (
    <View style={styles.container}>
      {/* Render dots based on totalScreens */}
      {Array.from({ length: totalScreens }, (_, index) => (
        <View
          key={index}
          style={[
            GeneralStyle.dot,
            index === activeScreenIndex && GeneralStyle.activeDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default OnboardingProgress;
