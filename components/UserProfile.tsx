import React, { useState } from "react";
import {
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Root, useUsers } from "../hooks/useUsers.hook";
import { Spinner } from "./Spinner";
import { useSearchParams } from "expo-router";
import { Photos } from "../constants/Photos";
import { PhotoItem } from "./PhotoItem";
import * as ImagePicker from "expo-image-picker";
import { View } from "./Themed";

type UserProfilePropsType = {
  profileType: "my-profile" | "user-profile";
};

const UserProfile = ({ profileType }: UserProfilePropsType) => {
  const { usersData, profileData, usersState } = useUsers();
  const { id } = useSearchParams();

  const profile = {
    "my-profile": profileData,
    "user-profile": getUser(id?.[0], usersData),
  }[profileType];

  const [images, setImages] = useState(Photos);

  const addNewImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync();
    setImages((prev) => [_image?.assets?.[0]?.uri || "", ...prev]);
  };

  if (usersState === "loading") {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({ item }) => <PhotoItem uri={item} />}
        keyExtractor={(item) => item}
        numColumns={3}
        contentContainerStyle={styles.imageGrid}
        ListHeaderComponent={
          <View style={styles.bioContainer}>
            <Image
              source={{ uri: profile?.image }}
              style={styles.profilePicture}
            />
            <Text style={styles.userName}>
              {profile?.firstName} {profile?.lastName}
            </Text>
            <Text style={styles.userBio}>{profile?.university}</Text>
            {profileType === "my-profile" && (
              <TouchableOpacity style={styles.addButton} onPress={addNewImage}>
                <Text style={styles.addButtonLabel}>Add New Image</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </View>
  );
};

const getUser = (id: string, data: Root | undefined) =>
  data?.users?.filter((user) => String(user?.id) === id)?.[0];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bioContainer: {
    margin: 16,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  userBio: {
    fontSize: 18,
    color: "#888",
    marginBottom: 16,
  },
  imageGrid: {
    alignItems: "flex-start",
    paddingBottom: 100
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserProfile;
