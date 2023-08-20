import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { useState } from "react";
import { Pressable, View, Image, Dimensions, StyleSheet, Text } from "react-native";

export const PhotoItem = ({ uri }: { uri: string }) => {
  const [activeLike, setActiveLike] = useState<boolean>(false);
  const likeHandler = () => setActiveLike((prev) => !prev);

  return (
    <View style={styles.imageContainer}>
      <Pressable onPress={likeHandler} style={styles.likeContainer}>
        <Text>
          <FontAwesome
            color={activeLike ? "#ff0000" : "#ffffff69"}
            name="heart"
            size={20}
          />
        </Text>
      </Pressable>
      <Image source={{ uri }} style={styles.imageItem} />
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const imageWidth = windowWidth / 3 - 16;

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
  },
  likeContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
    zIndex: 100,
  },
  imageItem: {
    width: imageWidth,
    height: imageWidth,
    margin: 8,
  },
});
