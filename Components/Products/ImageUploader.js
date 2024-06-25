import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../Style/ThemeColors";
import { FontAwesome6 } from "@expo/vector-icons";
import GeneralStyle from "../../Style/General.style";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function ImageUploader({ width, height, images, setImages }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newUris = result.assets.map((asset) => asset.uri);
      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...newUris];
        console.log(updatedImages); // Log the updated images array here
        return updatedImages.slice(0, 10); // Only keep up to 10 images
      });

      if (images.length + newUris.length > 10) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "You can Only Add 10 Images Per-Product!!!",
        });
      } else {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: `${newUris.length} Image(s) Added Successfully`,
        });
      }
    }
  };

  // Use useEffect to log the images array whenever it changes
  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <View style={{ width: "100%", height: "auto", alignItems: "center" }}>
      {/* title */}
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{
          justifyContent: "center",
          paddingHorizontal: "15%",
        }}
      >
        <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
          Upload Photo(s)
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.white,
            elevation: 5,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            padding: 25,
            marginTop: 5,
          }}
          onPress={pickImage}
        >
          <FontAwesome6 name="add" size={24} color={Colors.black} />
        </TouchableOpacity>
      </ScrollView>
      {images.length > 0 && (
        <ScrollView
          style={{
            width: width,
            maxHeight: 350,
            marginTop: 5,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {images.map((uri, index) => (
              <View
                key={index}
                style={{
                  width: "33%",
                  height: 112,
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
                    height: "100%",
                  }}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
