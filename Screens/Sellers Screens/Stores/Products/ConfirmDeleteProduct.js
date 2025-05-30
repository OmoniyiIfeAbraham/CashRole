import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Success from "../../../../Components/General/Success";
import GeneralStyle from "../../../../Style/General.style";
import Colors from "../../../../Style/ThemeColors";
import { baseAPIUrl } from "../../../../Global/Global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import ErrorHandler from "../../../../Components/Auth/ErrorHandler";
import LoadingModal from "../../../../Components/LoadingModal/LoadingModal";

const ConfirmDeleteProduct = ({ navigation, route }) => {
  const { product, store, email } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  // console.log('params: ', route.params)
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
        navigation.replace("DeleteProductOtp", { store, product, email });
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
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 15,
        justifyContent: "center",
      }}
    >
      {/* loader */}
      <LoadingModal Visible={isLoading} />
      <View
        style={{
          width: "100%",
          height: "auto",
          alignItems: "center",
          marginBottom: 50,
        }}
      >
        <Success title="OTP will be sent to sellers email address to delete product" />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={[
            GeneralStyle.Btn,
            {
              backgroundColor: Colors.midnightBlue,
              maxWidth: "49%",
              paddingHorizontal: 5,
            },
          ]}
          onPress={() => navigation.replace("Store", { store, Email: email })}
        >
          <Text style={[GeneralStyle.BoldText]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            GeneralStyle.Btn,
            {
              backgroundColor: Colors.white,
              maxWidth: "49%",
              paddingHorizontal: 5,
              borderWidth: 1,
              borderColor: Colors.midnightBlue,
            },
          ]}
          onPress={() => SendOtp(product?._id, email)}
        >
          <Text style={[GeneralStyle.BoldText, { color: Colors.tomato }]}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmDeleteProduct;
