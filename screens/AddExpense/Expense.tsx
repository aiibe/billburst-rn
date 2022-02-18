import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import { setNewTransaction } from "../../redux/reducers/transaction";
import Friends from "./Friends";

interface IExpenseProps {
  goBack: () => void;
}

const splitOptions = [
  { key: "Evenly", value: true },
  { key: "Fully", value: false },
];

export default function Expense({ goBack }: IExpenseProps) {
  const [users, setUsers] = useState(["You"]);
  const [whoPay, setWhoPay] = useState("You");
  const [whatFor, setWhatFor] = useState("");
  const [equalSplit, setEqualSplit] = useState(true);
  const [howMuch, setHowMuch] = useState(""); // [1] Must be number type.
  const dispatch = useDispatch();

  // [1] Check `howMuch` type. Must parse it to number.
  const validForm: () => boolean = () => {
    if (whatFor.length && howMuch.length && whoPay.length) {
      if (!isNaN(parseFloat(howMuch))) return true;
    }
    return false;
  };

  // Submit the form
  const submitForm: () => void = () => {
    // [!] User's region uses comma or dot ?
    const howMuchParsed = parseFloat(howMuch.replace(/,/g, "."));
    const lendees: string[] = users.filter((name) => name !== whoPay);

    // [!] missing equalSplit ?
    dispatch(
      setNewTransaction({
        lender: whoPay,
        lendees,
        amount: howMuchParsed,
        date: JSON.stringify(new Date()),
        description: whatFor,
        equalSplit,
      })
    );

    goBack();
  };

  return (
    <View style={{ marginTop: 10 }}>
      <View style={{ marginBottom: 20 }}>
        <Label title="Who pays ?" />

        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Friends
            addUser={(name) => setUsers((users) => [...users, name])}
            users={users}
            selected={whoPay}
            changeUser={(name) => setWhoPay(name)}
          />
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Label title="What for ?" />
        <TextInput
          value={whatFor}
          onChangeText={setWhatFor}
          style={{
            borderWidth: 1,
            borderColor: Color.darkLight,
            borderRadius: 10,
            height: 45,
            paddingHorizontal: 10,
            fontFamily: Font.bold,
            fontSize: 18,
          }}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Label title="How much ?" />
        <TextInput
          value={howMuch}
          keyboardType="decimal-pad"
          onChangeText={setHowMuch}
          style={{
            borderWidth: 1,
            borderColor: Color.darkLight,
            borderRadius: 10,
            height: 45,
            paddingHorizontal: 10,
            fontFamily: Font.bold,
            fontSize: 18,
          }}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Label title="How to split ?" />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {splitOptions.map(({ key, value }) => (
            <Pressable
              key={key}
              onPress={() => setEqualSplit(value)}
              style={{
                flex: 1,
                backgroundColor:
                  value === equalSplit ? Color.primary : Color.grayLight,
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
                  color: value === equalSplit ? "white" : "black",
                  fontFamily: Font.bold,
                  textAlign: "center",
                }}
              >
                {key}
              </Text>
            </Pressable>
          ))}
        </View>
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
      <Text style={{ fontSize: 16, fontFamily: Font.bold }}>{title}</Text>
    </View>
  );
};
