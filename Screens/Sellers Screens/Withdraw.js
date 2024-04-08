import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialIcons,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";
import Banks from "./../../Components/Sellers/Withdraw/Banks";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import LoadingModal from "./../../Components/LoadingModal/LoadingModal";

const { width, height } = Dimensions.get("window");

const Withdraw = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [accountNo, setAccountNo] = useState("");
  const [accountName, setAccountName] = useState("");
  const [Loading, setLoading] = useState(false);

  const veryBankDetails = () => {
    if (selectedValue != "" && accountNo != "") {
      const url = `https://api.paystack.co/bank/resolve?account_number=${accountNo}&bank_code=${selectedValue}`;
      try {
        setLoading(true);
        axios
          .get(url, {
            headers: {
              Authorization:
                "Bearer sk_test_a57c0c5dc61de74ba280e8601ccd83084c63fe20",
            },
          })
          .then((response) => {
            setAccountName(response.data.data.account_name);
            setLoading(false);
          })
          .catch((error) => {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title:
                "An Error Occured!! Check Acc/No and Bank name Before Proceding.",
            });
            setLoading(false);
          });
      } catch (error) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title:
            "An Error Occured!! Check Acc/No and Bank name Before Proceding.",
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
        width: width * 0.9,
      },
    ],
    placeholder: {
      color: Colors.ash,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* modal */}
      <LoadingModal Visible={Loading} />
      {/* keyboard dismiss */}
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        {/* header */}
        <View
          style={{
            width: "100%",
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={40}
            color={Colors.midnightBlue}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={[GeneralStyle.ExtraBoldText, { color: Colors.midnightBlue }]}
          >
            Withdraw
          </Text>
          {/* invisible view */}
          <View style={{ opacity: 0 }}>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={40}
              color={Colors.midnightBlue}
            />
          </View>
        </View>
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
          Withdraw
        </Text>
        {/* form */}
        {/* bank */}
        <View style={GeneralStyle.TextInputView}>
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
            name="number"
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
            autoComplete="tel"
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
      </Pressable>
    </SafeAreaView>
  );
};

export default Withdraw;

const styles = StyleSheet.create({});
