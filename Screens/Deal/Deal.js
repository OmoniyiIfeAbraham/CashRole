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
import { FontAwesome } from "@expo/vector-icons";

const Deal = ({ navigation }) => {
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
              Enter phone number of seller
            </Text>
            {/* form */}
            {/* phone number */}
            <View style={{ width: "80%", height: 50, flexDirection: "row" }}>
              <View
                style={{
                  width: "20%",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={[GeneralStyle.BoldText, { color: Colors.black }]}>
                  +234
                </Text>
              </View>
              <View style={[GeneralStyle.TextInputView, { width: "80%" }]}>
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
                  placeholder="Phone Number"
                  placeholderTextColor={Colors.ash}
                  autoCapitalize="none"
                  autoComplete="tel"
                  keyboardType="phone-pad"
                />
              </View>
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
                <Text style={[GeneralStyle.BoldText]}>Send OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Deal;
