import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { groupTransactions } from "../../helpers";
import { RootState } from "../../redux/store";
import { RootStackParamsList } from "../types/Navigation";
import Transaction from "./Transaction";

export default function Friend({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamsList, "Friend">) {
  const { name } = route.params;
  const { transactions } = useSelector((state: RootState) => state);
  const groups = groupTransactions(transactions);
  const withFriend = groups.filter(
    ({ lendee, lender }) => lender === name || lendee === name
  );

  useEffect(() => {
    // Set screen title
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        paddingHorizontal: 20,
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        <View style={{ height: 20 }} />
        {withFriend.map((transaction, i) => (
          <Transaction key={i} {...transaction} />
        ))}
      </ScrollView>
    </View>
  );
}
