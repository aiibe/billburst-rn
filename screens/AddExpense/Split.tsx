import { View, Text, Pressable } from "react-native";
import Color from "../../enum/Color";
import Font from "../../enum/Font";

interface ISplitProps {
  selected: boolean;
  onChange: (value: boolean) => void;
}

const splitOptions = [
  { key: "Evenly", value: true },
  { key: "Fully", value: false },
];

export default function Split({ selected, onChange }: ISplitProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {splitOptions.map(({ key, value }) => (
        <Pressable
          key={key}
          onPress={() => onChange(value)}
          style={{
            flex: 1,
            backgroundColor:
              value === selected ? Color.primary : Color.grayLight,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 10,
            marginRight: 10,
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: value === selected ? "white" : "black",
              fontFamily: Font.bold,
              textAlign: "center",
            }}
          >
            {key}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
