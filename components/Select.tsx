import { Pressable, Text, View } from "react-native";
import Color from "../enum/Color";
import Font from "../enum/Font";

interface ISelectProps {
  selected: boolean;
  onChange: (value: boolean) => void;
  options: { key: string; value: any }[];
}

export default function Select({ selected, onChange, options }: ISelectProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {options.map(({ key, value }) => (
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
