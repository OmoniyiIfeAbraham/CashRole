import {
  View,
  Text,
  Pressable,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import WithdrawComponent from "../../Components/HomeScreen/WithdrawComponent";

const SellerProfile = ({ navigation, route }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
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
            Seller's profile
          </Text>
          {/* invisible view */}
          <View>
            <MaterialIcons
              name="history-edu"
              size={30}
              color={Colors.midnightBlue}
            />
            <Text
              style={[
                GeneralStyle.LightText,
                { color: Colors.black, fontSize: 12 },
              ]}
            >
              History
            </Text>
          </View>
        </View>
        <Text
          style={[
            GeneralStyle.MediumText,
            { color: Colors.black, marginTop: 25 },
          ]}
        >
          Vivian Nnaji
        </Text>
        {/* withdraw */}
        <View style={{ height: "25%", marginBottom: 5 }}>
          <WithdrawComponent
            navigation={navigation}
            title="Your Available Balance"
            amount="5,000"
          />
        </View>
        {route.params.from === "AddSeller" && (
          <View style={{ height: "auto" }}>
            {/* buttons */}
            <View
              style={{
                width: "100%",
                height: "20%",
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
                // onPress={() => navigation.goBack()}
              >
                <Text
                  style={[
                    GeneralStyle.MediumText,
                    {
                      color: Colors.black,
                    },
                  ]}
                >
                  Manage stores
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  GeneralStyle.Btn,
                  {
                    height: 45,
                    width: "45%",
                    backgroundColor: Colors.midnightBlue,
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
                  Add new store
                </Text>
              </TouchableOpacity>
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
                  <Text
                    style={[GeneralStyle.RegularText, { color: Colors.black }]}
                  >
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
                  <Text
                    style={[GeneralStyle.RegularText, { color: Colors.black }]}
                  >
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
                  <Text
                    style={[GeneralStyle.RegularText, { color: Colors.black }]}
                  >
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
                  <Text
                    style={[GeneralStyle.RegularText, { color: Colors.black }]}
                  >
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
                  <Text
                    style={[GeneralStyle.RegularText, { color: Colors.black }]}
                  >
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
                        fontSize: 20,
                      },
                    ]}
                  >
                    Delete Seller Account
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
                        fontSize: 20,
                      },
                    ]}
                  >
                    Update Profile
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export default SellerProfile;
