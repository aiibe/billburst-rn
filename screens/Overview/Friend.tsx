import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import { IGroupTransaction } from "../../helpers";
import { RootStackParamsList } from "../types/Navigation";

interface IFriendProps {
  transaction: IGroupTransaction;
}

interface IOverviewScreenProps
  extends NativeStackNavigationProp<RootStackParamsList, "Overview"> {}

const Friend = ({ transaction }: IFriendProps) => {
  const { navigate } = useNavigation<IOverviewScreenProps>();
  const friend = transaction[0];
  const amount = transaction[1];

  return (
    <Pressable
      onPress={() => navigate("Friend", { name: friend })}
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
        <Text style={{ fontFamily: Font.bold, fontSize: 18 }}>{friend}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              fontFamily: Font.bold,
              fontSize: 16,
              color: amount < 0 ? Color.dangerous : Color.primary,
            }}
          >
            {"$" + Math.abs(amount)}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              fontFamily: Font.bold,
              fontSize: 20,
            }}
          >
            {">"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Friend;
