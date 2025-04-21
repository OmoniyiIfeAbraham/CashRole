import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialIcons,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";
import Banks from "./../../Components/Sellers/Withdraw/Banks";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import LoadingModal from "./../../Components/LoadingModal/LoadingModal";
import Header from "../../Components/Header/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseAPIUrl } from "../../Global/Global";
import ErrorHandler from "../../Components/Auth/ErrorHandler";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Withdraw = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [accountNo, setAccountNo] = useState("");
  const [accountName, setAccountName] = useState("");
  const [Loading, setLoading] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(null);

  const veryBankDetails = () => {
    console.log("selectedValue:", selectedValue, "accountNo:", accountNo);
    if (selectedValue !== "" && accountNo !== "") {
      const url = `https://api.korapay.com/merchant/api/v1/misc/banks/resolve`;
      const data = {
        bank: selectedValue,
        account: accountNo,
        currency: "NGN",
      };

      try {
        setLoading(true);
        axios
          .post(url, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer sk_test_a57c0c5dc61de74ba280e8601ccd83084c63fe20",
            },
          })
          .then((response) => {
            console.log(response.data);
            setAccountName(response.data.data.account_name);
            setAccountDetails(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error.response);
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title:
                "An Error Occured!! Check Acc/No and Bank name Before Proceeding.",
            });
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title:
            "An Error Occured!! Check Acc/No and Bank name Before Proceeding.",
        });
        setLoading(false);
      }
    } else {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Enter Bank and Account Number First",
      });
    }
  };

  const pickerSelectStyles = StyleSheet.create({
    inputAndroid: [
      GeneralStyle.TextInput,
      {
        fontWeight: "500",
        paddingRight: 30, // to ensure the text is never behind the icon
        marginTop: 0,
        height: "auto",
        color: Colors.black,
        width: width * 0.8,
      },
    ],
    placeholder: {
      color: Colors.ash,
    },
  });

  const GetBalance = async (setBalance, navigation) => {
    console.log("Fetching balance...");
    const userInfo = await AsyncStorage.getItem("cashrole-client-details");
    const parsedInfo = JSON.parse(userInfo);

    try {
      const url = `${baseAPIUrl}/client/balance/view`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      if (!response.data.Error) {
        setBalance(response.data.Data);
        console.log("Balance:", response.data.Data);
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: response.data.Error,
        });
      }
    } catch (error) {
      ErrorHandler(error, navigation);
    }
  };

  useEffect(() => {
    // This will be called whenever selectedValue changes to "033"
    if (selectedValue === "033") {
      setAccountNo("0000000000"); // Set accountNo to default value
    }
  }, [selectedValue]); // This effect depends on selectedValue

  useEffect(() => {
    // Timeout ID
    let timeoutId;

    if (accountNo !== "") {
      // Set a timeout that will trigger veryBankDetails after a short delay
      timeoutId = setTimeout(() => {
        console.log("accountNo updated:", accountNo);
        veryBankDetails();
      }, 1000); // Adjust delay time as needed (1000ms = 1 second)
    }

    // Clean up the timeout on every render or if accountNo changes
    return () => clearTimeout(timeoutId);
  }, [accountNo]); // This effect runs every time accountNo changes

  useFocusEffect(
    useCallback(() => {
      GetBalance(setBalance, navigation);
    }, [navigation])
  );

  console.log(amount);

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 25 }}>
      {/* modal */}
      <LoadingModal Visible={Loading} />
      {/* keyboard dismiss */}
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        {/* header */}
        <Header navigation={navigation} title="Withdraw" />
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
          Withdraw to
        </Text>
        {/* form */}
        {/* bank */}
        <View style={GeneralStyle.TextInputView}>
          <FontAwesome name="bank" size={24} color={Colors.ash} />
          <RNPickerSelect
            onValueChange={(value) => setSelectedValue(value)}
            items={Banks}
            value={selectedValue}
            placeholder={{ label: "Select a bank", value: null }}
            style={{
              ...pickerSelectStyles,
            }}
            Icon={() => {
              return <View></View>;
            }}
          />
        </View>
        {/* account number */}
        <View style={[GeneralStyle.TextInputView, { width: "100%" }]}>
          <Octicons
            name="person-add"
            size={24}
            color={Colors.ash}
            style={{
              marginRight: 10,
            }}
          />
          <TextInput
            style={GeneralStyle.TextInput}
            placeholder="Account Number"
            placeholderTextColor={Colors.ash}
            autoCapitalize="none"
            keyboardType="numeric"
            value={accountNo}
            onChangeText={(text) => setAccountNo(text)}
            onEndEditing={() => veryBankDetails()}
          />
        </View>
        {/* account name */}
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
            placeholder="Account Name"
            placeholderTextColor={Colors.ash}
            readOnly={true}
            value={accountName}
            onChangeText={(text) => setAccountName(text)}
            keyboardType="default"
          />
        </View>
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
            placeholder="Amount (min 100.00)"
            placeholderTextColor={Colors.ash}
            autoCapitalize="none"
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => setAmount(text)}
          />
        </View>
        <Text
          style={[
            GeneralStyle.LightText,
            { color: Colors.ash, fontSize: 16, marginBottom: 20 },
          ]}
        >
          Withdrawable Balance (NGN) {balance?.Balance || 0}
        </Text>
        {/* btn */}
        <View style={{ width: "100%", paddingHorizontal: 50, marginTop: 20 }}>
          <TouchableOpacity
            style={[
              GeneralStyle.Btn,
              {
                borderRadius: 15,
                backgroundColor: Colors.midnightBlue,
              },
            ]}
            onPress={() =>
              navigation.navigate("ConfirmWithdrawal", {
                Amount: amount,
                BankName: accountDetails?.bank_name,
                AccountNumber: accountNo,
                AccountName: accountName,
              })
            }
          >
            <Text style={GeneralStyle.RegularText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </ScrollView>
  );
};

export default Withdraw;

const styles = StyleSheet.create({});
