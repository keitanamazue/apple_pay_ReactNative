import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import useRevenueCat from "../hooks/useRevenueCat";
import { Ionicons } from "@expo/vector-icons";

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  title: string;
  screen: any;
  color: string;
  requiresPro?: boolean;
  icon?: any;
  vertical?: boolean;
};

const ActionRow = ({
  title,
  screen,
  color,
  requiresPro,
  icon,
  vertical,
}: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const { currentOffering, customerInfo, isProMember } = useRevenueCat();

  const lockedForProMembers = requiresPro && !isProMember;

  return (
    <TouchableOpacity
      onPress={() =>
        lockedForProMembers
          ? navigation.navigate("Paywall")
          : navigation.navigate(screen)
      }
      className={`flex flex-1 m-2 justify-center items-center shadow-md rounded-lg py-6 space-x-2 ${
        lockedForProMembers ? "opacity-50" : ""
      } ${vertical ? "flex-col" : "flex-row"}`}
      style={{ backgroundColor: lockedForProMembers ? "gray" : color }}
    >
      {lockedForProMembers && (
        <View className="absolute top-4 right-4 rotate-12 items-center">
          <Ionicons name="lock-closed" size={20} color="white" />
          <Text className="text-white font-extrabold">PRO</Text>
        </View>
      )}
      <Ionicons name={icon} size={30} color="white" />
      <Text className="text-white font-bold text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default ActionRow;
