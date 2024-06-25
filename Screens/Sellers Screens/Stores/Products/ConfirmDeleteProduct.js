import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Success from "../../../../Components/General/Success";
import GeneralStyle from "../../../../Style/General.style";
import Colors from "../../../../Style/ThemeColors";

const ConfirmDeleteProduct = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 15,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "auto",
          alignItems: "center",
          marginBottom: 50,
        }}
      >
        <Success title="OTP will be sent to sellers phone number to delete product" />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={[
            GeneralStyle.Btn,
            {
              backgroundColor: Colors.midnightBlue,
              maxWidth: "49%",
              paddingHorizontal: 5,
            },
          ]}
          onPress={() => navigation.replace("Store")}
        >
          <Text style={[GeneralStyle.BoldText]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            GeneralStyle.Btn,
            {
              backgroundColor: Colors.white,
              maxWidth: "49%",
              paddingHorizontal: 5,
              borderWidth: 1,
              borderColor: Colors.midnightBlue,
            },
          ]}
          onPress={() => navigation.replace("DeleteProductOtp")}
        >
          <Text style={[GeneralStyle.BoldText, { color: Colors.tomato }]}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmDeleteProduct;
