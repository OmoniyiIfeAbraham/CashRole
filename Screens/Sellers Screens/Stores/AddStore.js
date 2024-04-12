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
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "../../../Style/ThemeColors";
import GeneralStyle from "../../../Style/General.style";
import Header from "../../../Components/Header/Header";

const AddStore = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* keyboard dismiss */}
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        {/* header */}
        <Header navigation={navigation} title="Add Store" />
        {/* form */}
        {/* store name */}
        <View style={[GeneralStyle.TextInputView, { marginTop: 100 }]}>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={24}
            color={Colors.ash}
            style={{
              marginRight: 10,
            }}
          />
          <TextInput
            style={GeneralStyle.TextInput}
            placeholder="Store-Name"
            placeholderTextColor={Colors.ash}
          />
        </View>
        {/* note text */}
        <Text
          style={[
            GeneralStyle.RegularText,
            { color: Colors.black, fontSize: 20, textAlign: "center" },
          ]}
        >
          Note your Store-Link-Name will be required in product screen
        </Text>
        {/* store link name */}
        <View style={[GeneralStyle.TextInputView, { marginTop: 20 }]}>
          <AntDesign
            name="copy1"
            size={24}
            color={Colors.ash}
            style={{
              marginRight: 10,
            }}
          />
          <TextInput
            style={GeneralStyle.TextInput}
            placeholder="Store-Link-Name"
            placeholderTextColor={Colors.ash}
            keyboardType="url"
          />
        </View>
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
        {/* btn */}
        <TouchableOpacity
          style={[
            GeneralStyle.Btn,
            {
              marginTop: 50,
              borderRadius: 15,
              backgroundColor: Colors.midnightBlue,
            },
          ]}
        >
          <Text style={GeneralStyle.RegularText}>Add</Text>
        </TouchableOpacity>
      </Pressable>
    </SafeAreaView>
  );
};

export default AddStore;
