import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { RootStackParamsList } from "../types/Navigation";
import Expense from "./Expense";

export default function AddExpense({
  navigation: { goBack },
}: NativeStackScreenProps<RootStackParamsList, "AddExpense">) {
  const {
    expense: { users },
  } = useSelector((state: RootState) => state);

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
        <Expense />
      </View>
    </TouchableWithoutFeedback>
  );
}
