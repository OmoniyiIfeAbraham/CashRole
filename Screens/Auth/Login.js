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

const Login = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisbility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <Pressable
      style={{ padding: 25, flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
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
        onPress={() => navigation.replace("HomeTabs")}
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
