import { Text, View } from "react-native";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import { ISingleTransaction } from "../../redux/types/transaction";

export default function Transaction({
  lender,
  lendee,
  paid,
  date,
  description,
}: ISingleTransaction) {
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
}
