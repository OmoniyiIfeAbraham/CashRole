import { View, Text, Pressable, Keyboard, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";

const ConnectSeller = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* keyboard dismiss */}
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        {/* header */}
        <View
          style={{
            width: "100%",
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={40}
            color={Colors.midnightBlue}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={[GeneralStyle.ExtraBoldText, { color: Colors.midnightBlue }]}
          >
            Connect Seller
          </Text>
          {/* invisible view */}
          <View style={{ opacity: 0 }}>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={40}
              color={Colors.midnightBlue}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
        {/* form title */}
        <Text
          style={[
            GeneralStyle.ExtraBoldText,
            {
              color: Colors.midnightBlue,
              fontSize: 36,
              marginBottom: 20,
              marginTop: 100,
            },
          ]}
        >
          Connect Existing Seller
        </Text>
        {/* form */}
        {/* phone number */}
        <View style={{ width: "100%", height: 50, flexDirection: "row" }}>
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
      </Pressable>
    </SafeAreaView>
  );
};

export default ConnectSeller;
