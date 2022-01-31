import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, Text, View } from "react-native";
import Title from "../components/Title";
import Color from "../enum/Color";
import Font from "../enum/Font";
import { RootStackParamsList } from "./types/Navigation";

type OverviewScreenProps = NativeStackNavigationProp<
  RootStackParamsList,
  "Overview"
>;

export default function Overview() {
  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        paddingHorizontal: 20,
        backgroundColor: "white",
      }}
    >
      <Title name="Overview" />
      <View
        style={{
          backgroundColor: Color.dangerousLight,
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontFamily: Font.regular, fontSize: 18 }}>
          Total balance
        </Text>
        <Text
          style={{
            fontFamily: Font.bold,
            fontSize: 22,
            color: Color.dangerous,
          }}
        >
          You owe $1,659
        </Text>
      </View>

      <FriendList />
    </View>
  );
}

const FriendList = () => {
  return (
    <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      {/* Hardcoded for ScrollView test */}
      {[...Array(10)].map((friend, idx) => (
        <Friend key={idx} />
      ))}
    </ScrollView>
  );
};

const Friend = () => {
  const { navigate } = useNavigation<OverviewScreenProps>();
  return (
    <Pressable
      onPress={() => navigate("Friend")}
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
        <Text style={{ fontFamily: Font.bold, fontSize: 18 }}>Jean</Text>
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
              color: Color.dangerous,
            }}
          >
            $23
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
