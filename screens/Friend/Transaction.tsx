import { Text, View } from "react-native";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import { dissectTransaction } from "../../helpers";
import { ITransaction, IUser } from "../../redux/types/transactions";

interface ITransactionProps {
  data: ITransaction;
  currentUser: IUser | null;
}

export default function Transaction({ data, currentUser }: ITransactionProps) {
  // [!] Date is transformed at render => optimize with useMemo or use useCallback?

  const {
    description,
    equalSplit,
    lender,
    lendees,
    amount,
    updated_at,
    details,
  } = dissectTransaction(data);

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
              <Text style={{ fontFamily: Font.bold }}>{lender.username}</Text>
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
            {new Date(updated_at).toLocaleDateString()}
          </Text>
        </View>

        <View>
          {/* Amount */}
          <Text
            style={{
              fontFamily: Font.bold,
              fontSize: 16,
              color: lender !== currentUser ? Color.dangerous : Color.primary,
            }}
          >{`$${owed}`}</Text>
        </View>
      </View>
    </View>
  );
}
