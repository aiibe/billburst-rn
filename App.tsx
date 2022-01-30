import {
  Nunito_400Regular,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import AddExpense from "./screens/AddExpense";
import Overview from "./screens/Overview";

export default function App() {
  const [fontLoad] = useFonts({ Nunito_700Bold, Nunito_400Regular });

  // Wait for fonts to loaded
  if (!fontLoad) return <AppLoading />;

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      {/* Screens */}
      {/* <AddExpense /> */}
      <Overview />
    </SafeAreaView>
  );
}
