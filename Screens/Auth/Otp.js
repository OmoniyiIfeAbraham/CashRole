import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Keyboard,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../Style/ThemeColors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import GeneralStyle from "../../Style/General.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useState } from "react";

const Otp = ({ navigation }) => {
  const [savedOtp, setSavedOtp] = useState("");
  const [phone, setPhone] = useState("");

  // Function to retrieve otp
  async function getItem(item1Key, item2Key) {
    try {
      const [item1Value, item2Value] = await Promise.all([
        AsyncStorage.getItem(item1Key),
        AsyncStorage.getItem(item2Key),
      ]);

      if (item1Value !== null || item2Value !== null) {
        // Items found in AsyncStorage
        console.log("Item 1:", item1Value);
        console.log("Item 2:", item2Value);
        return { item1: item1Value, item2: item2Value };
      } else {
        // One or both items not found
        console.log("One or all items not found");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving items:", error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const items = await getItem("OTP", "Phone");
      if (items) {
        setSavedOtp(items.item1);
        setPhone(items.item2);
      }
    }
    fetchData();
  }, []);

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
              We have sent the verification code to the number you entered for
              registeration earlier
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
              onPress={() => navigation.replace("HomeTabs")}
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

export default Otp;
