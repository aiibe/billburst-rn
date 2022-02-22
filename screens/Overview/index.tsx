import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../components/Title";
import { burstTransactions, sumTransactions } from "../../helpers";
import { updateExpanded } from "../../redux/reducers/transactions";
import { RootState } from "../../redux/store";
import supabase from "../../supabase";
import { RootStackParamsList } from "../types/Navigation";
import Balance from "./Balance";
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

  const peers: [string, number][] = !expanded.length
    ? []
    : sumTransactions(
        expanded.filter(({ lender, lendee }) =>
          [lender, lendee].includes("You")
        )
      );

  // REMOVE
  const handleTest = async () => {
    const { data, error } = await supabase.rpc("handle_new_bill", {
      _amount: 66.3,
      _description: "From RPC",
      _publisher: "e5755cf4-0efb-493d-8828-06be5947951d",
      _equalSplit: true,
    });

    console.log(error || data);
  };

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

      <TouchableOpacity
        onPress={handleTest}
        style={{
          backgroundColor: "yellow",
          paddingVertical: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Test button
        </Text>
      </TouchableOpacity>

      {/* List of friends with total amount you owe/lent each */}
      <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {peers.map((transaction, idx) => (
          <Peer key={idx} transaction={transaction} />
        ))}
      </ScrollView>
    </View>
  );
}
