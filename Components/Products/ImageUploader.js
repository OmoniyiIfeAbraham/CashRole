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
  const [showClearBtn, setShowClearBtn] = useState(false);

  useEffect(() => {
    // Show clear button only if all images are strings (old images)
    const isAllString = images.every((img) => typeof img === "string");
    setShowClearBtn(isAllString);
  }, [images]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newUris = result.assets.map((asset) => asset);
      setImages((prevImages) => {
        const updated = [...prevImages, ...newUris];
        return updated.slice(0, 10);
      });
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const clearAllImages = () => {
    setImages([]);
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <Text
        style={[
          GeneralStyle.BoldText,
          { marginBottom: 10, color: Colors.black },
        ]}
      >
        Upload Product Images
      </Text>

      {showClearBtn && (
        <TouchableOpacity
          onPress={clearAllImages}
          style={{
            marginBottom: 10,
            backgroundColor: Colors.tomato,
            padding: 8,
            borderRadius: 5,
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ color: "#fff" }}>Clear All Images</Text>
        </TouchableOpacity>
      )}

      {/* 👇 FIX: Give ScrollView and its container a fixed height */}
      <View style={{ height: 110, width: "100%" }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.scrollContainer}
        >
          {images.map((img, index) => {
            const isOld = typeof img === "string";
            const uri = isOld ? img : img.uri;

            return (
              <View key={index} style={styles.imageContainer}>
                <Image
                  source={{ uri }}
                  style={{ width: 100, height: 100, borderRadius: 5 }}
                />
                {!isOld && (
                  <TouchableOpacity
                    style={styles.removeIcon}
                    onPress={() => removeImage(index)}
                  >
                    <FontAwesome6 name="trash" size={16} color="white" />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>

      {(images.length === 0 ||
        (images.length < 10 &&
          !images.every((img) => typeof img === "string"))) && (
        <TouchableOpacity
          style={[GeneralStyle.Btn, { backgroundColor: Colors.midnightBlue }]}
          onPress={pickImage}
        >
          <Text style={GeneralStyle.BoldText}>Add Images</Text>
        </TouchableOpacity>
      )}

      {/* {images.length < 10 && (
        <TouchableOpacity
          style={[GeneralStyle.Btn, { backgroundColor: Colors.midnightBlue }]}
          onPress={pickImage}
        >
          <Text style={GeneralStyle.BoldText}>Add Images</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: "row", // ⬅️ Important for horizontal scroll
    alignItems: "center",
    paddingLeft: 5,
  },
  imageContainer: {
    marginRight: 10,
    position: "relative",
  },
  removeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 15,
    padding: 4,
  },
});

// export default function ImageUploader({ width, height, images, setImages }) {
//   console.log(images)
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const newUris = result.assets.map((asset) => asset);
//       setImages((prevImages) => {
//         const updatedImages = [...prevImages, ...newUris];
//         console.log(updatedImages); // Log the updated images array here
//         return updatedImages.slice(0, 10); // Only keep up to 10 images
//       });

//       if (images.length + newUris.length > 10) {
//         Toast.show({
//           type: ALERT_TYPE.WARNING,
//           title: "You can Only Add 10 Images Per-Product!!!",
//         });
//       } else {
//         Toast.show({
//           type: ALERT_TYPE.SUCCESS,
//           title: `${
//             images.length + newUris.length
//           } Image(s) Added Successfully`,
//         });
//       }
//     }
//   };

//   const removeImage = (indexToRemove) => {
//     setImages((prevImages) => {
//       const updatedImages = prevImages.filter(
//         (_, index) => index !== indexToRemove
//       );
//       return updatedImages;
//     });

//     Toast.show({
//       type: ALERT_TYPE.SUCCESS,
//       title: "Image Removed Successfully",
//     });
//   };

//   // Use useEffect to log the images array whenever it changes
//   useEffect(() => {
//     console.log(images);
//   }, [images]);

//   return (
//     <View
//       style={{
//         width: "100%",
//         height: "auto",
//         alignItems: "center",
//       }}
//     >
//       {/* title */}
//       <View
//         style={{
//           flex: 1,
//           width: "100%",
//           justifyContent: "center",
//           paddingHorizontal: "15%",
//         }}
//         contentContainerStyle={{
//           justifyContent: "center",
//           paddingHorizontal: "15%",
//         }}
//       >
//         <Text style={[GeneralStyle.RegularText, { color: Colors.black }]}>
//           Upload Photo(s)
//         </Text>
//         <TouchableOpacity
//           style={{
//             backgroundColor: Colors.white,
//             elevation: 5,
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: 10,
//             padding: 25,
//             marginTop: 5,
//           }}
//           onPress={pickImage}
//         >
//           <FontAwesome6 name="add" size={24} color={Colors.black} />
//         </TouchableOpacity>
//       </View>
//       {images.length > 0 && (
//         <View
//           style={{
//             width: width,
//             maxHeight: 350,
//             marginTop: 5,
//           }}
//           // showsVerticalScrollIndicator={false}
//         >
//           <View
//             style={{
//               width: "100%",
//               flexDirection: "row",
//               flexWrap: "wrap",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             {images.map((img, index) => (
//               <View
//                 key={index}
//                 style={{
//                   width: "32%",
//                   height: 75,
//                   justifyContent: "center",
//                   alignItems: "center",
//                   marginBottom: 5,
//                   position: "relative",
//                 }}
//               >
//                 <Image
//                   source={{ uri: img?.uri || img }}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: 5,
//                   }}
//                 />
//                 {/* Remove button */}
//                 <TouchableOpacity
//                   style={{
//                     position: "absolute",
//                     top: -5,
//                     right: -5,
//                     backgroundColor: Colors.red || "#FF0000",
//                     borderRadius: 12,
//                     width: 24,
//                     height: 24,
//                     justifyContent: "center",
//                     alignItems: "center",
//                     elevation: 3,
//                     shadowColor: "#000",
//                     shadowOffset: {
//                       width: 0,
//                       height: 2,
//                     },
//                     shadowOpacity: 0.25,
//                     shadowRadius: 3.84,
//                   }}
//                   onPress={() => removeImage(index)}
//                 >
//                   <FontAwesome6
//                     name="xmark"
//                     size={12}
//                     color={Colors.white || "#FFFFFF"}
//                   />
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   image: {
//     width: 200,
//     height: 200,
//     margin: 5,
//   },
// });
