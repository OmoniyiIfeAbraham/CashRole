import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../Screens/Home";
import Sellers from "../../Screens/Sellers";
import History from "../../Screens/History";
import Colors from "../../Style/ThemeColors";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Stores from "../../Screens/Sellers Screens/Stores";
import RegisteredSellers from "../../Screens/Sellers Screens/RegisteredSellers";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "AlegreyaSans_400Regular",
          fontSize: 14,
          marginBottom: 10,
        },
        tabBarStyle: {
          backgroundColor: Colors.midnightBlue,
          alignItems: "center",
          paddingTop: 10,
          height: 75,
        },
        tabBarActiveTintColor: Colors.white,
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: Colors.ash,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Entypo name="home" size={36} color={Colors.white} />
            ) : (
              <Entypo name="home" size={30} color={Colors.ash} />
            ),
        }}
      />
      <Tab.Screen
        name="Sellers"
        component={RegisteredSellers}
        options={{
          title: "Sellers",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <MaterialIcons name="people" size={36} color={Colors.white} />
            ) : (
              <MaterialIcons name="people" size={30} color={Colors.ash} />
            ),
        }}
      />
      <Tab.Screen
        name="Stores"
        component={Stores}
        options={{
          title: "Stores",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="store"
                size={36}
                color={Colors.white}
              />
            ) : (
              <MaterialCommunityIcons
                name="store"
                size={30}
                color={Colors.ash}
              />
            ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          title: "History",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <MaterialIcons
                name="history-edu"
                size={36}
                color={Colors.white}
              />
            ) : (
              <MaterialIcons name="history-edu" size={30} color={Colors.ash} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;

const styles = StyleSheet.create({});
