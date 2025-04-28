import {
  View,
  Text,
  Pressable,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import WithdrawComponent from "../../Components/HomeScreen/WithdrawComponent";
import { baseAPIUrl } from "../../Global/Global";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import ErrorHandler from "../../Components/Auth/ErrorHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const SellerProfile = ({ navigation, route }) => {
  const { seller } = route.params;
  console.log(seller)
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const Check = async () => {
    const userInfo = await AsyncStorage.getItem("cashrole-client-details");
    const parsedInfo = JSON.parse(userInfo);
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/seller/profile/view/single?id=${seller._id}`;

      console.log(url)

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      if (response.data.Error === false) {
        setUser(response.data.Data);
        console.log('user: ', user);
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

  useFocusEffect(
    useCallback(() => {
      Check();
    }, [navigation])
  );

  const onRefresh = async () => {
    await Check();
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* keyboard dismiss */}
      {/* modal */}
      <LoadingModal Visible={isLoading} />
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
        {route.params.from !== "AddSeller" && (
          <MaterialIcons
            name="keyboard-arrow-left"
            size={40}
            color={Colors.midnightBlue}
            onPress={() => navigation.goBack()}
          />
        )}
        {route.params.from === "AddSeller" && (
          <MaterialIcons
            name="keyboard-arrow-left"
            size={40}
            color={Colors.midnightBlue}
            onPress={() => navigation.navigate("RegisteredSellers")}
          />
        )}
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
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20, // Optional: adds a little breathing space at bottom
        }}
        showsVerticalScrollIndicator={false} // Optional: remove if you want the scroll bar
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      >
        <Text
          style={[
            GeneralStyle.MediumText,
            { color: Colors.black, marginTop: 25 },
          ]}
        >
          {user?.Profile?.FirstName} {user?.Profile?.LastName}
        </Text>
        {/* withdraw */}
        <View style={{ height: 300, maxHeight: 500, marginBottom: 5 }}>
          <WithdrawComponent
            navigation={navigation}
            title="Your Available Balance"
            amount={`${user?.Balance?.Balance}` || 0}
            type="Seller"
            id={`${seller._id}`}
          />
        </View>
        {route.params.from === "AddSeller" && (
          <View style={{ height: "auto" }}>
            {/* buttons */}
            <View
              style={{
                width: "100%",
                // height: "15%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 15,
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
                onPress={() => navigation.navigate("ManageStore")}
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
                onPress={() => navigation.navigate("AddStore")}
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
                height: 350,
                maxHeight: 700,
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
                    flexWrap: "wrap",
                  }}
                >
                  <Text
                    style={[
                      GeneralStyle.RegularText,
                      {
                        color: Colors.black,
                        maxWidth: "25%",
                        textAlign: "left",
                      },
                    ]}
                  >
                    Name
                  </Text>
                  <Text
                    style={[
                      GeneralStyle.RegularText,
                      {
                        color: Colors.mediumSeaGreen,
                        maxWidth: "70%",
                        textAlign: "right",
                      },
                    ]}
                  >
                    {user?.Profile?.FirstName} {user?.Profile?.LastName}
                  </Text>
                </View>
                {/* dob row */}
                {/* <View
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
                        maxWidth: "45%",
                        textAlign: "left",
                      },
                    ]}
                  >
                    Date of Birth
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
                    02/07/1990
                  </Text>
                </View> */}
                {/* address row */}
                {/* <View
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
                        maxWidth: "30%",
                        textAlign: "left",
                      },
                    ]}
                  >
                    Address
                  </Text>
                  <Text
                    style={[
                      GeneralStyle.RegularText,
                      {
                        color: Colors.mediumSeaGreen,
                        maxWidth: "65%",
                        textAlign: "right",
                      },
                    ]}
                  >
                    0009004187
                  </Text>
                </View> */}
                {/* phone number row */}
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
                    Phone Number
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
                    {user?.Profile?.PhoneNo}
                  </Text>
                </View>
                {/* email row */}
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
                    Email Address
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
                    {user?.Profile?.Email}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default SellerProfile;
