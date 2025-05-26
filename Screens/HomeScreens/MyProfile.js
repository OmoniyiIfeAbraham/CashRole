import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../Components/Header/Header";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { baseAPIUrl } from "../../Global/Global";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import ErrorHandler from "../../Components/Auth/ErrorHandler";

const MyProfile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(null);

  const Check = async () => {
    const userInfo = await AsyncStorage.getItem("cashrole-client-details");
    const parsedInfo = JSON.parse(userInfo);
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/client/profile/view`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      if (response.data.Error === false) {
        await AsyncStorage.setItem(
          "cashrole-client-profile",
          JSON.stringify(response.data.Data)
        );
        setUser(response.data.Data);
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

  const GetBalance = async () => {
    console.log("here");
    const userInfo = await AsyncStorage.getItem("cashrole-client-details");
    const parsedInfo = JSON.parse(userInfo);
    try {
      let url = `${baseAPIUrl}/client/balance/view`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      if (response.data.Error === false) {
        setBalance(response.data.Data);
        console.log(response.data.Data);
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: `${response.data.Error}`,
        });
      }
    } catch (error) {
      ErrorHandler(error, navigation);
    }
  };

  useEffect(() => {
    Check();
    GetBalance();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* modal */}
      <LoadingModal Visible={isLoading} />
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
          NGN{((balance?.Balance || 0) + (balance?.Earned || 0))?.toFixed(2)}
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
          NGN{(balance?.Earned || 0)?.toFixed(2)}
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
          marginTop: "5%",
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
              {user?.User?.FirstName} {user?.User?.LastName}
            </Text>
          </View>
          {/* dob row */}
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
              {user?.User?.DOB}
            </Text>
          </View>
          {/* address row */}
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
              {user?.Profile?.Address}
            </Text>
          </View>
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
              {user?.User?.PhoneNo}
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
                  maxWidth: "50%",
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
                  maxWidth: "50%",
                  textAlign: "right",
                },
              ]}
            >
              {user?.User?.Email}
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <TouchableOpacity
            style={[
              GeneralStyle.Btn,
              {
                height: "70%",
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
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[
              GeneralStyle.Btn,
              {
                height: "70%",
                width: "45%",
                backgroundColor: Colors.black,
              },
            ]}
            onPress={() => navigation.navigate("Update", { user: user })}
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
