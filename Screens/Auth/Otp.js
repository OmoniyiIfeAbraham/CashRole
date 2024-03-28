import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../Style/ThemeColors";
import { AntDesign } from "@expo/vector-icons";
import GeneralStyle from "../../Style/General.style";

const Otp = ({ navigation }) => {
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
        ></View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Otp;
