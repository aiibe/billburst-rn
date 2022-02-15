import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import { groupTransactions } from "../../helpers";
import { RootState } from "../../redux/store";
import { ISingleTransaction } from "../../redux/types/transaction";
import { RootStackParamsList } from "../types/Navigation";

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

const Transaction = ({
  lender,
  lendee,
  paid,
  date,
  description,
}: ISingleTransaction) => {
  // [!] Date is transformed at render => optimize with useMemo or use useCallback?

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
            {/* Description */}
            <Text style={{ fontFamily: Font.bold, fontSize: 16 }}>
              {description}
            </Text>

            {/* Transaction */}
            <Text style={{ fontFamily: Font.regular, fontSize: 16 }}>
              <Text style={{ fontFamily: Font.bold }}>{lender}</Text>
              {` paid `}
              <Text style={{ fontFamily: Font.bold }}>{lendee}</Text>
            </Text>
          </View>

          {/* Date */}
          <Text
            style={{
              fontFamily: Font.regular,
              fontSize: 14,
            }}
          >
            {new Date(JSON.parse(date)).toLocaleDateString()}
          </Text>
        </View>

        <View>
          {/* Amount */}
          <Text
            style={{
              fontFamily: Font.bold,
              fontSize: 16,
              color: lender !== "You" ? Color.dangerous : Color.primary,
            }}
          >{`$${paid}`}</Text>
        </View>
      </View>
    </View>
  );
};
