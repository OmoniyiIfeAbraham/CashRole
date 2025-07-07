import {
  View,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../Components/Header/Header";
import GeneralStyle from "../../Style/General.style";
import Colors from "../../Style/ThemeColors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import { baseAPIUrl } from "../../Global/Global";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import ErrorHandler from "../../Components/Auth/ErrorHandler";

const Deal = ({ navigation }) => {
  const [Email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // function to handle email input changes
  const handleEmailChange = (text) => {
    setEmail(text); // Update the state with the current input value
  };

  const SendOtp = async () => {
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/seller/auth/add/deal/sendOtp?email=${Email}`;

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
        navigation.replace("DealOtp", { email: Email });
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
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        {/* header */}
        <Header navigation={navigation} title="Deal" />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "70%",
            }}
          >
            {/* form title */}
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.midnightBlue,
                  fontSize: 30,
                  textAlign: "center",
                },
              ]}
            >
              Enter email of seller
            </Text>
            {/* form */}
            {/* phone number */}
            <View style={{ width: "80%", height: 50, flexDirection: "row" }}>
              <View style={[GeneralStyle.TextInputView, { width: "100%" }]}>
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
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={handleEmailChange}
                />
              </View>
            </View>
            {/* btn */}
            <View style={{ width: "100%", paddingHorizontal: 50 }}>
              <TouchableOpacity
                style={[
                  GeneralStyle.Btn,
                  { backgroundColor: Colors.midnightBlue },
                ]}
                onPress={SendOtp}
              >
                <Text style={[GeneralStyle.BoldText]}>Send OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Deal;
