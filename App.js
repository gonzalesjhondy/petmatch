import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, {useState, useEffect} from 'react';
import { Image, Text, View ,TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from "./Config";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';

import Login from "./Jsrc/Login";
import Register from "./Jsrc/Register";
import Dashboard from "./Jsrc/Dashboard";
import Header from "./component/Header";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      {/* Add other screens here */}

    </Drawer.Navigator>
  );
}

function AppStack(){
  const [openDropdown, setOpenDropdown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [dropdownItems, setDropdownItems] = useState([
    { label: 'Profile', value: 'profile' },
    { label: 'Logout', value: 'logout' },
  ]);
  const [logoutTrigger, setLogoutTrigger] = useState(false); // State to trigger re-render after logout
  useEffect(() => {
    // console.log("Dropdown value changed:", dropdownValue);

    if (dropdownValue === 'profile') {

      console.log('Profile selected');

    } else if (dropdownValue === 'logout') {
      console.log("Logout selected, triggering handleSignOut");
      handleSignOut();
    }
  }, [dropdownValue]);

  const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      alert("Signed out successfully");
    }).catch((error) => {
      alert(error.message);
    });
    console.log("Logout selected, triggering handleSignOut");
    setLogoutTrigger(true);
  };

  const handleDropdownChange = (value) => {
    setDropdownValue(value);
    console.log("log the console");
  };

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
              height: 100,
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
      <Stack.Screen 
        name="Menu" 
        component={DrawerNavigator} 
        // options={{
        //   headerRight: () => (
        //     <View style={styles.headerRightContainer}>
        //       <TouchableOpacity onPress={() => setOpenDropdown(!openDropdown)}>
        //         <Image
        //           source={require('./images/profile.png')} // Use require for local images
        //           style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
        //         />
        //         <Text><strong>Jondy</strong></Text>
        //       </TouchableOpacity>
        //       {openDropdown && (
        //         <DropDownPicker
        //           open={openDropdown}
        //           value={dropdownValue}
        //           items={dropdownItems}
        //           setOpen={setOpenDropdown}
        //           setValue={setDropdownValue}
        //           setItems={setDropdownItems}
        //           containerStyle={styles.dropdownContainer}
        //           style={styles.dropdown}
        //           onChangeValue={handleDropdownChange}
                  
        //         />
        //       )}
              
        //     </View>
        //   ),
        //   headerStyle: {
        //     height: 100,
        //     shadowColor: '#000',
        //     elevation: 25,
        //   },
        // }}
      />
      
    </Stack.Navigator>
  );

}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  dropdownContainer: {
    width: 150,
    marginTop: 10,
  },
  dropdown: {
    backgroundColor: '#fafafa',
  },
});

export default () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

