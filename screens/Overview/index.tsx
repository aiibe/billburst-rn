import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Title from "../../components/Title";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import { groupTransactions, sumTransactions } from "../../helpers";
import { RootState } from "../../redux/store";
import { RootStackParamsList } from "../types/Navigation";
import FriendList from "./FriendList";

export default function Overview({
  navigation: { navigate },
}: NativeStackScreenProps<RootStackParamsList, "Overview">) {
  const { transactions } = useSelector((state: RootState) => state);
  const groups = groupTransactions(transactions);
  const summary = sumTransactions(groups);

  // Get total amount owe/lend for current user 'You'
  const totalOweAmount = summary.reduce((total, t) => (total += t[1]), 0);
  const isOwe = totalOweAmount < 0;
  const totalOweAmountAbs = Math.abs(totalOweAmount);

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
          backgroundColor: isOwe ? Color.dangerousLight : Color.warningLight,
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
            color: isOwe ? Color.dangerous : Color.primary,
          }}
        >
          {`You ${isOwe ? "owe" : "lend"} $${totalOweAmountAbs}`}
        </Text>
      </View>

      <FriendList transactions={summary} />
    </View>
  );
}
