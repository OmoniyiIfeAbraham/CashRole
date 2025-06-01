import {
  View,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import CustomCarousel from "carousel-with-pagination-rn";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { dummyData } from "../../Components/StoreLink/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseAPIUrl } from "../../Global/Global";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import ErrorHandler from "../../Components/Auth/ErrorHandler";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";

const { width } = Dimensions.get("screen");

const StoreLink = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const userInfo = await AsyncStorage.getItem("cashrole-client-details");
      const parsedInfo = JSON.parse(userInfo);
      let url = `${baseAPIUrl}/product/view`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${parsedInfo.Auth}`,
        },
      });

      // console.log(response.data.Data)

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

  const handleNextClick = (carouselRef) => {
    carouselRef.current?.showNextItem(); // Will scroll to the next item in carousel
  };

  const handlePreviousClick = (carouselRef) => {
    carouselRef.current?.showPreviousItem(); // Will scroll to the previous item in carousel
  };

  const renderItemView = ({ item }) => {
    // console.log(item);
    // console.log(dummyData)
    return (
      <View
        style={{
          width,
          height: 400,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item }}
          style={{
            width,
            height: 320,
          }}
          resizeMode="contain"
        />
      </View>
    );
  };

  const carouselRefs = useRef([]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* loader */}
      <LoadingModal Visible={isLoading} />
      {/* keyboard dismiss */}
      <ScrollView style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        {/* header */}
        <View
          style={{
            width: "100%",
            height: 50,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor: Colors.midnightBlue,
            marginBottom: 10,
          }}
        >
          {/* search bar */}
          <View
            style={[
              GeneralStyle.TextInputView,
              {
                width: "55%",
                height: 40,
                backgroundColor: Colors.ash,
                borderWidth: 1,
                borderColor: Colors.white,
                borderRadius: 5,
                marginBottom: 0,
                paddingHorizontal: 4,
              },
            ]}
          >
            <FontAwesome
              name="search"
              size={24}
              color={Colors.black}
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={GeneralStyle.TextInput}
              placeholder="Search for product"
            />
          </View>
          {/* phone icon */}
          <View
            style={{
              width: "10%",
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.ash,
              borderWidth: 1,
              borderColor: Colors.white,
              borderRadius: 5,
            }}
          >
            <FontAwesome name="phone" size={30} color={Colors.black} />
          </View>
          {/* copy icon */}
          <View
            style={{
              width: "15%",
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="content-copy" size={40} color={Colors.white} />
          </View>
        </View>
        {/* Multiple Carousels */}
        <ScrollView>
          {products.map((item, index) => {
            // Initialize ref if not already done
            if (!carouselRefs.current[index]) {
              carouselRefs.current[index] = React.createRef();
            }
            return (
              <GestureHandlerRootView
                key={item._id}
                style={{
                  justifyContent: "center",
                  // alignItems: "center",
                  marginBottom: 20,
                  height: 500,
                  backgroundColor: Colors.midnightBlue,
                }}
              >
                <View
                  style={[GeneralStyle.carouselContainer, { width: width }]}
                >
                  <TouchableOpacity
                    style={GeneralStyle.prevButton}
                    onPress={() =>
                      handlePreviousClick(carouselRefs.current[index])
                    }
                  >
                    <FontAwesome
                      name="chevron-left"
                      size={30}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                  <CustomCarousel
                    ref={carouselRefs.current[index]}
                    data={item.Images} // Pass only the images array to the carousel
                    renderItem={renderItemView}
                    disablePagination={true}
                  />
                  <TouchableOpacity
                    style={GeneralStyle.nextButton}
                    onPress={() => handleNextClick(carouselRefs.current[index])}
                  >
                    <FontAwesome
                      name="chevron-right"
                      size={30}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                </View>
                {/* Static content */}
                <View style={{ width, flexDirection: "row" }}>
                  {/* text */}
                  <View
                    style={{
                      width: "65%",
                      paddingHorizontal: 5,
                      height: "auto",
                    }}
                  >
                    <Text
                      style={[
                        GeneralStyle.MediumText,
                        { color: Colors.white, fontSize: 25 },
                      ]}
                    >
                      {item?.Name.slice(0, 25)}{" "}
                      {item.Name.length >= 25 ? (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedItem(item);
                            setModalVisible(true);
                          }}
                        >
                          <Text
                            style={{
                              color: Colors.mediumSeaGreen,
                              fontSize: 25,
                            }}
                          >
                            ...
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        ""
                      )}
                    </Text>
                    <Text
                      style={[
                        GeneralStyle.MediumText,
                        {
                          color: Colors.white,
                          fontSize: 25,
                        },
                      ]}
                    >
                      {item?.Details.slice(0, 50)}
                      {item.Details.length >= 50 ? (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedItem(item);
                            setModalVisible(true);
                          }}
                        >
                          <Text
                            style={{
                              color: Colors.mediumSeaGreen,
                              fontSize: 25,
                            }}
                          >
                            ...
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        ""
                      )}
                    </Text>
                    <Text
                      style={[
                        GeneralStyle.BoldText,
                        { color: Colors.white, fontSize: 30 },
                      ]}
                    >
                      NGN{Number(item?.Price).toLocaleString()}
                    </Text>
                  </View>
                  {/* btn */}
                  <View
                    style={{
                      width: "30%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        GeneralStyle.Btn,
                        { height: 39, backgroundColor: Colors.white },
                      ]}
                    >
                      <Text
                        style={[
                          GeneralStyle.MediumText,
                          { color: Colors.black, fontSize: 12 },
                        ]}
                      >
                        PAY FOR THIS ITEM
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </GestureHandlerRootView>
            );
          })}
        </ScrollView>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
            >
              {selectedItem?.Name}
            </Text>
            <Text style={{ fontSize: 16, color: "#444", marginBottom: 10 }}>
              {selectedItem?.Details}
            </Text>

            {/* Add more fields here if needed */}
            {/* <Text>{selectedItem?.OtherInfo}</Text> */}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                marginTop: 20,
                backgroundColor: Colors.midnightBlue,
                padding: 10,
                borderRadius: 5,
                alignSelf: "flex-end",
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default StoreLink;
