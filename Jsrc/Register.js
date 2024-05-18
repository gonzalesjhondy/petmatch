import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, {UseState, useState, } from 'react';
import { firebase } from '../Config';

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  
  registerUser = async (email, password, firstname, lastname) => {
    console.log('password', password)
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() =>{
        firebase.auth().currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url:'https://projectnative-6e41a.firebaseapp.com',
        })
        .then(() =>{
            alert('Verification email sent')
        }).catch((error) =>{
            alert(error.message)
        })
        .then(() => {
            firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
                firstname,
                lastname,
                email,
            })
        })
        .catch((error) => {
            alert(error.message)
        })
    })
    .catch((error => {
        alert(error.message)
    }))
  }
 
  return (
    <View style={styles.container}>
        <View style={styles.inputWrapper}>
            <TextInput
                style={styles.textInput}
                placeholder='First Name'
                onChangeText={(firstname) => setFirstname(firstname)}
                autoCorrect={false}
            />
            <TextInput
                style={styles.textInput}
                placeholder='Last Name'
                onChangeText={(lastname) => setLastname(lastname)}
                autoCorrect={false}
            />
            <TextInput
                style={styles.textInput}
                placeholder='Email'
                onChangeText={(email) => setEmail(email)}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
            />
            <TextInput
                style={styles.textInput}
                placeholder='Password'
                onChangeText={(password) => setPassword(password)}
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
            />
        </View>
        <TouchableOpacity
            onPress={() => registerUser(email, password, firstname, lastname)}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
    </View>
);
};

export default Register;

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},
inputWrapper: {
    width: '100%',
    alignItems: 'center',
},
textInput: {
    width: '80%',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 20,
    textAlign: 'center',
    padding: 10,
},
button: {
    height: 50,
    width: 250,
    backgroundColor: '#026efd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: 20,
},
buttonText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
},
});