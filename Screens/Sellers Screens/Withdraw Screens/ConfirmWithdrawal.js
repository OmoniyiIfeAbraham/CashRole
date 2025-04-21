import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../Style/ThemeColors";
import { AntDesign } from "@expo/vector-icons";
import GeneralStyle from "../../../Style/General.style";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import { baseAPIUrl } from "../../../Global/Global";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import ErrorHandler from "../../../Components/Auth/ErrorHandler";

const ConfirmWithdrawal = ({ navigation, route }) => {
  // console.log(route.params);
  const { AccountName, AccountNumber, Amount, BankName, Bank } = route.params;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // confirm btn
  const Confirm = async () => {
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
        navigation.navigate("WithdrawalOtp", {
          AccountName: AccountName,
          AccountNumber: AccountNumber,
          Bank: Bank,
          Amount: Amount,
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
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* loader */}
      <LoadingModal Visible={loading} />
      <View
        style={{
          width: "100%",
          height: "50%",
          backgroundColor: Colors.white,
          elevation: 10,
          borderRadius: 5,
          shadowColor: Colors.black,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          paddingHorizontal: 15,
        }}
      >
        {/* cancel icon */}
        <View
          style={{
            height: "10%",
            width: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <AntDesign
            name="close"
            size={30}
            color={Colors.ash}
            onPress={() => navigation.goBack()}
          />
        </View>
        {/* withdrawal details */}
        <View
          style={{
            height: "70%",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {/* title */}
          <Text
            style={[
              GeneralStyle.ExtraBoldText,
              { color: Colors.black, fontSize: 30 },
            ]}
          >
            Confirm to withdraw
          </Text>
          {/* amount row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.black,
                  maxWidth: "50%",
                  textAlign: "left",
                },
              ]}
            >
              Amount (NGN)
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.mediumSeaGreen,
                  maxWidth: "50%",
                  textAlign: "right",
                },
              ]}
            >
              {Amount}
            </Text>
          </View>
          {/* bank name row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.black,
                  maxWidth: "40%",
                  textAlign: "left",
                },
              ]}
            >
              Bank Name
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.mediumSeaGreen,
                  maxWidth: "60%",
                  textAlign: "right",
                },
              ]}
            >
              {BankName}
            </Text>
          </View>
          {/* account number row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.black,
                  maxWidth: "55%",
                  textAlign: "left",
                },
              ]}
            >
              Account Number
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.mediumSeaGreen,
                  maxWidth: "45%",
                  textAlign: "right",
                },
              ]}
            >
              {AccountNumber}
            </Text>
          </View>
          {/* account name row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.black,
                  maxWidth: "50%",
                  textAlign: "left",
                },
              ]}
            >
              Account Name
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.mediumSeaGreen,
                  maxWidth: "50%",
                  textAlign: "right",
                },
              ]}
            >
              {AccountName}
            </Text>
          </View>
        </View>
        {/* buttons */}
        <View
          style={{
            width: "100%",
            height: "20%",
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[
              GeneralStyle.Btn,
              {
                height: 45,
                width: "45%",
                backgroundColor: Colors.white,
                borderWidth: 1,
                borderColor: Colors.black,
              },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={[
                GeneralStyle.MediumText,
                {
                  color: Colors.black,
                },
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              GeneralStyle.Btn,
              {
                height: 45,
                width: "45%",
                backgroundColor: Colors.black,
              },
            ]}
            onPress={() => Confirm()}
          >
            <Text
              style={[
                GeneralStyle.MediumText,
                {
                  color: Colors.white,
                },
              ]}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmWithdrawal;
