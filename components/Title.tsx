import { View, Text } from "react-native";

const Title = ({
  name,
  children,
}: {
  name: string;
  children?: React.ReactNode;
}) => {
  return (
    <View
      style={{
        marginVertical: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "Nunito_700Bold",
          fontSize: 28,
        }}
      >
        {name}
      </Text>
      {children}
    </View>
  );
};

export default Title;
