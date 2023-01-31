import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DemoScreen from "./screens/DemoScreen";
import HomeScreen from "./screens/HomeScreen";
import Paywall from "./screens/Paywall";

export type RootStackParamList = {
  Home: undefined;
  Paywall: undefined;
  Demo: undefined;
};

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Demo"
          component={DemoScreen}
        />
        <Stack.Screen
          options={{
            presentation: "modal",
            headerShown: false,
          }}
          name="Paywall"
          component={Paywall}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
