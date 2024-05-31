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

// const dummyData = [
//   {
//     id: 1,
//     img: "https://picsum.photos/400/600?random=1",
//     title: "Element 1",
//     description: "Pressable and animated pagination",
//     price: "Fast",
//   },
//   {
//     id: 2,
//     img: "https://picsum.photos/400/600?random=2",
//     title: "Element 2",
//     description: "Full customization for carousel",
//     price: "Simple",
//   },
//   {
//     id: 3,
//     img: "https://picsum.photos/400/600?random=3",
//     title: "Element 3",
//     description: "Accessible for VoiceOver",
//     price: "Efficient",
//   },
// ];

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
      <View style={styles.container}>
        <Image
          source={{ uri: item }}
          style={styles.image}
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
          {dummyData.map((item, index) => {
            const carouselRef = useRef(null); // Initialize the ref for each carousel
            return (
              <GestureHandlerRootView
                key={item.id}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <CustomCarousel
                  ref={carouselRef}
                  data={item.imgs} // Pass only the images array to the carousel
                  renderItem={renderItemView}
                  disablePagination={true}
                />
                <View
                  style={{
                    flexDirection: "row",
                    width: 100,
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handlePreviousClick(carouselRef)}
                  >
                    <Text>Previous</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleNextClick(carouselRef)}
                  >
                    <Text>Next</Text>
                  </TouchableOpacity>
                </View>
                {/* Static content */}
                <View style={styles.content}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  <Text style={styles.extraDesc}>{item.price}</Text>
                </View>
              </GestureHandlerRootView>
            );
          })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: 400,
    alignItems: "center",
  },
  image: {
    width,
    height: 400,
  },
  content: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: "#333",
  },
  extraDesc: {
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default StoreLink;
