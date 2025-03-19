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
import { useFocusEffect } from "@react-navigation/native";
import ErrorHandler from "../../Components/Auth/ErrorHandler";

const Otp = ({ navigation, route }) => {
  const [Otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { email } = route.params;

  // function to handle otp input changes
  const handleOtpChange = (text) => {
    setOtp(text);
  };

  // confirm btn
  const confirmBtn = async () => {
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/client/register/verifyOtp?email=${email}`;
      let data = new FormData();
      data.append("OTP", Otp);

      const response = await axios.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.Error === false) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "OTP Verified Successfully",
        });
        navigation.replace("Login");
      } else {
        console.log('haha')
        console.log(response.data)
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: `${response.data.Error}`,
        });
      }
    } catch (error) {
      console.log('hmm')
      console.log(error)
      ErrorHandler(error, navigation);
    } finally {
      setIsLoading(false);
    }
  };

  const SendOtp = async (email) => {
    // console.log(email);
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/client/register/sendOtp?email=${email}`;

      const response = await axios.get(url, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // console.log(response.data);

      if (response.data?.Error === false) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "OTP Sent Successfully",
        });
        // navigation.replace("Otp", { email });
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: `${response.data.Error}`,
        });
      }
    } catch (error) {
      ErrorHandler(error, navigation);
    } finally {
      setIsLoading(false);
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
                onPress={() => SendOtp(email)}
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
