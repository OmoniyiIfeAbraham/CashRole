import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import GeneralStyle from "../../../Style/General.style";
import Colors from "../../../Style/ThemeColors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { baseAPIUrl } from "../../../Global/Global";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import ErrorHandler from "../../../Components/Auth/ErrorHandler";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";

const Reset = ({ navigation, route }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = route.params;
  console.log(id);

  const handlePasswordVisbility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const Reset = async () => {
    if (Password !== confirmPassword) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Password and Confirm Password must be the same!!!",
      });
    } else {
      try {
        setIsLoading(true);
        let url = `${baseAPIUrl}/client/forgotPassword/reset?id=${id}`;
        let data = new FormData();
        data.append("Password", Password);

        const response = await axios.post(url, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // console.log(response.data);

        if (response.data?.Error === false) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: "Password Updated Successfully",
          });
          navigation.replace("Login");
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
    }
  };
  return (
    <ScrollView style={{ padding: 25, flex: 1 }}>
      {/* modal */}
      <LoadingModal Visible={isLoading} />
      {/* title */}
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
          Forgot Password
        </Text>
      </View>
      {/* form title */}
      <Text
        style={[
          GeneralStyle.BoldText,
          { color: Colors.midnightBlue, fontSize: 45, marginBottom: 20 },
        ]}
      >
        Reset
      </Text>
      {/* form */}
      {/* password */}
      <View style={GeneralStyle.TextInputView}>
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
          placeholder="New Password"
          placeholderTextColor={Colors.ash}
          autoCapitalize="none"
          autoComplete="password"
          secureTextEntry={passwordVisible}
          name="Password"
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
      {/* confirm password */}
      <View style={GeneralStyle.TextInputView}>
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
          placeholder="Confirm Password"
          placeholderTextColor={Colors.ash}
          autoCapitalize="none"
          autoComplete="password"
          secureTextEntry={passwordVisible}
          name="confirmPassword"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
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
      {/* btn */}
      <TouchableOpacity
        style={[
          GeneralStyle.Btn,
          {
            marginTop: 50,
            borderRadius: 15,
            backgroundColor: Colors.midnightBlue,
          },
        ]}
        onPress={() => navigation.replace("HomeTabs")}
      >
        <Text style={GeneralStyle.RegularText}>Reset</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Reset;
