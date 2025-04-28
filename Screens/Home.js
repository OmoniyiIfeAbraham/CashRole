import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  RefreshControl,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "../Style/ThemeColors";
import GeneralStyle from "../Style/General.style";
import WithdrawComponent from "../Components/HomeScreen/WithdrawComponent";
import RecentStores from "../Components/HomeScreen/RecentStores";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { baseAPIUrl } from "../Global/Global";
import axios from "axios";
import ErrorHandler from "../Components/Auth/ErrorHandler";

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const GetBalance = async (setBalance, navigation) => {
    console.log("Fetching balance...");
    const userInfo = await AsyncStorage.getItem("cashrole-client-details");
    const parsedInfo = JSON.parse(userInfo);

    try {
      const url = `${baseAPIUrl}/client/balance/view`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      if (!response.data.Error) {
        setBalance(response.data.Data);
        console.log("Balance:", response.data.Data);
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: response.data.Error,
        });
      }
    } catch (error) {
      ErrorHandler(error, navigation);
    }
  };

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        const data = await AsyncStorage.getItem("cashrole-client-details");
        const parsedData = JSON.parse(data);
        setUser(parsedData);
        // console.log(parsedData);
      }
      fetchData();
    }, [])
  );

  // useEffect(() => {
  //   GetBalance();
  // }, []);

  // Use this inside your component
  useFocusEffect(
    useCallback(() => {
      GetBalance(setBalance, navigation);
    }, [navigation])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await GetBalance(setBalance, navigation);
    setRefreshing(false);
  };

  // console.log(user);
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 25 }}>
      {/* upper part */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flex: 1 }}>
          {/* header */}
          <View
            style={{
              width: "100%",
              height: 100,
              maxHeight: 200,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  padding: 15,
                  backgroundColor: Colors.ash,
                  borderRadius: 50,
                  marginRight: 10,
                }}
                onPress={() => navigation.navigate("MyProfile")}
              >
                <FontAwesome5 name="user-alt" size={30} color={Colors.white} />
              </TouchableOpacity>
              <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
                Hello, {user?.FirstName}
              </Text>
            </View>
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => navigation.navigate("Notification")}
            >
              <MaterialCommunityIcons
                name="bell"
                size={35}
                color={Colors.midnightBlue}
              />
            </TouchableOpacity>
          </View>
          {/* balance */}
          <View style={{ height: 50, maxHeight: 100 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={[
                  GeneralStyle.RegularText,
                  { color: Colors.black, marginRight: 20 },
                ]}
              >
                Total Balance
              </Text>
              <AntDesign
                name="exclamationcircleo"
                size={24}
                color="black"
                onPress={() => setModalVisible(true)}
              />
            </View>
            <Text
              style={[
                GeneralStyle.BoldText,
                { color: Colors.black, fontSize: 30 },
              ]}
            >
              NGN
              {((balance?.Balance || 0) + (balance?.Earned || 0))?.toFixed(2)}
            </Text>
          </View>
          {/* Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 10,
                  elevation: 5,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, marginBottom: 10 }}>
                  Total Balance
                </Text>
                <Text style={{ textAlign: "center" }}>
                  This is the sum of all the money in your account.
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={{
                    marginTop: 20,
                    backgroundColor: Colors.midnightBlue,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: Colors.white }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* withdraw */}
          <View style={{ height: 300, maxHeight: 500, marginTop: 15 }}>
            <WithdrawComponent
              navigation={navigation}
              title="Available funds"
              amount={balance?.Balance?.toFixed(2)}
            />
          </View>
          {/* links */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 50,
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
              // height: "15%",
            }}
          >
            {/* store link */}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.midnightBlue,
                  padding: 20,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => navigation.navigate("StoreLink")}
              >
                <MaterialIcons
                  name="content-copy"
                  size={36}
                  color={Colors.white}
                />
              </TouchableOpacity>
              <Text
                style={[
                  GeneralStyle.RegularText,
                  { color: Colors.ash, marginTop: "1%" },
                ]}
              >
                Store Link
              </Text>
            </View>
            {/* deal */}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.midnightBlue,
                  paddingVertical: 24,
                  paddingHorizontal: 22,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => navigation.navigate("Deal")}
              >
                <FontAwesome5 name="handshake" size={30} color={Colors.white} />
              </TouchableOpacity>
              <Text
                style={[
                  GeneralStyle.RegularText,
                  { color: Colors.ash, marginTop: "1%" },
                ]}
              >
                Deal
              </Text>
            </View>
            {/* add seller */}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.midnightBlue,
                  padding: 20,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => navigation.navigate("CreateSeller")}
              >
                <Ionicons name="person-add" size={36} color={Colors.white} />
              </TouchableOpacity>
              <Text
                style={[
                  GeneralStyle.RegularText,
                  { color: Colors.ash, marginTop: "1%" },
                ]}
              >
                Add Seller
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* recent store
      <View style={{ flex: 1, height: "30%" }}>
        <View style={{ height: "20%" }}>
          <Text
            style={[
              GeneralStyle.BoldText,
              { color: Colors.black, fontSize: 32 },
            ]}
          >
            Recent Stores
          </Text>
        </View>
        <View style={{ height: "80%", flex: 1 }}>
          <RecentStores />
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default Home;



// {
//   "cli": {
//     "version": ">= 3.13.3"
//   },
//   "build": {
//     "development": {
//       "developmentClient": true,
//       "distribution": "internal"
//     },
//     "preview": {
//       "distribution": "internal"
//     },
//     "preview1": {
//       "android": {
//         "buildType": "apk"
//       }
//     },
//     "preview2": {
//       "android": {
//         "gradleCommand": ":app:assembleRelease",
//         "env": {
//           "EXPO_KOTLIN_VERSION": "1.9.10"
//         }
//       }
//     },
//     "production": {
//       "android": {
//         "env": {
//           "EXPO_KOTLIN_VERSION": "1.9.10"
//         }
//       }
//     }
//   },
//   "submit": {
//     "production": {}
//   }
// }
