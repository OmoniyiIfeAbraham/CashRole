import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import GeneralStyle from "../../Style/General.style";
import Colors from "../../Style/ThemeColors";
import OnboardingProgress from "../../Components/Onboarding/OnboardingProgress";

const { width, height } = Dimensions.get("window");

const Onboarding3 = ({ navigation }) => {
  const [activeScreenIndex, setActiveScreenIndex] = useState(2);
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
          source={require("./../../assets/Onboarding/send_and_receive_assets.png")}
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
              { color: Colors.black, fontSize: 32, textAlign: "center" },
            ]}
          >
            Your one-stop financial solutions partner
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
            Bank Transfer in an instant, beyond borders, across the globe.
          </Text>
        </View>
        {/* button */}
        <TouchableOpacity
          style={[GeneralStyle.Btn, { backgroundColor: Colors.tomato }]}
          onPress={() => next("Register")}
        >
          <Text style={[GeneralStyle.MediumText]}>Let's Start</Text>
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
        <View></View>
        <OnboardingProgress
          totalScreens={totalScreens}
          activeScreenIndex={activeScreenIndex}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={() => next("Register")}>
          <Text
            style={
              ([GeneralStyle.MediumText],
              { color: Colors.mediumSeaGreen, fontSize: 24 })
            }
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding3;
