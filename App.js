import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import { firebase } from "./Config";

import Login from "./Jsrc/Login";
import Register from "./Jsrc/Register";
import Dashboard from "./Jsrc/Dashboard";
import Header from "./component/Header";

const Stack = createStackNavigator();

function App(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initializing) return null;

  if(!user){
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} 
          options={{
            headerTitle: () => <Header name="Pet Match Adoption"/>,
            headerStyle: {
              height: 100 ,
             
              backgroundColor: '#2bf0c2',
              shadowColor: '#000',
              elevation: 25
            }
          }}
        />

        <Stack.Screen name="Register" component={Register} 
          options={{
            headerTitle: () => <Header name="Pet Match Adoption"/>,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: '#2bf0c2',
              shadowColor: '#000',
              elevation: 25
            }
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard} 
          options={{
            headerTitle: () => <Header name="Dashboard"/>,
            headerStyle: {
              height: 100,
              // borderBottomLeftRadius: 50,
              // borderBottomRightRadius: 50,
              backgroundColor: '#00e4d0',
              shadowColor: '#000',
              elevation: 25
            }
          }}
        />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
} 