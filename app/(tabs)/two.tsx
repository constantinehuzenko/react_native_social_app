import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "../../components/Themed";
import UserProfile from "../../components/UserProfile";

export default function MyProfileTab() {
  return (
    <View style={styles.container}>
      <Text>
        <UserProfile profileType="my-profile" />;
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
