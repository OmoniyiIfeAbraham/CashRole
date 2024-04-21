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

const Reset = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisbility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <ScrollView style={{ padding: 25, flex: 1 }}>
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
