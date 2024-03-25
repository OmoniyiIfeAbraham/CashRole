import {
  View,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import GeneralStyle from "../../Style/General.style";
import Colors from "../../Style/ThemeColors";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Register = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("yyy-mm-dd");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    const formattedDate = selectedDate.toLocaleDateString();
    setDate(formattedDate);
    hideDatePicker();
  };

  const handlePasswordVisbility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <ScrollView style={{ padding: 25 }}>
      {/* keyboard aware view */}
      <Pressable onPress={() => Keyboard.dismiss()}>
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
            { color: Colors.midnightBlue, fontSize: 45, marginBottom: 20 },
          ]}
        >
          Sign Up
        </Text>
        {/* form */}
        {/* firstname */}
        <View style={GeneralStyle.TextInputView}>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={24}
            color="#aaa"
            style={{
              marginRight: 10,
            }}
          />
          <TextInput
            style={GeneralStyle.TextInput}
            placeholder="Your First Name"
            placeholderTextColor="#aaa"
          />
        </View>
        {/* lastname */}
        <View style={GeneralStyle.TextInputView}>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={24}
            color="#aaa"
            style={{
              marginRight: 10,
            }}
          />
          <TextInput
            style={GeneralStyle.TextInput}
            placeholder="Your Last Name"
            placeholderTextColor="#aaa"
          />
        </View>
        {/* email */}
        <View style={GeneralStyle.TextInputView}>
          <MaterialIcons
            name="mail-outline"
            size={24}
            color="#aaa"
            style={{
              marginRight: 10,
            }}
          />
          <TextInput
            style={GeneralStyle.TextInput}
            placeholder="your@gmail.com"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {/* dob */}
        <View style={GeneralStyle.TextInputView}>
          <Feather
            name="calendar"
            size={24}
            color="#aaa"
            style={{
              marginRight: 10,
            }}
          />
          <TouchableOpacity
            style={GeneralStyle.TextInput}
            onPress={() => showDatePicker()}
          >
            <Text style={{ color: "#88888888" }}>{date}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        {/* password */}
        <View style={GeneralStyle.TextInputView}>
          <MaterialIcons
            name="lock-outline"
            size={24}
            color="#aaa"
            style={{
              marginRight: 10,
            }}
          />
          <TextInput
            style={GeneralStyle.TextInput}
            placeholder="Your Password"
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            autoComplete="password"
            secureTextEntry={passwordVisible}
          />
          {!passwordVisible ? (
            <Ionicons
              name="eye"
              size={24}
              color="#aaa"
              style={{
                marginLeft: 10,
              }}
              onPress={() => handlePasswordVisbility()}
            />
          ) : (
            <Ionicons
              name="eye-off"
              size={24}
              color="#aaa"
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
            color="#aaa"
            style={{
              marginRight: 10,
            }}
          />
          <TextInput
            style={GeneralStyle.TextInput}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            autoComplete="password"
            secureTextEntry={passwordVisible}
          />
          {!passwordVisible ? (
            <Ionicons
              name="eye"
              size={24}
              color="#aaa"
              style={{
                marginLeft: 10,
              }}
              onPress={() => handlePasswordVisbility()}
            />
          ) : (
            <Ionicons
              name="eye-off"
              size={24}
              color="#aaa"
              style={{
                marginLeft: 10,
              }}
              onPress={() => handlePasswordVisbility()}
            />
          )}
        </View>
      </Pressable>
    </ScrollView>
  );
};

export default Register;
