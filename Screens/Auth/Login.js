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

const Login = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordVisbility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // function to handle phone number input changes
  const handlePhoneChange = (text) => {
    setPhone(text);
  };

  // function to handle phone number input changes
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  // login btn
  const loginBtn = async () => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*?])[A-Za-z\d@#$!%^&*?]{8,}$/;
    const isPasswordValid = passwordPattern.test(Password);

    if (Phone === "" || Password === "") {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Fill all Fields!!!",
      });
    } else if (Password.length < 8) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Password must be at least 8 Characters Long!!!",
      });
    } else if (isPasswordValid === false) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Password is too weak!!!",
      });
    } else if (Phone.length < 10) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Invalid Phone Number!!!",
      });
    } else {
      setIsLoading(true);
      const url = `${baseAPIUrl}/api/v1/merchant/login/`;

      const phone = `+234${Phone}`;
      const password = Password;

      let data = JSON.stringify({
        phone: phone,
        password: password,
      });

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
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Login Successfull",
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
              if (userData.phone && userData.phone.length > 0) {
                Toast.show({
                  type: ALERT_TYPE.WARNING,
                  title: userData.phone[0], // Assuming the first element is the relevant message
                });
                setIsLoading(false);
                return;
              } else if (userData.message && userData.message.length > 0) {
                Toast.show({
                  type: ALERT_TYPE.WARNING,
                  title: userData.message, // Assuming the first element is the relevant message
                });
                const saveNewOtp = async () => {
                  await AsyncStorage.setItem("OTP", userData.otp);
                };
                saveNewOtp();
                setIsLoading(false);
                navigation.navigate("Otp");
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
      <View
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
