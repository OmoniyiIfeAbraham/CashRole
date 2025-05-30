import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { useCallback } from "react";
import Colors from "../../Style/ThemeColors";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import GeneralStyle from "../../Style/General.style";
import { baseAPIUrl } from "../../Global/Global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import ErrorHandler from "../Auth/ErrorHandler";
import LoadingModal from "../LoadingModal/LoadingModal";

const YourStores = ({
  navigation,
  stores,
  onRefresh,
  isRefreshing,
  seller,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const SendOtp = async (Id, email) => {
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
        navigation.replace("OpenStore", { Id, email, seller });
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

  const deleteBtn = async (Id) => {
    try {
      setIsLoading(true);
      let url = `${baseAPIUrl}/store/actions/delete?id=${Id}`;

      const userInfo = await AsyncStorage.getItem("cashrole-client-details");
      const parsedInfo = JSON.parse(userInfo);

      const response = await axios.delete(url, {
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
          textBody: "Store Deleted Successfully",
        });
        onRefresh();
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
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        height: "auto",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          width: "75%",
          backgroundColor: Colors.white,
          elevation: 5,
          flexDirection: "row",
          paddingVertical: 5,
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
                Email: seller?.Email,
              })
            : SendOtp(item?._id, seller?.Email)
        }
      >
        <View style={{ flexDirection: "row", width: "100%" }}>
          {/* icon */}
          <View
            style={{
              backgroundColor: Colors.ash,
              borderRadius: 10,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
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
                { color: Colors.black, fontSize: 20 },
              ]}
            >
              {item?.Address}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "20%",
          backgroundColor: Colors.tomato,
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 54,
          borderRadius: 5,
        }}
        onPress={() => deleteBtn(item?._id)}
      >
        <Text
          style={[
            GeneralStyle.LightText,
            { color: Colors.white, textAlign: "center", borderRadius: 5 },
          ]}
        >
          Delete Store
        </Text>
      </TouchableOpacity>
    </View>
  ));

  return (
    <View style={{ paddingVertical: 5, flex: 1, paddingHorizontal: "2%" }}>
      {/* loader */}
      <LoadingModal Visible={isLoading} />
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

export default YourStores;
