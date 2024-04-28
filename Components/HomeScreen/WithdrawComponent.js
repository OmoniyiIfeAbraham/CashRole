import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";

const WithdrawComponent = ({ navigation, title, amount }) => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
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
        {title}
      </Text>
      <Text
        style={[GeneralStyle.BoldText, { color: Colors.black, fontSize: 30 }]}
      >
        NGN{amount}
      </Text>
      <View style={{ width: "100%", paddingHorizontal: 50, marginTop: 25 }}>
        <TouchableOpacity
          style={[GeneralStyle.Btn, { backgroundColor: Colors.midnightBlue }]}
          onPress={() => navigation.navigate("Withdraw")}
        >
          <Text style={[GeneralStyle.BoldText]}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WithdrawComponent;
