import {
  Nunito_400Regular,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Title from "./components/Title";
import Color from "./enum/Color";
import Font from "./enum/Font";

export default function App() {
  const [users, setUsers] = useState([{ name: "Sarah" }]);
  const [whatFor, setWhatFor] = useState("");
  const [howMuch, setHowMuch] = useState(""); // [1] Must be number type.
  const [fontLoad] = useFonts({ Nunito_700Bold, Nunito_400Regular });

  // Wait for fonts to loaded
  if (!fontLoad) return <AppLoading />;

  // Submit the form
  // [1] Check `howMuch` type. Must be number.

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ paddingHorizontal: 20 }}>
          <Title name="Add expense">
            <Text style={{ fontSize: 18, fontFamily: Font.regular }}>
              For {}
              <Text style={{ fontFamily: Font.bold }}>You</Text>
              {} and {}
              <Text style={{ fontFamily: Font.bold }}>Sarah</Text>
            </Text>
          </Title>

          <View style={{ marginTop: 0 }}>
            <View style={{ marginBottom: 20 }}>
              <Label title="Who pays ?" />
              <Users users={users} />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Label title="What for ?" />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: Color.darkLight,
                  borderRadius: 10,
                  height: 45,
                  paddingHorizontal: 10,
                  fontFamily: Font.bold,
                  fontSize: 18,
                }}
                value={whatFor}
                onChangeText={setWhatFor}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Label title="How much ?" />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: Color.darkLight,
                  borderRadius: 10,
                  height: 45,
                  paddingHorizontal: 10,
                  fontFamily: Font.bold,
                  fontSize: 18,
                }}
                value={howMuch}
                keyboardType="number-pad"
                onChangeText={setHowMuch}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <TouchableOpacity>
                <Label title="Today" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const Label = ({ title }: { title: string }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontSize: 20, fontFamily: Font.bold }}>{title}</Text>
    </View>
  );
};

const Users = ({ users }: { users?: { name: string }[] }) => {
  const [whoPay, setWhoPay] = useState("You");

  const defaultUsers = users?.length
    ? [{ name: "You" }, ...users]
    : [{ name: "You" }];

  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      {defaultUsers.map((user, idx) => (
        <User
          key={idx}
          user={user}
          selected={whoPay}
          changeUser={(name) => setWhoPay(name)}
        />
      ))}
    </View>
  );
};

const User = ({
  user,
  selected,
  changeUser,
}: {
  user: { name: string };
  selected: string;
  changeUser: (name: string) => void;
}) => {
  const { name } = user;
  return (
    <Pressable
      onPress={() => changeUser(name)}
      style={{
        backgroundColor: selected === name ? Color.primary : "transparent",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        marginRight: 10,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          color: selected === name ? "white" : "black",
          fontFamily: Font.bold,
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};
