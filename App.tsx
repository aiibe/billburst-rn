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
  const [users, setUsers] = useState([{ name: "You" }, { name: "Sarah" }]);
  const [whoPay, setWhoPay] = useState("You");
  const [whatFor, setWhatFor] = useState("");
  const [howMuch, setHowMuch] = useState(""); // [1] Must be number type.
  const [fontLoad] = useFonts({ Nunito_700Bold, Nunito_400Regular });

  // Wait for fonts to loaded
  if (!fontLoad) return <AppLoading />;

  // [1] Check `howMuch` type. Must parse it to number.
  const validForm: () => boolean = () => {
    if (whatFor.length && howMuch.length && whoPay.length) {
      if (!isNaN(parseFloat(howMuch))) return true;
    }
    return false;
  };

  // Submit the form
  const submitForm: () => void = () => {
    const howMuchParsed = parseFloat(howMuch); // safe via validForm check
    console.log(whoPay, "paid", howMuchParsed, "for", whatFor);
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <View>
            {/* Screen Title */}
            <Title name="Add expense">
              <Text style={{ fontSize: 18, fontFamily: Font.regular }}>
                For {}
                <Text style={{ fontFamily: Font.bold }}>You</Text>
                {} and {}
                <Text style={{ fontFamily: Font.bold }}>Sarah</Text>
              </Text>
            </Title>

            {/* Form */}
            <View style={{ marginTop: 0 }}>
              <View style={{ marginBottom: 20 }}>
                <Label title="Who pays ?" />
                <Users
                  users={users}
                  selected={whoPay}
                  changeUser={(name) => setWhoPay(name)}
                />
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
                  keyboardType="decimal-pad"
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

          {/* Submit button */}
          <View style={{ marginBottom: 20 }}>
            <Pressable
              onPress={submitForm}
              disabled={!validForm()}
              style={({ pressed }) => [
                {
                  display: "flex",
                  alignItems: "center",
                  opacity: pressed ? 0.8 : 1,
                  backgroundColor: validForm()
                    ? Color.primary
                    : Color.darkLight,
                  borderRadius: 10,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  fontFamily: Font.bold,
                  paddingVertical: 12,
                }}
              >
                Done
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

// Label for input
const Label = ({ title }: { title: string }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontSize: 20, fontFamily: Font.bold }}>{title}</Text>
    </View>
  );
};

// User like tag
const Users = ({
  users,
  selected,
  changeUser,
}: {
  users: { name: string }[];
  selected: string;
  changeUser: (name: string) => void;
}) => {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      {users.map((user, idx) => (
        <Pressable
          key={idx}
          onPress={() => changeUser(user.name)}
          style={{
            backgroundColor:
              selected === user.name ? Color.primary : "transparent",
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 10,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: selected === user.name ? "white" : "black",
              fontFamily: Font.bold,
            }}
          >
            {user.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
