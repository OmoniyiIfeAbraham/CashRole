import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import { FontAwesome5 } from "@expo/vector-icons";
import ErrorHandler from "../Auth/ErrorHandler";
import { baseAPIUrl } from "../../Global/Global";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import LoadingModal from "../LoadingModal/LoadingModal";

const WithdrawComponent = ({ navigation, title, amount }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [price, setPrice] = useState(0);
  const [loading, setIsLoading] = useState(false);

  const Deposit = async () => {
    try {
      setIsLoading(true);
      const userInfo = await AsyncStorage.getItem("cashrole-client-details");
      const parsedInfo = JSON.parse(userInfo);

      let url = `${baseAPIUrl}/client/wallet/deposit/initialize`;
      const fd = new FormData();
      fd.append("Amount", price);

      const response = await axios.post(url, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      if (response.data.Error === false) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: `${response.data.Data.message}`,
        });
        // Open the URL in-app
        await WebBrowser.openBrowserAsync(response.data.Data.data.checkout_url);
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
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: Colors.white,
        elevation: 10,
        marginTop: 10,
        borderRadius: 5,
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* modal */}
      <LoadingModal Visible={loading} />
      <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
        {title}
      </Text>
      <Text
        style={[GeneralStyle.BoldText, { color: Colors.black, fontSize: 30 }]}
      >
        NGN{amount}
      </Text>
      <View style={{ width: "100%", paddingHorizontal: 50, marginTop: 25 }}>
        <TouchableOpacity
          style={[GeneralStyle.Btn, { backgroundColor: Colors.midnightBlue }]}
          onPress={() => navigation.navigate("Withdraw")}
        >
          <Text style={[GeneralStyle.BoldText]}>Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            GeneralStyle.Btn,
            { backgroundColor: Colors.midnightBlue, marginTop: 10 },
          ]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[GeneralStyle.BoldText]}>Deposit</Text>
        </TouchableOpacity>
        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              paddingHorizontal: 15,
            }}
            onPress={() => setModalVisible(false)}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                elevation: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10 }}>
                Widthdrawal Amount
              </Text>
              {/* amount */}
              <View
                style={[
                  GeneralStyle.TextInputView,
                  { width: "100%", marginBottom: 5 },
                ]}
              >
                <FontAwesome5
                  name="money-bill"
                  size={24}
                  color={Colors.ash}
                  style={{
                    marginRight: 10,
                  }}
                />
                <TextInput
                  style={GeneralStyle.TextInput}
                  placeholder="Amount (min 1000.00)"
                  placeholderTextColor={Colors.ash}
                  autoCapitalize="none"
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}
                />
              </View>
              <TouchableOpacity
                onPress={() => Deposit()}
                style={{
                  marginTop: 20,
                  backgroundColor: Colors.midnightBlue,
                  paddingVertical: 15,
                  paddingHorizontal: 30,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: Colors.white }}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </View>
    </View>
  );
};

export default WithdrawComponent;
