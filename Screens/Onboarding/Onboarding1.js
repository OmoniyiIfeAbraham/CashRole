import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import OnboardingProgress from "../../Components/Onboarding/OnboardingProgress";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Onboarding1 = ({ navigation }) => {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const totalScreens = 3; // Total number of onboarding screens

  const next = (screen) => {
    navigation.replace(screen);
  };

  return (
    <View style={{ padding: 25 }}>
      {/* image view */}
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
      <View
        style={{
          height: height * 0.4,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={[
              GeneralStyle.BoldText,
              { color: Colors.black, fontSize: 36, textAlign: "center" },
            ]}
          >
            Financial Transactions made easy
          </Text>
          <Text
            style={
              ([GeneralStyle.RegularText],
              {
                color: Colors.black,
                fontSize: 20,
                textAlign: "center",
                marginTop: 20,
              })
            }
          >
            Get Easy Access to Global Payment Solutions.
          </Text>
        </View>
        {/* button */}
        <TouchableOpacity
          style={GeneralStyle.Btn}
          onPress={() => next("Register")}
        >
          <Text style={[GeneralStyle.MediumText]}>Let's Go</Text>
        </TouchableOpacity>
      </View>
      {/* onboarding progress */}
      <View
        style={{
          height: height * 0.2,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "flex-end",
          paddingBottom: 50,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => next("Onboarding3")}
        >
          <Text
            style={
              ([GeneralStyle.MediumText],
              { color: Colors.mediumSeaGreen, fontSize: 24 })
            }
          >
            Skip
          </Text>
        </TouchableOpacity>
        <OnboardingProgress
          totalScreens={totalScreens}
          activeScreenIndex={activeScreenIndex}
        />
        <TouchableOpacity onPress={() => next("Onboarding2")}>
          <AntDesign
            name="arrowright"
            size={28}
            color={Colors.mediumSeaGreen}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding1;
