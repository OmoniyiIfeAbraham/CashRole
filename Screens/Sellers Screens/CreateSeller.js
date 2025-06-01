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
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { ApiKey, ApiSecKey, baseAPIUrl } from "../../Global/Global";
import axios from "axios";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorHandler from "../../Components/Auth/ErrorHandler";

const CreateSeller = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // function to handle first name input changes
  const handleFirstNameChange = (text) => {
    setFirstName(text); // Update the state with the current input value
  };

  // function to handle last name input changes
  const handleLastNameChange = (text) => {
    setLastName(text); // Update the state with the current input value
  };

  // function to handle email input changes
  const handleEmailChange = (text) => {
    setEmail(text); // Update the state with the current input value
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
  const addBtn = async () => {
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/seller/auth/add`;
      let data = new FormData();
      data.append("FirstName", firstName);
      data.append("LastName", lastName);
      data.append("Email", Email);
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
        SendOtp(Email);
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: `${response.data.Error}`,
        });
        setIsLoading(false)
      }
    } catch (error) {
      ErrorHandler(error, navigation);
      setIsLoading(false);
    } finally {
      // setIsLoading(false);
    }
  };

  const SendOtp = async (email) => {
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/seller/auth/add/sendOtp?email=${email}`;

      const userInfo = await AsyncStorage.getItem("cashrole-client-details");
      const parsedInfo = JSON.parse(userInfo);

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      // console.log(response.data);

      if (response.data?.Error === false) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "OTP Sent Successfully",
        });
        navigation.replace("AddSellerOtp", { email });
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
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* modal */}
      <LoadingModal Visible={isLoading} />
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
        {/* email */}
        <View style={GeneralStyle.TextInputView}>
          <MaterialIcons
            name="mail-outline"
            size={24}
            color={Colors.ash}
            style={{
              marginRight: 10,
            }}
          />
          <TextInput
            style={GeneralStyle.TextInput}
            placeholder="your@gmail.com"
            placeholderTextColor={Colors.ash}
            keyboardType="email-address"
            autoCapitalize="none"
            value={Email}
            onChangeText={handleEmailChange}
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
            onPress={addBtn}
          >
            <Text style={GeneralStyle.RegularText}>Add Seller</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateSeller;
