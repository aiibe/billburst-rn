import { Text, TouchableOpacity } from "react-native";

interface ITestButtonProps {
  onPress: () => void;
}

export default function TestButton({ onPress }: ITestButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "yellow",
        paddingVertical: 20,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Test button
      </Text>
    </TouchableOpacity>
  );
}
