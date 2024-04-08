import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";

const CreateSeller = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("yyyy-mm-dd");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    const formattedDate = selectedDate.toLocaleDateString();
    setDate(formattedDate);
    hideDatePicker();
  };

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
            Create Seller
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
          Create a new seller
        </Text>
        {/* form */}
        {/* firstname */}
        <View style={GeneralStyle.TextInputView}>
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
            placeholder="First Name"
            placeholderTextColor={Colors.ash}
          />
        </View>
        {/* lastname */}
        <View style={GeneralStyle.TextInputView}>
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
            placeholder="Last Name"
            placeholderTextColor={Colors.ash}
          />
        </View>
        {/* dob */}
        <View style={GeneralStyle.TextInputView}>
          <Feather
            name="calendar"
            size={24}
            color={Colors.ash}
            style={{
              marginRight: 10,
            }}
          />
          <TouchableOpacity
            style={GeneralStyle.TextInput}
            onPress={() => showDatePicker()}
          >
            <Text
              style={{
                color: date == "yyyy-mm-dd" ? Colors.ash : Colors.black,
              }}
            >
              {date}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
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
          <Text style={GeneralStyle.RegularText}>Create Seller</Text>
        </TouchableOpacity>
      </Pressable>
    </SafeAreaView>
  );
};

export default CreateSeller;
