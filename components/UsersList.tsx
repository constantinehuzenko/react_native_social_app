import React from "react";
import { FlatList, StyleSheet, Image, Pressable } from "react-native";
import { Text, View } from "./Themed";
import { User } from "../hooks/useUsers.hook";
import { router } from "expo-router";

type UserCardPropsType = { user: User | undefined };
type UserListPropsType = { users: User[] | undefined };

const UserCard = ({ user }: UserCardPropsType) => {
  return (
    <>
      <Pressable
        style={styles.card}
        onPress={() => {
          router.push({
            pathname: `/user-profile/${user?.id || "1"}`,
          });
        }}
      >
        <Image source={{ uri: user?.image }} style={styles.profilePicture} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.firstName}</Text>
          <Text style={styles.userBio}>{user?.university}</Text>
        </View>
      </Pressable>
    </>
  );
};

export const UsersList = ({ users }: UserListPropsType) => {
  return (
    <FlatList
      data={users}
      keyExtractor={(user) => user.id.toString()}
      renderItem={({ item }) => <UserCard user={item} />}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderColor: "#e0e0e049",
    borderWidth: 1,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userBio: {
    fontSize: 14,
    color: "#888",
  },
});
