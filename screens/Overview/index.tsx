import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../components/Title";
import { burstTransactions, sumTransactions } from "../../helpers";
import {
  setTransactions,
  updateExpanded,
} from "../../redux/reducers/transactions";
import { RootState } from "../../redux/store";
import { ITransaction } from "../../redux/types/transactions";
import { getBills } from "../../services/db/bills";
import { RootStackParamsList } from "../types/Navigation";
import Balance from "./Balance";
import Peer from "./Peer";

export default function Overview({
  navigation: { navigate },
}: NativeStackScreenProps<RootStackParamsList, "Overview">) {
  const {
    transactions: { raw, expanded },
    user: { currentUser },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  // Load data
  useEffect(() => {
    dispatch(getBills());
  }, []);

  useEffect(() => {
    // Updated expanded transactions everytime raw transactions updated
    dispatch(updateExpanded(burstTransactions(raw)));
  }, [raw]);

  const peers: [string, number][] =
    !expanded.length || !currentUser
      ? []
      : sumTransactions(expanded, currentUser.id);

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

      {/* Your balance with total amount owe/lent */}
      <Balance transactions={peers} />

      {/* List of friends with total amount you owe/lent each */}
      <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {peers.map((transaction, idx) => (
          <Peer key={idx} transaction={transaction} />
        ))}
      </ScrollView>
    </View>
  );
}
