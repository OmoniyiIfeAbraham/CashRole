import {
  View,
  Text,
  Pressable,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../Style/ThemeColors";
import GeneralStyle from "../../../Style/General.style";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { baseAPIUrl } from "../../../Global/Global";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import ErrorHandler from "../../../Components/Auth/ErrorHandler";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";

const ForgotOtp = ({ navigation, route }) => {
  const [Otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { email } = route.params;
  console.log(email);

  // function to handle otp input changes
  const handleOtpChange = (text) => {
    setOtp(text);
  };

  // confirm btn
  const confirmBtn = async () => {
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/client/forgotPassword/verifyOtp?email=${email}`;
      let data = new FormData();
      data.append("OTP", Otp);

      console.log(Otp);

      const response = await axios.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.Error === false) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "OTP Verified Successfully",
        });
        navigation.replace("Reset", { id: response.data.User });
      } else {
        console.log("haha");
        console.log(response.data);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: `${response.data.Error}`,
        });
      }
    } catch (error) {
      console.log("hmm");
      console.log(error);
      ErrorHandler(error, navigation);
    } finally {
      setIsLoading(false);
    }
  };

  const SendOtp = async () => {
    console.log("start");
    try {
      setIsLoading(true);
      console.log("one");
      let url = `${baseAPIUrl}/client/forgotPassword/sendOtp`;
      console.log("two");
      let data = new FormData();
      console.log("three");
      data.append("Email", email);
      console.log("four");

      const response = await axios.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("five");

      // console.log(response.data);

      if (response.data?.Error === false) {
        console.log("six");
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "OTP Sent Successfully",
        });
        console.log("seven");
      } else {
        console.log("eight");
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: `${response.data.Error}`,
        });
      }
    } catch (error) {
      console.log("nine");
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
              We have sent the verification code to the email you entered
              earlier
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
              onPress={() => confirmBtn()}
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
            <Pressable onPress={() => SendOtp()}>
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

export default ForgotOtp;
