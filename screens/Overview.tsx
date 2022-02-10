import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Title from "../components/Title";
import Color from "../enum/Color";
import Font from "../enum/Font";
import { groupTransactions, IGroupTransaction } from "../helpers";
import { RootState } from "../redux/store";
import { RootStackParamsList } from "./types/Navigation";

interface IOverviewScreenProps
  extends NativeStackNavigationProp<RootStackParamsList, "Overview"> {}

interface IFriendListProps {
  transactions: IGroupTransaction[];
}

interface IFriendProps {
  transaction: IGroupTransaction;
}

export default function Overview() {
  const { transactions } = useSelector((state: RootState) => state);
  const groups = groupTransactions(transactions);
  const oweAmount = groups.reduce(
    (total, transaction) => (total += transaction[1]),
    0
  );
  const oweAmountAbs = Math.abs(oweAmount);

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        paddingHorizontal: 20,
        backgroundColor: "white",
      }}
    >
      <Title name="Overview" />
      <View
        style={{
          backgroundColor:
            oweAmount < 0 ? Color.dangerousLight : Color.warningLight,
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontFamily: Font.regular, fontSize: 18 }}>
          Total balance
        </Text>
        <Text
          style={{
            fontFamily: Font.bold,
            fontSize: 22,
            color: oweAmount < 0 ? Color.dangerous : Color.primary,
          }}
        >
          {oweAmount < 0
            ? `You owe $${oweAmountAbs}`
            : `You lend $${oweAmountAbs}`}
        </Text>
      </View>

      <FriendList transactions={groups} />
    </View>
  );
}

const FriendList = ({ transactions }: IFriendListProps) => {
  return (
    <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      {transactions.map((transaction, idx) => (
        <Friend key={idx} transaction={transaction} />
      ))}
    </ScrollView>
  );
};

const Friend = ({ transaction }: IFriendProps) => {
  const navigation = useNavigation<IOverviewScreenProps>();
  const friend = transaction[0];
  const amount = transaction[1];

  return (
    <Pressable
      onPress={() => navigation.navigate("Friend")}
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
        <Text style={{ fontFamily: Font.bold, fontSize: 18 }}>{friend}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              fontFamily: Font.bold,
              fontSize: 16,
              color: amount < 0 ? Color.dangerous : Color.primary,
            }}
          >
            {"$" + Math.abs(amount)}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              fontFamily: Font.bold,
              fontSize: 20,
            }}
          >
            {">"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
