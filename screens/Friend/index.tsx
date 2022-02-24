import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { friendTransactions } from "../../helpers";
import { RootState } from "../../redux/store";
import { RootStackParamsList } from "../types/Navigation";
import Transaction from "./Transaction";

export default function Friend({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamsList, "Friend">) {
  const { name } = route.params;
  const {
    transactions: { raw },
    user: { currentUser },
  } = useSelector((state: RootState) => state);

  // Filter transactions
  const withFriend = friendTransactions(raw, name, currentUser);

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
          <Transaction key={i} data={transaction} currentUser={currentUser} />
        ))}
      </ScrollView>
    </View>
  );
}
