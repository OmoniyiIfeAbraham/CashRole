import { View, Text, Image, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

const Onboarding1 = () => {
  return (
    <View style={{ padding: 25 }}>
      <View
        style={{
          width: width,
          height: height * 0.4,
          justifyContent: "center",
          alignItems: "center",
          paddingRight: 25
        }}
      >
        <Image
          source={require("./../../assets/Onboarding/currency_exchange.png")}
          style={{ width: "70%", height: "70%" }}
        />
      </View>
    </View>
  );
};

export default Onboarding1;
