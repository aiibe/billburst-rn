import { Text, View } from "react-native";
import Color from "../../enum/Color";
import Font from "../../enum/Font";

interface IBalanceProps {
  transactions: [string, number][];
}

export default function Balance({ transactions }: IBalanceProps) {
  const totalOweAmount = transactions.reduce((total, t) => (total += t[1]), 0),
    totalOweAmountAbs = Math.round(Math.abs(totalOweAmount) * 100) / 100,
    isOwe = totalOweAmount < 0,
    total =
      totalOweAmount === 0
        ? `$${totalOweAmountAbs}`
        : `You ${isOwe ? "owe" : "lent"} $${totalOweAmountAbs}`;

  return (
    <View
      style={{
        backgroundColor: isOwe ? Color.dangerousLight : Color.warningLight,
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
          color: isOwe ? Color.dangerous : Color.primary,
        }}
      >
        {total}
      </Text>
    </View>
  );
}
