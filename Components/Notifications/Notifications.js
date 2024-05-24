import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useCallback } from "react";
import Colors from "../../Style/ThemeColors";
import { AntDesign } from "@expo/vector-icons";
import GeneralStyle from "../../Style/General.style";

const Notifications = ({ navigation }) => {
  const notifications = [
    {
      id: 0,
      msg: "You have a new message from John.",
      time: "10:30",
      date: "18/02/2024",
    },
    {
      id: 1,
      msg: "Meeting scheduled with the team at 2 PM.",
      time: "08:45",
      date: "19/02/2024",
    },
    {
      id: 2,
      msg: "Your package has been shipped.",
      time: "12:00",
      date: "20/02/2024",
    },
    {
      id: 3,
      msg: "System update available. Please restart your computer.",
      time: "14:15",
      date: "21/02/2024",
    },
    {
      id: 4,
      msg: "Reminder: Doctor's appointment tomorrow at 9 AM.",
      time: "16:45",
      date: "22/02/2024",
    },
    {
      id: 5,
      msg: "New comment on your post.",
      time: "11:25",
      date: "23/02/2024",
    },
    {
      id: 6,
      msg: "Your subscription will expire in 3 days.",
      time: "13:30",
      date: "24/02/2024",
    },
    {
      id: 7,
      msg: "You have a new friend request.",
      time: "09:50",
      date: "25/02/2024",
    },
    {
      id: 8,
      msg: "Weather alert: Heavy rain expected tomorrow.",
      time: "07:00",
      date: "26/02/2024",
    },
    {
      id: 9,
      msg: "New sale on your favorite items. Check it out!",
      time: "17:20",
      date: "27/02/2024",
    },
    {
      id: 10,
      msg: "Your flight has been delayed by 2 hours.",
      time: "05:30",
      date: "28/02/2024",
    },
    {
      id: 11,
      msg: "Congratulations! You've won a gift card.",
      time: "18:50",
      date: "01/03/2024",
    },
  ];

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
    >
      {/* main view */}
      <View style={{ height: "100%", width: "90%" }}>
        {/* msg view */}
        <View style={{ width: "100%", height: "auto", marginBottom: 5 }}>
          <Text style={[GeneralStyle.RegularText, { color: Colors.white }]}>
            {item.msg}
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
            {item.time}
          </Text>
          <Text
            style={[
              GeneralStyle.RegularText,
              { color: Colors.ash, fontSize: 20, marginLeft: 5 },
            ]}
          >
            {item.date}
          </Text>
        </View>
      </View>
      {/* icon view */}
      <View
        style={{
          height: "auto",
          width: "10%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign name="arrowright" size={24} color={Colors.white} />
      </View>
    </TouchableOpacity>
  ));
  return (
    <View style={{ paddingVertical: 15, flex: 1, paddingHorizontal: 7 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderFlatListItems}
      />
    </View>
  );
};

export default Notifications;
