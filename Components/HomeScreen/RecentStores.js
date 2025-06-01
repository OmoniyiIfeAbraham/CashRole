import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import Colors from "../../Style/ThemeColors";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import GeneralStyle from "../../Style/General.style";
import { baseAPIUrl } from "../../Global/Global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import ErrorHandler from "../Auth/ErrorHandler";

const RecentStores = ({
  navigation,
  stores,
  onRefresh,
  isRefreshing,
  user,
}) => {
  // find a  way to pass the seller info together with the store so things don't break later on
  const [isLoading, setIsLoading] = useState(false);

  const SendOtp = async (Id, email, seller) => {
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/store/auth/add/sendOtp?id=${Id}&Email=${email}`;

      const userInfo = await AsyncStorage.getItem("cashrole-client-details");
      const parsedInfo = JSON.parse(userInfo);

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      // console.log(response.data);

      if (response.data?.Error === false) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "OTP Sent Successfully",
        });
        navigation.navigate("OpenStore", { Id, email, seller });
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

  //   render flat list items
  const renderFlatListItems = useCallback(({ item }) => (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: Colors.white,
        elevation: 5,
        flexDirection: "row",
        paddingVertical: 2,
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 20,
        maxHeight: 200,
        borderRadius: 10,
      }}
      onPress={() =>
        item?.Verify === true
          ? navigation.navigate("Store", {
              store: item,
              Email: item.SellerID?.Email,
            })
          : SendOtp(item?._id, item.SellerID?.Email, item.SellerID)
      }
    >
      <View style={{ flexDirection: "row", width: "87%" }}>
        {/* icon */}
        <View
          style={{
            backgroundColor: Colors.ash,
            borderRadius: 10,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
            marginRight: "2%",
            width: "18%",
          }}
        >
          <FontAwesome5 name="store-alt" size={18} color={Colors.black} />
        </View>
        {/* name and address */}
        <View style={{ justifyContent: "flex-start", width: "80%" }}>
          <Text style={[GeneralStyle.BoldText, { color: Colors.black }]}>
            {item?.Name}
          </Text>
          <Text
            style={[
              GeneralStyle.LightText,
              {
                color: Colors.black,
                fontSize: 20,
              },
            ]}
          >
            {item?.Address}
          </Text>
        </View>
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
          width: "13%",
        }}
      >
        <Feather name="arrow-right" size={24} color={Colors.ash} />
      </View>
    </TouchableOpacity>
  ));
  return (
    <View style={{ paddingVertical: 5, flex: 1, paddingHorizontal: 25 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={stores}
        keyExtractor={(item) => item._id}
        renderItem={renderFlatListItems}
        nestedScrollEnabled={true}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
    </View>
  );
};

export default RecentStores;
