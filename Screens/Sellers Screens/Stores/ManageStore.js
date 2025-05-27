import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../Components/Header/Header";
import Colors from "../../../Style/ThemeColors";
import GeneralStyle from "../../../Style/General.style";
import YourStores from "../../../Components/Stores/YourStores";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import ErrorHandler from "../../../Components/Auth/ErrorHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseAPIUrl } from "../../../Global/Global";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const ManageStore = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [stores, setStores] = useState([]);
  const { seller } = route.params;
  console.log(seller);

  const getStores = async () => {
    try {
      setIsLoading(true);
      const userInfo = await AsyncStorage.getItem("cashrole-client-details");
      const parsedInfo = JSON.parse(userInfo);
      let url = `${baseAPIUrl}/store/view?id=${seller.SellerID || seller?._id}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      if (response.data.Error === false) {
        setStores(response.data.Data);
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
    getStores();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 5 }}>
      {/* loader */}
      <LoadingModal Visible={isLoading} />
      {/* header */}
      <Header
        navigation={navigation}
        title={`${seller?.FirstName} ${seller?.LastName} Stores`}
      />
      {/* body */}
      {/* btn */}
      <View
        style={{
          width: "100%",
          paddingHorizontal: 50,
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          style={[GeneralStyle.Btn, { backgroundColor: Colors.midnightBlue }]}
          onPress={() =>
            navigation.navigate("AddStore", {
              sellerId: seller?._id,
              Email: seller?.Email,
              seller: seller,
            })
          }
        >
          <Text style={[GeneralStyle.BoldText]}>Add Store</Text>
        </TouchableOpacity>
      </View>
      {/* stores */}
      <YourStores
        navigation={navigation}
        stores={stores}
        onRefresh={getStores}
        isRefreshing={isLoading}
        seller={seller}
      />
    </SafeAreaView>
  );
};

export default ManageStore;
