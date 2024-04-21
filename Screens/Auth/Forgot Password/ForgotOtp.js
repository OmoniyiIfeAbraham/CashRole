import {
  View,
  Text,
  Pressable,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../Style/ThemeColors";
import GeneralStyle from "../../../Style/General.style";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const ForgotOtp = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.midnightBlue }}>
      <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
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
              //   onPress={() => navigation.replace("HomeTabs")}
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

export default ForgotOtp;
