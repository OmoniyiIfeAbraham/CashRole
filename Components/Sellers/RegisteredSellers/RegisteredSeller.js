import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../../../Style/ThemeColors";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import GeneralStyle from "../../../Style/General.style";
import LoadingModal from "../../LoadingModal/LoadingModal";
import { baseAPIUrl } from "../../../Global/Global";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import ErrorHandler from "../../Auth/ErrorHandler";
import { useFocusEffect } from "@react-navigation/native";

const RegisteredSeller = ({ navigation }) => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetSellers = async () => {
    const userInfo = await AsyncStorage.getItem("cashrole-client-details");
    const parsedInfo = JSON.parse(userInfo);

    try {
      setLoading(true);
      const url = `${baseAPIUrl}/seller/profile/view`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      if (!response.data.Error) {
        setSellers(response.data.Data);
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: response.data.Error,
        });
      }
    } catch (error) {
      ErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  //   render flat list items
  const renderFlatListItems = useCallback(({ item }) => (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 64,
        backgroundColor: Colors.white,
        elevation: 5,
        flexDirection: "row",
        paddingVertical: 2,
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 20,
        borderRadius: 10,
      }}
      onPress={() =>
        navigation.navigate("SellerProfile", {
          from: "AddSeller",
          seller: item,
        })
      }
    >
      <View
        style={{
          backgroundColor: Colors.ash,
          borderRadius: 10,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          // marginVertical: 15,
        }}
      >
        <FontAwesome5 name="user-circle" size={18} color={Colors.black} />
      </View>
      <View style={{ justifyContent: "center" }}>
        <Text style={[GeneralStyle.BoldText, { color: Colors.black }]}>
          {item.FirstName} {item.LastName}
        </Text>
        <Text
          style={[
            GeneralStyle.LightText,
            { color: Colors.black, fontSize: 22 },
          ]}
        >
          {item.PhoneNo}
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          borderColor: Colors.ash,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          height: 35,
          borderRadius: 30,
        }}
      >
        <Feather name="arrow-right" size={24} color={Colors.ash} />
      </View>
    </TouchableOpacity>
  ));

  useFocusEffect(
    useCallback(() => {
      GetSellers();
    }, [])
  );

  const onRefresh = async () => {
    await GetSellers();
  };

  return (
    <View style={{ paddingVertical: 5, flex: 1, paddingHorizontal: 25 }}>
      {/* loader */}
      <LoadingModal Visible={loading} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={sellers}
        keyExtractor={(item) => item._id}
        renderItem={renderFlatListItems}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default RegisteredSeller;
