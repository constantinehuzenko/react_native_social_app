import React from "react";
import UserProfile from "../../components/UserProfile";
import { Stack } from "expo-router";

export default function () {
  return (
    <>
      <Stack.Screen
        options={{ headerShown: true, headerTitle: "User Profile" }}
      />
      <UserProfile profileType="user-profile" />
    </>
  );
}
