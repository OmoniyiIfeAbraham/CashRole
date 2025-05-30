import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../../Components/Header/Header";
import GeneralStyle from "../../../../Style/General.style";
import Colors from "../../../../Style/ThemeColors";
import { baseAPIUrl } from "../../../../Global/Global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import ErrorHandler from "../../../../Components/Auth/ErrorHandler";
import LoadingModal from "../../../../Components/LoadingModal/LoadingModal";

const DeleteProductOtp = ({ navigation, route }) => {
  const { product, store, email } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  // console.log('Params: ', route.params);

  const SendOtp = async (Id, email) => {
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/product/actions/delete/sendOtp?id=${Id}&email=${email}`;

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

  // delete product confirm btn
  const confirmBtn = async () => {
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/product/actions/delete?id=${
        product._id
      }&OTP=${otp.trim()}`;

      const userInfo = await AsyncStorage.getItem("cashrole-client-details");
      const parsedInfo = JSON.parse(userInfo);

      const response = await axios.delete(url, {
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
          textBody: "Product Deleted Successfully",
        });
        navigation.navigate("DeleteProductSuccessfull", {
          product,
          store,
          email,
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
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* loader */}
      <LoadingModal Visible={isLoading} />
      {/* keyboard dismiss */}
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        {/* header */}
        <Header navigation={navigation} title="Delete product" />
        <View
          style={{
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "70%",
            marginTop: "20%",
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
            Enter OTP
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
            <Pressable onPress={() => SendOtp(product._id, email)}>
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
              onPress={confirmBtn}
            >
              <Text style={[GeneralStyle.BoldText]}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default DeleteProductOtp;
