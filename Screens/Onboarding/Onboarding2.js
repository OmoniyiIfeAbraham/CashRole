import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import GeneralStyle from "../../Style/General.style";
import Colors from "../../Style/ThemeColors";

const { width, height } = Dimensions.get("window");

const Onboarding2 = ({ navigation }) => {
  const [activeScreenIndex, setActiveScreenIndex] = useState(1);
  const totalScreens = 3; // Total number of onboarding screens

  const next = () => {
    navigation.navigate("Onboarding3");
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
        <TouchableOpacity style={GeneralStyle.Btn} onPress={() => next()}>
          <Text style={[GeneralStyle.MediumText]}>Let's Go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding2;
