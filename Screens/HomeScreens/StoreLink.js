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
} from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../Style/ThemeColors";
import GeneralStyle from "../../Style/General.style";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import CustomCarousel from "carousel-with-pagination-rn";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { dummyData } from "../../Components/StoreLink/data";

const { width } = Dimensions.get("screen");

const StoreLink = () => {
  const handleNextClick = (carouselRef) => {
    carouselRef.current?.showNextItem(); // Will scroll to the next item in carousel
  };

  const handlePreviousClick = (carouselRef) => {
    carouselRef.current?.showPreviousItem(); // Will scroll to the previous item in carousel
  };

  const renderItemView = ({ item }) => {
    return (
      <View
        style={{
          width,
          height: 400,
          alignItems: "center",
        }}
      >
        <Image
          source={{ item }}
          style={{
            width,
            height: 320,
          }}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          {dummyData.map((item) => {
            const carouselRef = useRef(null); // Initialize the ref for each carousel
            return (
              <GestureHandlerRootView
                key={item.id}
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
                    onPress={() => handlePreviousClick(carouselRef)}
                  >
                    <FontAwesome
                      name="chevron-left"
                      size={30}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                  <CustomCarousel
                    ref={carouselRef}
                    data={item.imgs} // Pass only the images array to the carousel
                    renderItem={renderItemView}
                    disablePagination={true}
                  />
                  <TouchableOpacity
                    style={GeneralStyle.nextButton}
                    onPress={() => handleNextClick(carouselRef)}
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
                      {item.title}
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
                      {item.location}
                    </Text>
                    <Text
                      style={[
                        GeneralStyle.BoldText,
                        { color: Colors.white, fontSize: 30 },
                      ]}
                    >
                      NGN{item.price}
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
    </SafeAreaView>
  );
};

export default StoreLink;
