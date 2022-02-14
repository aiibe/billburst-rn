import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import { RootState } from "../../redux/store";
import Friends from "./Friends";

export default function Expense() {
  const { users } = useSelector((state: RootState) => state.expense);
  const [whoPay, setWhoPay] = useState("You");
  const [whatFor, setWhatFor] = useState("");
  const [howMuch, setHowMuch] = useState(""); // [1] Must be number type.

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
    <View style={{ marginTop: 10 }}>
      <View style={{ marginBottom: 20 }}>
        <Label title="Who pays ?" />

        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Friends
            users={users}
            selected={whoPay}
            changeUser={(name) => setWhoPay(name)}
          />
        </View>
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

      {/* <View style={{ marginBottom: 20 }}>
      <TouchableOpacity>
        <Label title="Today" />
      </TouchableOpacity>
    </View> */}

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
              backgroundColor: validForm() ? Color.primary : Color.darkLight,
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
