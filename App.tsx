import {
  Nunito_400Regular,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Friend from "./screens/Friend";
// import { StatusBar } from "expo-status-bar";
// import { SafeAreaView } from "react-native";
// import AddExpense from "./screens/AddExpense";
import Overview from "./screens/Overview";
import { RootStackParamsList } from "./screens/types/Navigation";

// Stack
const { Navigator, Screen } = createNativeStackNavigator<RootStackParamsList>();

export default function App() {
  const [fontLoad] = useFonts({ Nunito_700Bold, Nunito_400Regular });

  // Wait for fonts to loaded
  if (!fontLoad) return <AppLoading />;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator>
          <Screen name="Overview" component={Overview} />
          <Screen name="Friend" component={Friend} />

          {/* <SafeAreaView> */}
          {/* <StatusBar style="auto" /> */}
          {/* <AddExpense /> */}
          {/* <Overview /> */}
          {/* </SafeAreaView> */}
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
}
