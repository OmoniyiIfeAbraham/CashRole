import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../Components/Header/Header";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import { AntDesign } from "@expo/vector-icons";

const MyProfile = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* header */}
      <Header navigation={navigation} title="My Profile" />
      {/* transaction */}
      <View style={{ marginTop: 25, height: "10%" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={[
              GeneralStyle.RegularText,
              { color: Colors.black, marginRight: 20 },
            ]}
          >
            Total Transaction
          </Text>
        </View>
        <Text
          style={[GeneralStyle.BoldText, { color: Colors.black, fontSize: 30 }]}
        >
          NGN100,000.00
        </Text>
      </View>
      {/* profit */}
      <View style={{ marginTop: 15, height: "10%" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={[
              GeneralStyle.RegularText,
              { color: Colors.black, marginRight: 20 },
            ]}
          >
            Total Profit
          </Text>
        </View>
        <Text
          style={[GeneralStyle.BoldText, { color: Colors.black, fontSize: 30 }]}
        >
          NGN5,000.00
        </Text>
      </View>
      {/* details */}
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
        {/* user details */}
        <View
          style={{
            height: "75%",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {/* name row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
              Name
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.mediumSeaGreen },
              ]}
            >
              Vivian Nnaji
            </Text>
          </View>
          {/* dob row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
              Date of Birth
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.mediumSeaGreen },
              ]}
            >
              02/07/1990
            </Text>
          </View>
          {/* address row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
              Address
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
          {/* phone number row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
              Phone Number
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.mediumSeaGreen },
              ]}
            >
              07030473033
            </Text>
          </View>
          {/* email row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
              Email Address
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                { color: Colors.mediumSeaGreen },
              ]}
            >
              example@gmail.com
            </Text>
          </View>
        </View>
        {/* buttons */}
        <View
          style={{
            width: "100%",
            height: "25%",
            backgroundColor: Colors.white,
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
                backgroundColor: Colors.tomato,
              },
            ]}
            // onPress={() => navigation.goBack()}
          >
            <Text
              style={[
                GeneralStyle.MediumText,
                {
                  color: Colors.white,
                },
              ]}
            >
              Delete Account
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
            // onPress={() => navigation.navigate("WithdrawalOtp")}
          >
            <Text
              style={[
                GeneralStyle.MediumText,
                {
                  color: Colors.white,
                },
              ]}
            >
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyProfile;
