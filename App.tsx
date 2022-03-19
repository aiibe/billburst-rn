import {
  Nunito_400Regular,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import "react-native-url-polyfill/auto";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AddExpense from "./screens/AddExpense";
import Friend from "./screens/Friend";
// import { StatusBar } from "expo-status-bar";
// import { SafeAreaView } from "react-native";
// import AddExpense from "./screens/AddExpense";
import Overview from "./screens/Overview";
import { RootStackParamsList } from "./screens/types/Navigation";

// Stack
const { Navigator, Screen, Group } =
  createNativeStackNavigator<RootStackParamsList>();

export default function App() {
  const [fontLoad] = useFonts({ Nunito_700Bold, Nunito_400Regular });

  // Wait for fonts to loaded
  if (!fontLoad) return <AppLoading />;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator>
          <Group>
            {/* Overview */}
            <Screen
              name="Overview"
              component={Overview}
              options={{ headerShown: false }}
            />
            {/* Friend */}
            <Screen name="Friend" component={Friend} />
          </Group>
          <Group screenOptions={{ presentation: "modal" }}>
            {/* Add Expense */}
            <Screen name="Add expense" component={AddExpense} />
          </Group>

          {/* <SafeAreaView> */}
          {/* <StatusBar style="auto" /> */}
          {/* </SafeAreaView> */}
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
}
