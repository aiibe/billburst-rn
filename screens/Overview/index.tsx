import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Title from "../../components/Title";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import { groupTransactions } from "../../helpers";
import { RootState } from "../../redux/store";
import { RootStackParamsList } from "../types/Navigation";
import FriendList from "./FriendList";

export default function Overview({
  navigation: { navigate },
}: NativeStackScreenProps<RootStackParamsList, "Overview">) {
  const { transactions } = useSelector((state: RootState) => state);
  const groups = groupTransactions(transactions);
  const oweAmount = groups.reduce(
    (total, transaction) => (total += transaction[1]),
    0
  );
  const oweAmountAbs = Math.abs(oweAmount);

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "white",
      }}
    >
      <Title name="Overview">
        <Pressable onPress={() => navigate("Add expense")}>
          <Text>Add expense</Text>
        </Pressable>
      </Title>

      <View
        style={{
          backgroundColor:
            oweAmount < 0 ? Color.dangerousLight : Color.warningLight,
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontFamily: Font.regular, fontSize: 18 }}>
          Total balance
        </Text>
        <Text
          style={{
            fontFamily: Font.bold,
            fontSize: 22,
            color: oweAmount < 0 ? Color.dangerous : Color.primary,
          }}
        >
          {oweAmount < 0
            ? `You owe $${oweAmountAbs}`
            : `You lend $${oweAmountAbs}`}
        </Text>
      </View>

      <FriendList transactions={groups} />
    </View>
  );
}
