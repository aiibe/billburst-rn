import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/types/transactions";
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

  // Filter transactions included 'You' and current peer
  // Sort descending
  const userInLendees = (lendees: IUser[], username: string | undefined) => {
    const members = new Set();
    lendees.forEach((user) => members.add(user.username));
    return members.has(username);
  };

  const withFriend = raw
    .filter(
      ({ lendees, lender }) =>
        lender.username === name ||
        (userInLendees(lendees, name) &&
          lender.username === currentUser?.username)
    )
    .sort(
      (a, b) =>
        new Date(JSON.parse(b.updated_at)).getTime() -
        new Date(JSON.parse(a.updated_at)).getTime()
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
          <Transaction key={i} data={transaction} currentUser={currentUser} />
        ))}
      </ScrollView>
    </View>
  );
}
