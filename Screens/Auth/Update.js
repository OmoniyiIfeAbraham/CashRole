import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import GeneralStyle from "../../Style/General.style";
import Colors from "../../Style/ThemeColors";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { ApiKey, ApiSecKey, baseAPIUrl } from "../../Global/Global";
import axios from "axios";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorHandler from "../../Components/Auth/ErrorHandler";

const Update = ({ navigation, route }) => {
  const { user } = route.params;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(user?.User.DOB);
  const [firstName, setFirstName] = useState(user?.User?.FirstName);
  const [lastName, setLastName] = useState(user?.User?.LastName);
  const [address, setAddress] = useState(user?.Profile?.Address);
  const [Phone, setPhone] = useState(
    user?.User?.PhoneNo?.toString()?.startsWith("234")
      ? user.User.PhoneNo?.toString().slice(3)
      : user.User.PhoneNo
  );
  const [isLoading, setIsLoading] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const parts = formattedDate.split("/");
    const reformattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`;
    setDate(reformattedDate);
    hideDatePicker();
  };

  // function to handle first name input changes
  const handleFirstNameChange = (text) => {
    setFirstName(text); // Update the state with the current input value
  };

  // function to handle last name input changes
  const handleLastNameChange = (text) => {
    setLastName(text); // Update the state with the current input value
  };

  // function to handle address input changes
  const handleAddressChange = (text) => {
    setAddress(text); // Update the state with the current input value
  };

  // function to handle phone number input changes
  const handlePhoneChange = (text) => {
    // Remove any non-numeric character
    let cleaned = text.replace(/\D/g, "");

    // If the number starts with 234, remove it
    if (cleaned.startsWith("234")) {
      cleaned = cleaned.slice(3);
    }

    // If the number starts with 0, remove the 0
    if (cleaned.startsWith("0")) {
      cleaned = cleaned.slice(1);
    }

    // Limit to maximum 10 digits
    if (cleaned.length > 10) {
      cleaned = cleaned.slice(0, 10);
    }

    setPhone(cleaned);
  };

  // sign up btn
  const updateBtn = async () => {
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/client/profile/update`;
      let data = new FormData();
      data.append("FirstName", firstName);
      data.append("LastName", lastName);
      data.append("DOB", date);
      data.append("Address", address);
      data.append("PhoneNo", `234${Phone}`);

      const userInfo = await AsyncStorage.getItem("cashrole-client-details");
      const parsedInfo = JSON.parse(userInfo);

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      // console.log(response.data);

      if (response.data?.Error === false) {
        navigation.replace("MyProfile");
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: `${response.data.Error}`,
        });
      }
    } catch (error) {
      ErrorHandler(error, navigation);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={{ padding: 25, flex: 1 }}>
      {/* modal */}
      <LoadingModal Visible={isLoading} />
      {/* cashrole title */}
      <View
        style={{
          height: "auto",
          paddingVertical: 40,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            GeneralStyle.ExtraBoldText,
            { color: Colors.midnightBlue, fontSize: 30 },
          ]}
        >
          CASHROLE
        </Text>
      </View>
      {/* form title */}
      <Text
        style={[
          GeneralStyle.BoldText,
          { color: Colors.midnightBlue, fontSize: 45, marginBottom: 20 },
        ]}
      >
        Update Profile
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
          placeholder="Your First Name"
          placeholderTextColor={Colors.ash}
          value={firstName}
          onChangeText={handleFirstNameChange}
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
          placeholder="Your Last Name"
          placeholderTextColor={Colors.ash}
          value={lastName}
          onChangeText={handleLastNameChange}
        />
      </View>
      {/* address */}
      <View style={GeneralStyle.TextInputView}>
        <FontAwesome
          name="address-card-o"
          size={24}
          color={Colors.ash}
          style={{
            marginRight: 10,
          }}
        />
        <TextInput
          style={GeneralStyle.TextInput}
          placeholder="Your Address"
          placeholderTextColor={Colors.ash}
          value={address}
          onChangeText={handleAddressChange}
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
            style={{ color: date == "yyyy-mm-dd" ? Colors.ash : Colors.black }}
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
            value={Phone}
            onChangeText={handlePhoneChange}
            maxLength={10}
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
        onPress={updateBtn}
      >
        <Text style={GeneralStyle.RegularText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Update;
