import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import Colors from "../../Style/ThemeColors";
import { AntDesign } from "@expo/vector-icons";
import GeneralStyle from "../../Style/General.style";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { baseAPIUrl } from "../../Global/Global";
import axios from "axios";
import ErrorHandler from "../../Components/Auth/ErrorHandler";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Notifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const GetBalance = async () => {
    const userInfo = await AsyncStorage.getItem("cashrole-client-details");
    const parsedInfo = JSON.parse(userInfo);
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/client/notifications/view`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      if (response.data.Error === false) {
        setNotifications(response.data.Data);
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

  useEffect(() => {
    GetBalance();
  }, []);

  const GetDate = (item) => {
    const createdAt = new Date(item.createdAt);
    const formattedDate = createdAt.toISOString().slice(0, 10); // "YYYY-MM-DD"
    return formattedDate;
  };

  const GetTime = (item) => {
    const createdAt = new Date(item.createdAt);
    const formattedTime = createdAt.toTimeString().slice(0, 5); // "HH:mm"
    return formattedTime;
  };

  // render flat list items
  const renderFlatListItems = useCallback(({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        width: "100%",
        height: "auto",
        padding: 5,
        backgroundColor: Colors.midnightBlue,
        marginVertical: 8,
        borderRadius: 8,
      }}
      // onPress={() => navigation.navigate("NotificationDetails")}
    >
      {/* main view */}
      <View style={{ height: "100%", width: "90%" }}>
        {/* msg view */}
        <View style={{ width: "100%", height: "auto", marginBottom: 5 }}>
          <Text style={[GeneralStyle.RegularText, { color: Colors.white }]}>
            {item.Message}
          </Text>
        </View>
        {/* time and date view */}
        <View
          style={{
            width: "100%",
            height: "auto",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={[
              GeneralStyle.RegularText,
              { color: Colors.ash, fontSize: 20, marginRight: 5 },
            ]}
          >
            {GetTime(item)}
          </Text>
          <Text
            style={[
              GeneralStyle.RegularText,
              { color: Colors.ash, fontSize: 20, marginLeft: 5 },
            ]}
          >
            {GetDate(item)}
          </Text>
        </View>
      </View>
      {/* icon view */}
      {/* <View
        style={{
          height: "auto",
          width: "10%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign name="arrowright" size={24} color={Colors.white} />
      </View> */}
    </TouchableOpacity>
  ));
  return (
    <View style={{ paddingVertical: 15, flex: 1, paddingHorizontal: 7 }}>
      {/* modal */}
      <LoadingModal Visible={isLoading} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={notifications.reverse()}
        keyExtractor={(item) => item._id}
        renderItem={renderFlatListItems}
      />
    </View>
  );
};

export default Notifications;
