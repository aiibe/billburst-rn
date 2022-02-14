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
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
