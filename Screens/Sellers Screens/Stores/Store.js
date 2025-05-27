import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../Components/Header/Header";
import GeneralStyle from "../../../Style/General.style";
import Colors from "../../../Style/ThemeColors";
import Products from "../../../Components/Stores/Products";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseAPIUrl } from "../../../Global/Global";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import ErrorHandler from "../../../Components/Auth/ErrorHandler";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";

const Store = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { store, Email } = route.params;
  console.log(store);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const userInfo = await AsyncStorage.getItem("cashrole-client-details");
      const parsedInfo = JSON.parse(userInfo);
      let url = `${baseAPIUrl}/product/actions/view?id=${store._id}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      if (response.data.Error === false) {
        setProducts(response.data.Data);
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
    getProducts();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* loader */}
      <LoadingModal Visible={isLoading} />
      {/* header */}
      <Header navigation={navigation} title={store?.Name} />
      {/* body */}
      {/* store location */}
      <View
        style={{
          width: "100%",
          height: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            GeneralStyle.RegularText,
            { color: Colors.black, fontSize: 20 },
          ]}
        >
          {store?.Address}
        </Text>
      </View>
      {/* btn */}
      <View
        style={{ width: "100%", paddingHorizontal: 50, marginVertical: 20 }}
      >
        <TouchableOpacity
          style={[GeneralStyle.Btn, { backgroundColor: Colors.midnightBlue }]}
          onPress={() => navigation.navigate("AddProduct", { store, Email })}
        >
          <Text style={[GeneralStyle.BoldText]}>Add Product</Text>
        </TouchableOpacity>
      </View>
      {/* products */}
      <Products
        navigation={navigation}
        products={products}
        onRefresh={getProducts}
        isRefreshing={isLoading}
        store={store}
        Email={Email}
      />
    </SafeAreaView>
  );
};

export default Store;
