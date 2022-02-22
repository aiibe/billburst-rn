import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import Label from "../../components/Label";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import { setNewTransaction } from "../../redux/reducers/transactions";
import { RootStackParamsList } from "../types/Navigation";
import Peers from "./Peers";
import Split from "./Split";

export default function AddExpense({
  navigation: { goBack },
}: NativeStackScreenProps<RootStackParamsList, "AddExpense">) {
  const [peers, setPeers] = useState(["You"]);
  const [whoPay, setWhoPay] = useState("You");
  const [whatFor, setWhatFor] = useState("");
  const [equalSplit, setEqualSplit] = useState(true);
  const [howMuch, setHowMuch] = useState("");
  const dispatch = useDispatch();

  const validForm: () => boolean = () => {
    if (whatFor.length && !isNaN(parseFloat(howMuch)) && whoPay.length)
      return parseFloat(howMuch) > 0;
    return false;
  };

  // Submit the form
  const submitForm: () => void = () => {
    // [!] User's region uses comma or dot ?
    const howMuchParsed = parseFloat(howMuch.replace(/,/g, "."));
    const lendees: string[] = peers.filter((name) => name !== whoPay);

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          display: "flex",
          height: "100%",
          paddingHorizontal: 20,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            marginTop: 10,
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <View>
            {/* Who pay */}
            <View style={{ marginBottom: 20 }}>
              <Label title="Who pays ?" />
              <Peers
                peers={peers}
                lender={whoPay}
                setLender={(name) => setWhoPay(name)}
                addPeer={(name) => setPeers((peers) => [...peers, name])}
              />
            </View>

            {/* What for */}
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

            {/* How much */}
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

            {/* How to split */}
            <View style={{ marginBottom: 20 }}>
              <Label title="How to split ?" />
              <Split
                onChange={(value) => setEqualSplit(value)}
                selected={equalSplit}
              />
            </View>
          </View>

          {/* Submit button */}
          <View style={{ marginVertical: 20 }}>
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
      </View>
    </TouchableWithoutFeedback>
  );
}
