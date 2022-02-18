import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { RootStackParamsList } from "../types/Navigation";
import Transaction from "./Transaction";

export default function Friend({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamsList, "Friend">) {
  const { name } = route.params;
  const { transactions } = useSelector((state: RootState) => state);

  // Filter transactions included 'You' and current peer
  // Sort descending
  const withFriend = transactions
    .filter(
      ({ lendees, lender }) =>
        lender === name || (lendees.includes(name) && lender === "You")
    )
    .sort(
      (a, b) =>
        new Date(JSON.parse(b.date)).getTime() -
        new Date(JSON.parse(a.date)).getTime()
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
          <Transaction key={i} data={transaction} />
        ))}
      </ScrollView>
    </View>
  );
}
