import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../Style/ThemeColors";
import { AntDesign } from "@expo/vector-icons";
import GeneralStyle from "../../../Style/General.style";

const ConfirmWithdrawal = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
            }}
          >
            <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
              Amount (NGN)
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.mediumSeaGreen },
              ]}
            >
              3,000
            </Text>
          </View>
          {/* bank name row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
              Bank Name
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.mediumSeaGreen },
              ]}
            >
              StanbicIBTC Bank
            </Text>
          </View>
          {/* account number row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
              Account Number
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.mediumSeaGreen },
              ]}
            >
              0009004187
            </Text>
          </View>
          {/* account name row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
              Account Name
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.mediumSeaGreen },
              ]}
            >
              Oluwaseyi Akinlolu
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
