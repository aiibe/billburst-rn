import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Pressable, Text, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../components/Title";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import { burstTransactions, sumTransactions } from "../../helpers";
import { updateExpanded } from "../../redux/reducers/transactions";
import { RootState } from "../../redux/store";
import { RootStackParamsList } from "../types/Navigation";
import Peer from "./Peer";

export default function Overview({
  navigation: { navigate },
}: NativeStackScreenProps<RootStackParamsList, "Overview">) {
  const {
    transactions: { raw, expanded },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    // Updated expanded transactions everytime raw transactions updated
    dispatch(updateExpanded(burstTransactions(raw)));
  }, [raw]);

  // Wait until updateExpanded finishes
  if (!expanded.length) return null;

  // Filter only transactions that included 'You'
  const myTransactions = expanded.filter(({ lender, lendee }) =>
    [lender, lendee].includes("You")
  );

  // Sums up amount owe/lent for each peer
  const peers = sumTransactions(myTransactions);

  // Get total amount owe/lend for 'You'
  const totalOweAmount = peers.reduce((total, t) => (total += t[1]), 0);
  const isOwe = totalOweAmount < 0;
  const totalOweAmountAbs = Math.round(Math.abs(totalOweAmount) * 100) / 100;

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
          {`You ${isOwe ? "owe" : "lent"} $${totalOweAmountAbs}`}
        </Text>
      </View>

      <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {peers.map((transaction, idx) => (
          <Peer key={idx} transaction={transaction} />
        ))}
      </ScrollView>
    </View>
  );
}
