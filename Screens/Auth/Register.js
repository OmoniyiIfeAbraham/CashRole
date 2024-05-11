import {
  View,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
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
import QueryString from "qs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("yyyy-mm-dd");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
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

  const handlePasswordVisbility = () => {
    setPasswordVisible(!passwordVisible);
  };

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

  // function to handle password input changes
  const handlePasswordChange = (text) => {
    setPassword(text); // Update the state with the current input value
  };

  // function to handle confirm password input changes
  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text); // Update the state with the current input value
  };

  // function to handle phone number input changes
  const handlePhoneChange = (text) => {
    setPhone(text); // Update the state with the current input value
  };

  // sign up btn
  const signUpBtn = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*?])[A-Za-z\d@#$!%^&*?]{8,}$/;
    const isPasswordValid = passwordPattern.test(Password);

    if (
      firstName === "" ||
      lastName === "" ||
      Email === "" ||
      date === "" ||
      Password === "" ||
      confirmPassword === "" ||
      Phone === ""
    ) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Fill all Fields!!!",
      });
    } else if (firstName.length < 3 || lastName.length < 3) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Name must be greater than 3 Characters each!!!",
      });
    } else if (!emailRegex.test(Email)) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Invalid email address.",
      });
    } else if (Password.length < 8) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Password must be at least 8 Characters Long!!!",
      });
    } else if (isPasswordValid === false) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Password is too weak!!!",
      });
    } else if (Password !== confirmPassword) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Password and Confirm Password must be the same!!!",
      });
    } else if (Phone.length < 10) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Invalid Phone Number!!!",
      });
    } else {
      setIsLoading(true);
      const url = `${baseAPIUrl}/api/v1/merchant/register/`;

      const password = Password;
      const password2 = confirmPassword;
      const first_name = firstName;
      const last_name = lastName;
      const dob = date;
      const phoneNumber = `+234${Phone}`;
      const phone = phoneNumber;
      const email = Email.trimEnd();

      let data = JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        password2: password2,
        dob: dob,
        phone: phone,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${url}`,
        headers: {
          "Api-Key": `${ApiKey}`,
          "Api-Sec-Key": `${ApiSecKey}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          // saving necessary info
          const saveData = async () => {
            await AsyncStorage.setItem("OTP", response.data.data.otp);
            await AsyncStorage.setItem("DOB", response.data.data.dob);
            await AsyncStorage.setItem("Phone", response.data.data.phone);
          };
          saveData();
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Successfully Registered",
          });
          setIsLoading(false);
          navigation.navigate("Otp");
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            const errorMessage = error.response.data.error.message;
            // Check if the error message is in the expected format
            if (errorMessage === "Error processing your request") {
              const userData = error.response.data.data;
              if (userData.email && userData.email.length > 0) {
                Toast.show({
                  type: ALERT_TYPE.WARNING,
                  title: userData.email[0], // Assuming the first element is the relevant message
                });
                setIsLoading(false);
                return;
              }
            }
          }
          // If the error format is unexpected or doesn't contain the specific message, show the default error message
          console.log(error);
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: error.message,
          });
          setIsLoading(false);
        });
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
        Sign Up
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
      {/* password */}
      <View style={GeneralStyle.TextInputView}>
        <MaterialIcons
          name="lock-outline"
          size={24}
          color={Colors.ash}
          style={{
            marginRight: 10,
          }}
        />
        <TextInput
          style={GeneralStyle.TextInput}
          placeholder="Your Password"
          placeholderTextColor={Colors.ash}
          autoCapitalize="none"
          autoComplete="password"
          secureTextEntry={passwordVisible}
          value={Password}
          onChangeText={handlePasswordChange}
        />
        {!passwordVisible ? (
          <Ionicons
            name="eye"
            size={24}
            color={Colors.ash}
            style={{
              marginLeft: 10,
            }}
            onPress={() => handlePasswordVisbility()}
          />
        ) : (
          <Ionicons
            name="eye-off"
            size={24}
            color={Colors.ash}
            style={{
              marginLeft: 10,
            }}
            onPress={() => handlePasswordVisbility()}
          />
        )}
      </View>
      {/* confirm password */}
      <View style={GeneralStyle.TextInputView}>
        <MaterialIcons
          name="lock-outline"
          size={24}
          color={Colors.ash}
          style={{
            marginRight: 10,
          }}
        />
        <TextInput
          style={GeneralStyle.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor={Colors.ash}
          autoCapitalize="none"
          autoComplete="password"
          secureTextEntry={passwordVisible}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        {!passwordVisible ? (
          <Ionicons
            name="eye"
            size={24}
            color={Colors.ash}
            style={{
              marginLeft: 10,
            }}
            onPress={() => handlePasswordVisbility()}
          />
        ) : (
          <Ionicons
            name="eye-off"
            size={24}
            color={Colors.ash}
            style={{
              marginLeft: 10,
            }}
            onPress={() => handlePasswordVisbility()}
          />
        )}
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
        onPress={signUpBtn}
      >
        <Text style={GeneralStyle.RegularText}>Sign up</Text>
      </TouchableOpacity>
      {/* login link */}
      <View
        style={{
          width: "100%",
          height: 50,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Text
          style={[
            GeneralStyle.RegularText,
            { color: Colors.black, fontSize: 16 },
          ]}
        >
          A member of cashrole already?{" "}
        </Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text
            style={[
              GeneralStyle.RegularText,
              { color: Colors.midnightBlue, fontSize: 16 },
            ]}
          >
            Log in
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Register;
