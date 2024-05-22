import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import React, {useState, useEffect} from 'react';
import { View, Alert, StyleSheet, Image } from 'react-native';
import { firebase } from "./Config";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';

import Login from "./Jsrc/Login";
// import Logout from "./profile/Logout";

import Register from "./Jsrc/Register";
import Dashboard from "./Jsrc/Dashboard";
import Header from "./component/Header";
import Postpet from "./pet/postpet";
import Petsection from "./pet/petsection"
import PetDetails from './pet/petdetails';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const handleSignOut = () => {
    console.log("Signing out...");
    firebase.auth().signOut().then(() => {
      alert("Signed out successfully");
      props.navigation.replace('Login');  // Navigate to login screen after logout
    }).catch((error) => {
      alert(error.message);
    });
  };

  const confirmLogout = () => {
    console.log('logout pressed');
    handleSignOut();
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Logout cancelled');
            Alert.alert('Cancel Pressed');
          },
          style: 'cancel'
        },
        {
          text: 'Logout',
          onPress: () => {
            console.log('Logout confirmed');
            handleSignOut();
          }
        }
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert('This alert was dismissed by tapping outside of the alert dialog.')
      }
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        icon={({ color, size }) => (
          <Ionicons name="log-out-outline" color={color} size={size} />
        )}
        onPress={confirmLogout}
      />
    </DrawerContentScrollView>
  );
};


function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    drawerStyle={{
      backgroundColor: '#F8F8F8', 
      width: 240,
    }}
    screenOptions={{
      headerShown: true,
      drawerActiveTintColor: '#FFFFFF', 
      drawerActiveBackgroundColor: '#2086FF', 
      drawerInactiveTintColor: '#2086FF', 
      drawerInactiveBackgroundColor: 'transparent', 
    }}
    >
      <Drawer.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{
          drawerStyle: {
            borderTopWidth: 0, 
            borderTopColor: 'gray', 
            backgroundColor: '#FFFFFF', 
            height: 300, 
          },
          headerStyle: {backgroundColor: '#2086FF'}, 
          headerTintColor: '#fff', 
          headerTitle: 'Dashboard',
          headerRight: () => (
            <Image 
              source={require('./images/pet_logo2.png')} 
              style={styles.headerImage}
            />
          ),
        }}
      />
      <Drawer.Screen 
        name="PostPet" 
        component={Postpet} 
        options={{
           drawerStyle: {
            borderTopWidth: 0, 
            borderTopColor: 'gray', 
            backgroundColor: '#FFFFFF', 
            height: 300, 
          },
          headerStyle: {backgroundColor: '#2086FF'}, 
          headerTintColor: '#fff',
          headerTitle: 'PostPet',
          headerRight: () => (
            <Image 
              source={require('./images/pet_logo2.png')}
              style={styles.headerImage}
            />
          ),
        }}
      />
      <Drawer.Screen 
        name="Petsection"
        component={Petsection} 
        options={{
           drawerStyle: {
            borderTopWidth: 0, 
            borderTopColor: 'gray', 
            backgroundColor: '#FFFFFF',
            height: 300, 
          },
          headerStyle: {backgroundColor: '#2086FF'}, 
          headerTintColor: '#fff',
          headerTitle: 'PostPet',
          headerRight: () => (
            <Image 
              source={require('./images/pet_logo2.png')} 
              style={styles.headerImage}
            />
          ),
        }}
      />

      {/* <Drawer.Screen 
        name="Petdetails"
        component={PetDetails} 
        options={{
           drawerStyle: {
            borderTopWidth: 0, // Adjust border size as needed
            borderTopColor: 'gray', // Adjust border color as needed
            backgroundColor: '#FFFFFF', // Adjust background color as needed
            height: 200, // Adjust height as needed
          },
          headerStyle: {backgroundColor: '#2086FF'}, 
          headerTintColor: '#fff',
          headerTitle: 'PostPet',
          headerRight: () => (
            <Image 
              source={require('./images/pet_logo2.png')} // Replace with your image path
              style={styles.headerImage}
            />
          ),
        }}
      /> */}
      {/* <Drawer.Screen name="Logout" component={Logout}/> */}
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

  // const handleSignOut = () => {
  //   firebase.auth().signOut().then(() => {
  //     alert("Signed out successfully");
  //   }).catch((error) => {
  //     alert(error.message);
  //   });
  //   console.log("Logout selected, triggering handleSignOut");
  //   setLogoutTrigger(true);
  // };

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
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="PetDetails" 
        component={PetDetails} 
        options={{
           drawerStyle: {
            borderTopWidth: 0, // Adjust border size as needed
            borderTopColor: 'gray', // Adjust border color as needed
            backgroundColor: '#FFFFFF', // Adjust background color as needed
            height: 300, // Adjust height as needed
          },
          headerStyle: {backgroundColor: '#2086FF'}, 
          headerTintColor: '#fff',
          headerTitle: 'PostPet',
          headerRight: () => (
            <Image 
              source={require('./images/pet_logo2.png')} // Replace with your image path
              style={styles.headerImage}
            />) }}
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

 
  headerImage: {
    width: 100,
    height: 50,
    marginRight: 10,
    resizeMode: 'contain',
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

//  return (
//     <Stack.Navigator>
//       <Stack.Screen 
//         name="Menu" 
//         component={DrawerNavigator} 
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
  //     />
      
  //   </Stack.Navigator>
  // );