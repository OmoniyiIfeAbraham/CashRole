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
        <View style={[GeneralStyle.TextInputView, { width: "100%" }]}>
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
        {/* btn */}
        <TouchableOpacity
          style={[
            GeneralStyle.Btn,
            {
              marginTop: 20,
              borderRadius: 15,
              backgroundColor: Colors.midnightBlue,
            },
          ]}
        >
          <Text style={GeneralStyle.RegularText}>Connect</Text>
        </TouchableOpacity>
      </Pressable>
    </SafeAreaView>
  );
};

export default ConnectSeller;
