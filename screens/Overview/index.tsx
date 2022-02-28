import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../components/Title";
import Balance from "../../features/Balance";
import ListFriends from "../../features/ListFriends";
import { burstTransactions, sumTransactions } from "../../helpers";
import { RootState } from "../../redux/store";
import { getBills } from "../AddExpense/actions";
import { RootStackParamsList } from "../types/Navigation";

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
      <ListFriends friends={peers} />
    </View>
  );
}
