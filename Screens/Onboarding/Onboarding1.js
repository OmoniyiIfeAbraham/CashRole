import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import OnboardingProgress from "../../Components/Onboarding/OnboardingProgress";
import { AntDesign } from "@expo/vector-icons";
import ErrorHandler from "../../Components/Auth/ErrorHandler";
import { baseAPIUrl } from "../../Global/Global";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";

const { width, height } = Dimensions.get("window");

const Onboarding1 = ({ navigation }) => {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const totalScreens = 3; // Total number of onboarding screens

  const next = (screen) => {
    navigation.replace(screen);
  };

  const Verify = async () => {
    const userInfo = await AsyncStorage.getItem("cashrole-client-details");
    const parsedInfo = JSON.parse(userInfo);
    console.log(parsedInfo);
    console.log(parsedInfo.Auth);
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/client/verify`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      if (response.data.Error === false) {
        // await AsyncStorage.setItem(
        //   "cashrole-client-details",
        //   JSON.stringify(response.data.Data)
        // );
        console.log("yes");
        navigation.replace("HomeTabs");
      } else {
        navigation.replace("Login");
      }
    } catch (error) {
      ErrorHandler(error, navigation, onBoard);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Verify();
  }, []);

  return (
    <View style={{ padding: 25 }}>
      <LoadingModal Visible={isLoading} />
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
          onPress={() => next("Login")}
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
