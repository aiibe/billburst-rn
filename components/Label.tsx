import { View, Text } from "react-native";
import Font from "../enum/Font";

export default function Label({ title }: { title: string }) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontSize: 16, fontFamily: Font.bold }}>{title}</Text>
    </View>
  );
}
