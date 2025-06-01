import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import RecentStores from "../../Components/HomeScreen/RecentStores";
import Header from "../../Components/Header/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseAPIUrl } from "../../Global/Global";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import ErrorHandler from "../../Components/Auth/ErrorHandler";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";

const Stores = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [stores, setStores] = useState([]);
  const [user, setUser] = useState({});

  const getStores = async () => {
    try {
      setIsLoading(true);
      const userInfo = await AsyncStorage.getItem("cashrole-client-details");
      const parsedInfo = JSON.parse(userInfo);
      setUser(parsedInfo);
      let url = `${baseAPIUrl}/store/view/client`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      console.log("stores response: ", response.data);

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

  // console.log(user)

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* loader */}
      <LoadingModal Visible={isLoading} />
      {/* header */}
      <Header navigation={navigation} title="Your Stores" />
      {/* btn */}
      {/* <View
        style={{ width: "100%", paddingHorizontal: 50, marginVertical: 20 }}
      >
        <TouchableOpacity
          style={[GeneralStyle.Btn, { backgroundColor: Colors.midnightBlue }]}
          onPress={() => navigation.navigate("AddStore")}
        >
          <Text style={[GeneralStyle.BoldText]}>Add Store</Text>
        </TouchableOpacity>
      </View> */}
      {/* stores */}
      <RecentStores
        navigation={navigation}
        stores={stores}
        onRefresh={getStores}
        isRefreshing={isLoading}
        user={user}
      />
    </SafeAreaView>
  );
};

export default Stores;
