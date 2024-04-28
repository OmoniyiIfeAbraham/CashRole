import {
  View,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../Components/Header/Header";
import GeneralStyle from "../../Style/General.style";
import Colors from "../../Style/ThemeColors";

const DealOtp = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* keyboard dismiss */}
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        {/* header */}
        <Header navigation={navigation} title="Deal" />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "70%",
            }}
          >
            {/* form title */}
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.midnightBlue,
                  fontSize: 30,
                  textAlign: "center",
                },
              ]}
            >
              Enter OTP sent to seller
            </Text>
            {/* form */}
            {/* otp */}
            <View style={{ width: "100%", height: 50, alignItems: "center" }}>
              <View
                style={[
                  GeneralStyle.TextInputView,
                  { width: "80%", marginBottom: 10 },
                ]}
              >
                <TextInput
                  style={GeneralStyle.TextInput}
                  placeholder="Enter OTP"
                  placeholderTextColor={Colors.ash}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                />
              </View>
              {/* resend link */}
              <Pressable>
                <Text
                  style={[
                    GeneralStyle.RegularText,
                    { color: Colors.black, fontSize: 18 },
                  ]}
                >
                  Resend OTP
                </Text>
              </Pressable>
            </View>
            {/* btn */}
            <View style={{ width: "100%", paddingHorizontal: 50 }}>
              <TouchableOpacity
                style={[
                  GeneralStyle.Btn,
                  { backgroundColor: Colors.midnightBlue },
                ]}
                // onPress={() => navigation.replace("HomeTabs")}
              >
                <Text style={[GeneralStyle.BoldText]}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default DealOtp;
