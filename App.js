import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ROUTES
import ConnectionScreen from "./containers/ConnectionScreen.js";
import AccountScreen from "./containers/AccountScreen.js";
import HomeScreen from "./containers/HomeScreen.js";

const Stack = createStackNavigator();

function App() {
  const [dataReturn, setDataReturn] = useState("");
  const [tokenFinded, setTokenFinded] = useState(null);

  const handleClic = async () => {
    await AsyncStorage.removeItem("token");
    setTokenFinded(null);
  };

  useEffect(() => {
    const userToken = async () => {
      const response = await AsyncStorage.getItem("token");
      setTokenFinded(response);
    };
    userToken();
  }, []);

  useEffect(() => {}, []);

  return (
    <NavigationContainer>
      {tokenFinded === null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Connection"
            options={{ header: () => null, animationEnabled: false }}
          >
            {(props) => (
              <ConnectionScreen
                {...props}
                dataReturn={dataReturn}
                setTokenFinded={setTokenFinded}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Acount"
            options={{ header: () => null, animationEnabled: false }}
          >
            {(props) => (
              <AccountScreen
                {...props}
                setDataReturn={setDataReturn}
                setTokenFinded={setTokenFinded}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        ({
          /*<Stack.Navigator>
           <Stack.Screen name="home" options={{ header: () => null, animationEnabled: false }}>
            //  include the navigator here
            {<() => HomeScreen />}
          </Stack.Screen>
        </Stack.Navigator> */
        },
        null)
      )}
    </NavigationContainer>
  );
}
export default App;
