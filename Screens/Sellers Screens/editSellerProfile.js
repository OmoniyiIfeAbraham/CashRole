import {
  View,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EditSellerProfile = ({ navigation }) => {
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
            Seller's Profile
          </Text>
          <View>
            <MaterialCommunityIcons
              name="store-plus"
              size={40}
              color={Colors.midnightBlue}
            />
          </View>
        </View>
        {/* form */}
        {/* form title view */}
        <View
          style={{
            width: "100%",
            height: "auto",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 40,
          }}
        >
          {/* first half */}
          <View
            style={{
              width: "80%",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: Colors.ash,
                borderRadius: 50,
                padding: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="user-alt" size={36} color={Colors.white} />
            </View>
            <Text
              style={[
                GeneralStyle.BoldText,
                { color: Colors.black, marginLeft: 10, textAlign: "center" },
              ]}
            >
              Percentage Cut
            </Text>
          </View>
          {/* second half */}
          <View
            style={{
              width: "20%",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <FontAwesome5
              name="pen"
              size={24}
              color={Colors.black}
              onPress={() => navigation.navigate("EditSellerProfile")}
            />
            <View style={{ width: "20%" }}></View>
            <MaterialIcons name="save" size={28} color={Colors.black} />
          </View>
        </View>
        {/* firstname */}
        <View
          style={[
            GeneralStyle.TextInputView,
            { marginTop: 30, borderRadius: 5 },
          ]}
        >
          <TextInput
            style={GeneralStyle.TextInput}
            placeholder="First Name"
            placeholderTextColor={Colors.ash}
          />
        </View>
        {/* lastname */}
        <View style={[GeneralStyle.TextInputView, { borderRadius: 5 }]}>
          <TextInput
            style={GeneralStyle.TextInput}
            placeholder="Last Name"
            placeholderTextColor={Colors.ash}
          />
        </View>
        {/* phone number */}
        <View style={[GeneralStyle.TextInputView, { borderRadius: 5 }]}>
          <TextInput
            style={GeneralStyle.TextInput}
            placeholder="+2348** **** ***"
            placeholderTextColor={Colors.ash}
            autoCapitalize="none"
            autoComplete="tel"
            keyboardType="phone-pad"
          />
        </View>
        {/* dob */}
        <View style={[GeneralStyle.TextInputView, { borderRadius: 5 }]}>
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
        {/* btn */}
        <TouchableOpacity
          style={[
            GeneralStyle.Btn,
            {
              marginTop: 10,
              borderRadius: 15,
              backgroundColor: Colors.midnightBlue,
            },
          ]}
          onPress={() => navigation.navigate("SellersProfile")}
        >
          <Text style={GeneralStyle.RegularText}>Done</Text>
        </TouchableOpacity>
        {/* logout link */}
        <Pressable
          style={{ marginTop: 40, width: 100 }}
          onPress={() => navigation.replace("Login")}
        >
          <Text
            style={[
              GeneralStyle.RegularText,
              { color: Colors.tomato, fontSize: 20 },
            ]}
          >
            Log Out
          </Text>
        </Pressable>
        {/* delete seller link */}
        <Pressable
          style={{ marginTop: 50, width: 200 }}
          onPress={() => navigation.replace("RegisteredSellers")}
        >
          <Text style={[GeneralStyle.MediumText, { color: Colors.black }]}>
            Delete Seller Account
          </Text>
        </Pressable>
      </Pressable>
    </SafeAreaView>
  );
};

export default EditSellerProfile;
