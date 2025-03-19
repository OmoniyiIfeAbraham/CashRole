import {
  View,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import GeneralStyle from "../../Style/General.style";
import Colors from "../../Style/ThemeColors";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import { ApiKey, ApiSecKey, baseAPIUrl } from "../../Global/Global";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorHandler from "../../Components/Auth/ErrorHandler";

const Login = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  // const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordVisbility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // function to handle phone number input changes
  // const handlePhoneChange = (text) => {
  //   setPhone(text);
  // };

  // function to handle email input changes
  const handleEmailChange = (text) => {
    setEmail(text); // Update the state with the current input value
  };

  // function to handle phone number input changes
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  // login btn
  const loginBtn = async () => {
    try {
      setIsLoading(true);

      let url = `${baseAPIUrl}/client/login`;
      let data = { Email: Email, Password: Password };

      // console.log("Sending Data:", data);

      const response = await axios.post(url, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (response.data.Error === false) {
        await AsyncStorage.setItem(
          "cashrole-client-details",
          JSON.stringify(response.data.Data)
        );
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Signed In Successfully",
        });
        navigation.replace("HomeTabs");
      } else if (response.data.EmailVerify === false) {
        SendOtp(Email);
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

  const SendOtp = async (email) => {
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
        navigation.replace("Otp", { email });
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
    <Pressable
      style={{ padding: 25, flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      <LoadingModal Visible={isLoading} />
      {/* cashrole title */}
      <View
        style={{
          height: "auto",
          paddingVertical: 40,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            GeneralStyle.ExtraBoldText,
            { color: Colors.midnightBlue, fontSize: 30 },
          ]}
        >
          CASHROLE
        </Text>
      </View>
      {/* form title */}
      <Text
        style={[
          GeneralStyle.BoldText,
          { color: Colors.midnightBlue, fontSize: 45 },
        ]}
      >
        Hello
      </Text>
      {/* form sub-title */}
      <Text
        style={[
          GeneralStyle.ExtraBoldText,
          { color: Colors.midnightBlue, fontSize: 16, marginBottom: 20 },
        ]}
      >
        Sign into your account
      </Text>
      {/* phone number */}
      {/* <View
        style={{
          width: "100%",
          height: 50,
          flexDirection: "row",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            width: "30%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[GeneralStyle.BoldText, { color: Colors.black }]}>
            +234
          </Text>
        </View>
        <View style={[GeneralStyle.TextInputView, { width: "70%" }]}>
          <FontAwesome
            name="phone"
            size={24}
            color={Colors.ash}
            style={{
              marginRight: 10,
            }}
          />
          <TextInput
            style={GeneralStyle.TextInput}
            placeholder="8** **** ***"
            placeholderTextColor={Colors.ash}
            autoCapitalize="none"
            autoComplete="tel"
            keyboardType="phone-pad"
            value={Phone}
            maxLength={10}
            onChangeText={handlePhoneChange}
          />
        </View>
      </View> */}
      {/* email */}
      <View style={GeneralStyle.TextInputView}>
        <MaterialIcons
          name="mail-outline"
          size={24}
          color={Colors.ash}
          style={{
            marginRight: 10,
          }}
        />
        <TextInput
          style={GeneralStyle.TextInput}
          placeholder="your@gmail.com"
          placeholderTextColor={Colors.ash}
          keyboardType="email-address"
          autoCapitalize="none"
          value={Email}
          onChangeText={handleEmailChange}
        />
      </View>
      {/* password */}
      <View style={[GeneralStyle.TextInputView, { marginBottom: 10 }]}>
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
          placeholder="Your Password"
          placeholderTextColor={Colors.ash}
          autoCapitalize="none"
          autoComplete="password"
          secureTextEntry={passwordVisible}
          value={Password}
          onChangeText={handlePasswordChange}
        />
        {!passwordVisible ? (
          <Ionicons
            name="eye"
            size={24}
            color={Colors.ash}
            style={{
              marginLeft: 10,
            }}
            onPress={() => handlePasswordVisbility()}
          />
        ) : (
          <Ionicons
            name="eye-off"
            size={24}
            color={Colors.ash}
            style={{
              marginLeft: 10,
            }}
            onPress={() => handlePasswordVisbility()}
          />
        )}
      </View>
      {/* forgot password link */}
      <Pressable>
        <Text
          style={[
            GeneralStyle.ExtraBoldText,
            { color: Colors.midnightBlue, fontSize: 22, marginBottom: 20 },
          ]}
          onPress={() => navigation.navigate("Forgot")}
        >
          Forgot Password?
        </Text>
      </Pressable>
      {/* btn */}
      <TouchableOpacity
        style={[
          GeneralStyle.Btn,
          {
            marginTop: 50,
            borderRadius: 15,
            backgroundColor: Colors.midnightBlue,
            marginBottom: 20,
          },
        ]}
        onPress={loginBtn}
      >
        <Text style={GeneralStyle.RegularText}>Sign in</Text>
      </TouchableOpacity>
      {/* register link */}
      <View
        style={{
          width: "100%",
          height: 50,
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
          Not a member of cashrole?{" "}
        </Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text
            style={[
              GeneralStyle.ExtraBoldText,
              { color: Colors.midnightBlue, fontSize: 22 },
            ]}
          >
            Sign up
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default Login;
