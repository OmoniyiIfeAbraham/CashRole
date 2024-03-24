import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import GeneralStyle from "../../Style/General.style";
import Colors from "../../Style/ThemeColors";
import OnboardingProgress from "../../Components/Onboarding/OnboardingProgress";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Onboarding2 = ({ navigation }) => {
  const [activeScreenIndex, setActiveScreenIndex] = useState(1);
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
        <Image source={require("./../../assets/Onboarding/peer_to_peer.png")} />
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
              { color: Colors.black, fontSize: 34, textAlign: "center" },
            ]}
          >
            Your one-stop financial services provider
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
            To drive access to digital payment and online stores for bussinesses
            in the financially excluded area of the society.
          </Text>
        </View>
        {/* button */}
        <TouchableOpacity
          style={[GeneralStyle.Btn, { backgroundColor: Colors.midnightBlue }]}
          onPress={() => next("Register")}
        >
          <Text style={[GeneralStyle.MediumText]}>Why wait!</Text>
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
        <TouchableOpacity onPress={() => next("Onboarding3")}>
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

export default Onboarding2;
