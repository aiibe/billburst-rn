import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../components/Title";
import { burstTransactions, sumTransactions } from "../../helpers";
import { RootState } from "../../redux/store";
import { getBills } from "../AddExpense/actions";
import { RootStackParamsList } from "../types/Navigation";
import Balance from "./Balance";
import Peer from "./Peer";

export default function Overview({
  navigation: { navigate },
}: NativeStackScreenProps<RootStackParamsList, "Overview">) {
  const raw = useSelector((state: RootState) => state.transactions.raw);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  // Load data
  useEffect(() => {
    dispatch(getBills());
  }, [dispatch]);

  // Compute transactions on the fly
  const peers: [string, number][] =
    raw.length && currentUser
      ? sumTransactions(burstTransactions(raw), currentUser.id)
      : [];

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
