import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import { RootState } from "../../redux/store";
import { ITransaction } from "../../redux/types/transaction";
import { RootStackParamsList } from "../types/Navigation";

// !Screen title should be friend's name

export default function Friend({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamsList, "Friend">) {
  const { name } = route.params;
  const { transactions } = useSelector((state: RootState) => state);

  const userTransactions = transactions.filter(
    ({ lender, lendee }) =>
      (lender === name || lendee === name) &&
      (lender === "You" || lendee === "You")
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
        {userTransactions.map((transaction, i) => (
          <Transaction key={i} {...transaction} />
        ))}
      </ScrollView>
    </View>
  );
}

const Transaction = ({ lender, lendee, amount, date }: ITransaction) => {
  return (
    <View
      style={{
        backgroundColor: Color.grayLight,
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <View>
            <Text style={{ fontFamily: Font.regular, fontSize: 16 }}>
              <Text style={{ fontFamily: Font.bold }}>{lender}</Text>
              {` paid `}
              <Text style={{ fontFamily: Font.bold }}>{lendee}</Text>
            </Text>
          </View>
          <Text
            style={{
              fontFamily: Font.regular,
              fontSize: 14,
            }}
          >
            {new Date(JSON.parse(date)).toLocaleDateString()}
          </Text>
        </View>
        <Text
          style={{ fontFamily: Font.bold, fontSize: 16 }}
        >{`$${amount}`}</Text>
      </View>
    </View>
  );
};
