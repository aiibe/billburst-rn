import { Text, View } from "react-native";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import { ITransaction } from "../../redux/types/transaction";

export default function Transaction({
  lender,
  lendees,
  amount,
  date,
  description,
  equalSplit,
}: ITransaction) {
  // [!] Date is transformed at render => optimize with useMemo or use useCallback?

  const owed = equalSplit ? amount / lendees.length + 1 : amount;
  const totalOwed = lender === "You" ? amount : owed;

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
          {/* Description */}
          <Text style={{ fontFamily: Font.bold, fontSize: 18 }}>
            {description}
          </Text>

          {/* Transaction */}
          <Text style={{ fontFamily: Font.regular, fontSize: 16 }}>
            <Text style={{ fontFamily: Font.bold }}>{lender}</Text>
            {` paid `}
            <Text style={{ fontFamily: Font.bold }}>${amount}</Text>
          </Text>

          {/* lendees */}
          <View style={{ marginBottom: 5 }}>
            {lendees.map((lendee) => (
              <Text key={lendee}>{`-- ${lendee} owed $${owed}`}</Text>
            ))}
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
          >{`$${totalOwed}`}</Text>
        </View>
      </View>
    </View>
  );
}
