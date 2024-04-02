import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";

const WithdrawComponent = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 300,
        backgroundColor: Colors.white,
        elevation: 10,
        marginTop: 10,
        borderRadius: 5,
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
        Available funds
      </Text>
      <Text
        style={[GeneralStyle.BoldText, { color: Colors.black, fontSize: 30 }]}
      >
        0.00
      </Text>
      <View style={{ width: "100%", paddingHorizontal: 50, marginTop: 25 }}>
        <TouchableOpacity
          style={[GeneralStyle.Btn, { backgroundColor: Colors.midnightBlue }]}
        >
          <Text style={[GeneralStyle.BoldText]}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WithdrawComponent;
