import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../../Style/ThemeColors";
import { AntDesign } from "@expo/vector-icons";
import GeneralStyle from "../../../../Style/General.style";

const ProductConfirm = ({ navigation, route }) => {
  const {
    images,
    productName,
    productDescription,
    store,
    productPrice,
    sellerPrice,
    myPrice,
  } = route.params;
  console.log("here");
  console.log(images);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          maxHeight: "70%",
          backgroundColor: Colors.white,
          elevation: 10,
          borderRadius: 5,
          shadowColor: Colors.black,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          paddingHorizontal: 15,
        }}
      >
        {/* cancel icon */}
        <View
          style={{
            height: "10%",
            width: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <AntDesign
            name="close"
            size={30}
            color={Colors.ash}
            onPress={() => navigation.goBack()}
          />
        </View>
        {/* product details */}
        <View
          style={{
            height: "80%",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {/* title */}
          <Text
            style={[
              GeneralStyle.ExtraBoldText,
              { color: Colors.black, fontSize: 30 },
            ]}
          >
            Confirm to add product
          </Text>
          {/* images */}
          {images.length > 0 && (
            <View
              style={{
                maxWidth: "100%",
                maxHeight: "30%",
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {images.map((uri, index) => (
                  <View
                    key={index}
                    style={{
                      width: "19%",
                      height: "50%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 5,
                      zIndex: -10,
                    }}
                  >
                    <Image
                      source={{ uri }}
                      style={{
                        width: "100%",
                        height: "98%",
                        marginVertical: "0.5%",
                      }}
                    />
                  </View>
                ))}
              </View>
            </View>
          )}
          {/* product name row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.black,
                  maxWidth: "35%",
                  textAlign: "left",
                },
              ]}
            >
              Product Name
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.mediumSeaGreen,
                  maxWidth: "60%",
                  textAlign: "right",
                },
              ]}
            >
              {productName}lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            </Text>
          </View>
          {/* price row */}
          <View
            style={{
              width: "100%",
              height: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.black,
                  maxWidth: "15%",
                  textAlign: "left",
                },
              ]}
            >
              Price
            </Text>
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.mediumSeaGreen,
                  maxWidth: "80%",
                  textAlign: "right",
                },
              ]}
            >
              N{productPrice.toLocaleString()}lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            </Text>
          </View>
          {/* description row */}
          <View
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <Text
              style={[
                GeneralStyle.RegularText,
                {
                  color: Colors.black,
                  textAlign: "left",
                  marginBottom: 5,
                },
              ]}
            >
              Description
            </Text>
            <View
              style={[{ width: "100%", height: 100, alignItems: "flex-start" }]}
            >
              <Text
                style={[
                  GeneralStyle.RegularText,
                  {
                    color: Colors.mediumSeaGreen,
                    maxWidth: "80%",
                    textAlign: "right",
                  },
                ]}
              >
                N{productDescription}lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              </Text>
            </View>
          </View>
          {/* buttons */}
          <View
            style={{
              width: "100%",
              height: "10%",
              backgroundColor: "white",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={[
                GeneralStyle.Btn,
                {
                  height: 45,
                  width: "45%",
                  backgroundColor: Colors.white,
                  borderWidth: 1,
                  borderColor: Colors.black,
                },
              ]}
              onPress={() => navigation.goBack()}
            >
              <Text
                style={[
                  GeneralStyle.MediumText,
                  {
                    color: Colors.black,
                  },
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                GeneralStyle.Btn,
                {
                  height: 45,
                  width: "45%",
                  backgroundColor: Colors.black,
                },
              ]}
              onPress={() => navigation.navigate("AddProductOtp")}
            >
              <Text
                style={[
                  GeneralStyle.MediumText,
                  {
                    color: Colors.white,
                  },
                ]}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductConfirm;
