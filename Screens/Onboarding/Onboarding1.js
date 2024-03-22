import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import OnboardStyleStyle from "../../Style/OnboardStyle.style";
import Colors from "../../Style/ThemeColors";

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
          paddingRight: 25,
        }}
      >
        <Image
          source={require("./../../assets/Onboarding/currency_exchange.png")}
          style={{ width: "70%", height: "70%" }}
        />
      </View>
      <Text
        style={[
          OnboardStyleStyle.BoldText,
          { color: Colors.black, fontSize: 36, textAlign: "center" },
        ]}
      >
        Financial Transactions made easy
      </Text>
    </View>
  );
};

export default Onboarding1;
