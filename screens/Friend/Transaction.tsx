import { Text, View } from "react-native";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import { dissectTransaction } from "../../helpers";
import { ITransaction } from "../../redux/types/transaction";

interface ITransactionProps {
  data: ITransaction;
}

export default function Transaction({ data }: ITransactionProps) {
  // [!] Date is transformed at render => optimize with useMemo or use useCallback?

  const { description, equalSplit, lender, lendees, amount, date, details } =
    dissectTransaction(data);

  const divisor = equalSplit ? lendees.length + 1 : lendees.length;
  const owed = Math.round((amount / divisor) * 100) / 100;

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
            {description}{" "}
            <Text style={{ fontFamily: Font.regular }}>
              ({equalSplit ? "evenly" : "fully"})
            </Text>
          </Text>

          {/* Transaction */}
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontFamily: Font.regular, fontSize: 16 }}>
              <Text style={{ fontFamily: Font.bold }}>{lender}</Text>
              {` paid `}
              <Text style={{ fontFamily: Font.bold }}>${amount}</Text>
            </Text>
          </View>

          {/* Sub transactions */}
          <View style={{ marginBottom: 10 }}>
            {details.map(({ name, amount }) => (
              <Text key={name}>{`${name} ${
                amount < 0 ? "owed" : "lent"
              } $${Math.abs(amount)}`}</Text>
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
          >{`$${owed}`}</Text>
        </View>
      </View>
    </View>
  );
}
