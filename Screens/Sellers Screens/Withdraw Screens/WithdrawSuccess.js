import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import Success from "../../../Components/General/Success";
import { SafeAreaView } from "react-native-safe-area-context";
import GeneralStyle from "../../../Style/General.style";
import Colors from "../../../Style/ThemeColors";

const WithdrawSuccess = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 15,
        justifyContent: "space-evenly",
      }}
    >
      <View style={{ width: "100%", height: "auto", alignItems: "center" }}>
        <Success title="Withdrawal successful" />
        <Pressable>
          <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
            Report transaction
          </Text>
        </Pressable>
      </View>
      <View style={{ width: "100%", paddingHorizontal: 50 }}>
        <TouchableOpacity
          style={[GeneralStyle.Btn, { backgroundColor: Colors.midnightBlue }]}
          onPress={() => navigation.replace("HomeTabs")}
        >
          <Text style={[GeneralStyle.BoldText]}>Go to dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WithdrawSuccess;
