import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

const Withdraw = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const pickerSelectStyles = StyleSheet.create({
    inputAndroid: [
      GeneralStyle.TextInput,
      {
        fontWeight: "500",
        paddingRight: 30, // to ensure the text is never behind the icon
        marginTop: 0,
        height: "auto",
        color: Colors.black,
        width: width * 0.9,
      },
    ],
    placeholder: {
      color: Colors.ash,
    },
  });

  const data = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];
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
            Withdraw
          </Text>
          {/* invisible view */}
          <View style={{ opacity: 0 }}>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={40}
              color={Colors.midnightBlue}
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
          Withdraw
        </Text>
        {/* form */}
        {/* bank */}
        <View style={GeneralStyle.TextInputView}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedValue(value)}
            items={data}
            value={selectedValue}
            placeholder={{ label: "Select a bank", value: null }}
            style={{
              ...pickerSelectStyles,
            }}
            Icon={() => {
              return <View></View>;
            }}
          />
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Withdraw;

const styles = StyleSheet.create({});
