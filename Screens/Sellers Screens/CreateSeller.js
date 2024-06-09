import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Keyboard,
  ScrollView,
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
import Header from "../../Components/Header/Header";

const CreateSeller = ({ navigation }) => {
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [date, setDate] = useState("yyyy-mm-dd");

  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  // const handleConfirm = (selectedDate) => {
  //   const formattedDate = selectedDate.toLocaleDateString();
  //   setDate(formattedDate);
  //   hideDatePicker();
  // };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* keyboard dismiss */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* header */}
        <Header navigation={navigation} title="Add Seller" />
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
          Add a new seller
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
        {/* <View style={GeneralStyle.TextInputView}>
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
        </View> */}
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
            <TextInput
              style={GeneralStyle.TextInput}
              placeholder="Phone Number"
              placeholderTextColor={Colors.ash}
              autoCapitalize="none"
              autoComplete="tel"
              keyboardType="phone-pad"
            />
          </View>
        </View>
        {/* btn */}
        <View style={{ width: "100%", paddingHorizontal: 50, marginTop: 20 }}>
          <TouchableOpacity
            style={[
              GeneralStyle.Btn,
              {
                marginTop: 50,
                borderRadius: 15,
                backgroundColor: Colors.midnightBlue,
              },
            ]}
            onPress={() => navigation.navigate("AddSellerOtp")}
          >
            <Text style={GeneralStyle.RegularText}>Add Seller</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateSeller;
