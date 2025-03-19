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
import Header from "../../../Components/Header/Header";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import { baseAPIUrl } from "../../../Global/Global";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import ErrorHandler from "../../../Components/Auth/ErrorHandler";

const Forgot = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (text) => {
    setEmail(text);
  };

  const Submit = async () => {
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
        navigation.replace("ForgotOtp", { email });
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
      {/* modal */}
      <LoadingModal Visible={isLoading} />
      <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
        {/* body view */}
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: Colors.white,
          }}
        >
          {/* header */}
          <Header navigation={navigation} title="Forgot Password" />
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
              Mail Address Here
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
              Enter the email address associated with your account
            </Text>
          </View>
          {/* email input */}
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
              <TextInput
                style={GeneralStyle.TextInput}
                placeholder="Your Email"
                placeholderTextColor={Colors.ash}
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                name="email"
                value={email}
                onChangeText={handleChange}
              />
            </View>
          </View>
          {/* btn */}
          <View
            style={{ width: "100%", paddingHorizontal: "20%", marginTop: 30 }}
          >
            <TouchableOpacity
              style={[
                GeneralStyle.Btn,
                { borderRadius: 15, backgroundColor: Colors.midnightBlue },
              ]}
              onPress={Submit}
            >
              <Text style={GeneralStyle.RegularText}>Recover Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Forgot;
