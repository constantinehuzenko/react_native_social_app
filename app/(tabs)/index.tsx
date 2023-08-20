import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useUsers } from "../../hooks/useUsers.hook";
import { Spinner } from "../../components/Spinner";
import { UsersList } from "../../components/UsersList";

export default function DiscoverTab() {
  const { usersData, usersState } = useUsers();

  if (usersState === "loading") {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <UsersList users={usersData?.users} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
