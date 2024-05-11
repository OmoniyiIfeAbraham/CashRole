import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Keyboard,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../Style/ThemeColors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import GeneralStyle from "../../Style/General.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useState } from "react";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import { ApiKey, ApiSecKey, baseAPIUrl } from "../../Global/Global";
import axios from "axios";

const Otp = ({ navigation }) => {
  const [savedOtp, setSavedOtp] = useState("");
  const [Phone, setPhone] = useState("");
  const [Otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to retrieve otp
  async function getItem(item1Key, item2Key) {
    try {
      const [item1Value, item2Value] = await Promise.all([
        AsyncStorage.getItem(item1Key),
        AsyncStorage.getItem(item2Key),
      ]);

      if (item1Value !== null || item2Value !== null) {
        // Items found in AsyncStorage
        console.log("Item 1:", item1Value);
        console.log("Item 2:", item2Value);
        return { item1: item1Value, item2: item2Value };
      } else {
        // One or both items not found
        console.log("One or all items not found");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving items:", error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const items = await getItem("OTP", "Phone");
      if (items) {
        setSavedOtp(items.item1);
        setPhone(items.item2);
      }
    }
    fetchData();
  }, []);

  // function to handle otp input changes
  const handleOtpChange = (text) => {
    setOtp(text);
  };

  // confirm btn
  const confirmBtn = async () => {
    if (Otp === "") {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Fill Otp Field!!!",
      });
    } else if (Otp !== savedOtp) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Incorrect Otp!!!",
      });
    } else {
      setIsLoading(true);
      const url = `${baseAPIUrl}/api/v1/merchant/verify-otp/`;

      const otp = Otp;
      const phone = Phone;

      let data = JSON.stringify({ otp: otp, phone: phone });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${url}`,
        headers: {
          "Api-Key": `${ApiKey}`,
          "Api-Sec-Key": `${ApiSecKey}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          // saving necessary info
          const saveData = async () => {
            await AsyncStorage.setItem("fName", response.data.data.first_name);
            await AsyncStorage.setItem("lName", response.data.data.last_name);
            await AsyncStorage.setItem(
              "userName",
              response.data.data.profile.username
            );
          };
          saveData();
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Phone Number Verified!!!",
          });
          setIsLoading(false);
          navigation.replace("HomeTabs");
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            const errorMessage = error.response.data.error.message;
            // Check if the error message is in the expected format
            if (errorMessage === "Error processing your request") {
              const userData = error.response.data.data;
              if (
                userData.non_field_errors &&
                userData.non_field_errors.length > 0
              ) {
                Toast.show({
                  type: ALERT_TYPE.WARNING,
                  title: userData.non_field_errors[0], // Assuming the first element is the relevant message
                });
                setIsLoading(false);
                return;
              }
            }
          }
          // If the error format is unexpected or doesn't contain the specific message, show the default error message
          console.log(error);
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: error.message,
          });
          setIsLoading(false);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.midnightBlue }}>
      <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
        {/* modal */}
        <LoadingModal Visible={isLoading} />
        <View style={{ height: "30%" }}>
          {/* back btn */}
          <TouchableOpacity
            style={GeneralStyle.BackBtn}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={30} color={Colors.black} />
          </TouchableOpacity>
        </View>
        {/* body view */}
        <View
          style={{
            width: "100%",
            height: "70%",
            backgroundColor: Colors.white,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          {/* title */}
          <View
            style={{
              width: "100%",
              height: 100,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text
              style={[
                GeneralStyle.BoldText,
                { color: Colors.black, fontSize: 25 },
              ]}
            >
              Enter One Time Password
            </Text>
          </View>
          {/* sub title */}
          <View
            style={{
              width: "100%",
              paddingVertical: 20,
              paddingHorizontal: 25,
            }}
          >
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.black, fontSize: 17 },
              ]}
            >
              We have sent the verification code to the number you entered for
              registeration earlier
            </Text>
          </View>
          {/* otp input */}
          <View style={{ paddingHorizontal: 25 }}>
            <View
              style={[
                GeneralStyle.TextInputView,
                {
                  marginBottom: 10,
                  elevation: 0,
                  borderColor: Colors.ash,
                  borderWidth: 1,
                },
              ]}
            >
              <MaterialIcons
                name="lock-outline"
                size={24}
                color={Colors.ash}
                style={{
                  marginRight: 10,
                }}
              />
              <TextInput
                style={GeneralStyle.TextInput}
                placeholder="Your OTP"
                placeholderTextColor={Colors.ash}
                autoCapitalize="none"
                autoComplete="cc-number"
                keyboardType="number-pad"
                value={Otp}
                onChangeText={handleOtpChange}
              />
            </View>
          </View>
          {/* btn */}
          <View
            style={{ width: "100%", paddingHorizontal: 100, marginTop: 30 }}
          >
            <TouchableOpacity
              style={[
                GeneralStyle.Btn,
                { borderRadius: 15, backgroundColor: Colors.midnightBlue },
              ]}
              onPress={confirmBtn}
            >
              <Text style={GeneralStyle.RegularText}>Confirm</Text>
            </TouchableOpacity>
          </View>
          {/* resend link */}
          <View
            style={{
              width: "100%",
              height: 60,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.ash, fontSize: 20 },
              ]}
            >
              Did not receive OTP?{" "}
            </Text>
            <Pressable>
              <Text
                style={[
                  GeneralStyle.ExtraBoldText,
                  { color: Colors.midnightBlue, fontSize: 22 },
                ]}
              >
                Resend
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Otp;
