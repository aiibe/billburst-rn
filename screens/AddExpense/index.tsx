import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { RootStackParamsList } from "../types/Navigation";
import Expense from "./Expense";

export default function AddExpense({
  navigation: { goBack },
}: NativeStackScreenProps<RootStackParamsList, "AddExpense">) {
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
        <Expense goBack={() => goBack()} />
      </View>
    </TouchableWithoutFeedback>
  );
}
