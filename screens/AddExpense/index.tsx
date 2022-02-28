import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Label from "../../components/Label";
import Select from "../../components/Select";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import Peers from "../../features/Peers";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/types/user";
import { RootStackParamsList } from "../types/Navigation";
import { addNewBill } from "./actions";

export default function AddExpense({
  navigation: { goBack },
}: NativeStackScreenProps<RootStackParamsList, "AddExpense">) {
  const {
    user: { currentUser },
  } = useSelector((state: RootState) => state);
  const [peers, setPeers] = useState<IUser[]>([]);
  const [whoPay, setWhoPay] = useState<IUser | null>(null);
  const [whatFor, setWhatFor] = useState("");
  const [equalSplit, setEqualSplit] = useState(true);
  const [howMuch, setHowMuch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      const fakePeers = [
        {
          id: "18460e75-ae08-4c85-b2da-1f48c395a671",
          email: "hakmamy@hotmail.com",
          username: "hakmamy",
        },
        {
          id: "c89185c0-37d5-4f5d-a310-4a24de98dcb1",
          email: "alice@email.com",
          username: "alice",
        },
      ];
      setPeers([currentUser, ...fakePeers]);
      setWhoPay(currentUser);
    }
  }, [currentUser]);

  const validForm: () => boolean = () => {
    if (whatFor.length && !isNaN(parseFloat(howMuch)) && whoPay)
      return parseFloat(howMuch) > 0;
    return false;
  };

  // Submit the form
  const submitForm: () => void = () => {
    if (currentUser && whoPay) {
      // [!] User's region uses comma or dot ?
      const howMuchParsed = parseFloat(howMuch.replace(/,/g, "."));

      const lendees: string[] = peers
        .filter(({ id }) => id !== whoPay?.id)
        .map(({ id }) => id);

      const newBill = {
        lender: whoPay.id,
        amount: howMuchParsed,
        lendees: lendees,
        description: whatFor,
        publisher: currentUser?.id,
        equalSplit: equalSplit,
      };

      dispatch(addNewBill(newBill));
      goBack();
    }
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
                setLender={(lender) => setWhoPay(lender)}
                addPeer={(user) => setPeers((peers) => [...peers, user])}
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
              <Select
                containerStyle={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                onChange={(value) => setEqualSplit(value)}
                selected={equalSplit}
                options={[
                  { key: "Evenly", value: true },
                  { key: "Fully", value: false },
                ]}
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
