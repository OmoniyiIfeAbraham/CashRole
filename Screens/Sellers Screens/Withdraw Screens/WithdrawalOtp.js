import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../Style/ThemeColors";
import GeneralStyle from "../../../Style/General.style";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Header from "../../../Components/Header/Header";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import { baseAPIUrl } from "../../../Global/Global";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import ErrorHandler from "../../../Components/Auth/ErrorHandler";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WithdrawalOtp = ({ navigation, route }) => {
  const { AccountName, AccountNumber, Amount, Bank } = route.params;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");

  // otp btn
  const SendOtp = async () => {
    try {
      setLoading(true);
      let url = `${baseAPIUrl}/client/wallet/withdraw/sendOtp`;
      let data = new FormData();
      data.append("Amount", Amount);
      data.append("Bank", Bank);
      data.append("AccountNumber", AccountNumber);
      data.append("AccountName", AccountName);

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.Auth}`,
        },
      });

      // console.log(response.data);

      if (response.data?.Error === false) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: `OTP sent to your email`,
        });
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
      setLoading(false);
    }
  };

  const ConfirmOtp = async () => {
    try {
      setLoading(true);
      let url = `${baseAPIUrl}/client/wallet/withdraw/withdraw`;
      let data = new FormData();
      data.append("OTP", otp);

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.Auth}`,
        },
      });

      // console.log(response.data);

      if (response.data?.Error === false) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: `Withdrawal Initiated Successfully`,
        });
        navigation.replace("WithdrawSuccess");
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
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        const data = await AsyncStorage.getItem("cashrole-client-details");
        const parsedData = JSON.parse(data);
        setUser(parsedData);
        // console.log(parsedData);
      }
      fetchData();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* loader */}
      <LoadingModal Visible={loading} />
      {/* keyboard dismiss */}
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        {/* header */}
        <Header navigation={navigation} title="Withdraw" />
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
              Enter withdrawal OTP sent to you
            </Text>
            {/* form */}
            {/* otp */}
            <View style={{ width: "100%", height: 50, alignItems: "center" }}>
              <View
                style={[
                  GeneralStyle.TextInputView,
                  { width: "80%", marginBottom: 10 },
                ]}
              >
                <TextInput
                  style={GeneralStyle.TextInput}
                  placeholder="Enter OTP"
                  placeholderTextColor={Colors.ash}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={(text) => setOtp(text)}
                />
              </View>
              {/* resend link */}
              <Pressable onPress={() => SendOtp()}>
                <Text
                  style={[
                    GeneralStyle.RegularText,
                    { color: Colors.black, fontSize: 18 },
                  ]}
                >
                  Resend OTP
                </Text>
              </Pressable>
            </View>
            {/* btn */}
            <View style={{ width: "100%", paddingHorizontal: 50 }}>
              <TouchableOpacity
                style={[
                  GeneralStyle.Btn,
                  { backgroundColor: Colors.midnightBlue },
                ]}
                onPress={() => ConfirmOtp()}
              >
                <Text style={[GeneralStyle.BoldText]}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default WithdrawalOtp;
