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
    <View style={styles.continer}>
        <Text style={{fontWeight:'bold', fontSize:23}}>
            Register Here..!
        </Text>
        <View style={{marginTop:40}}>
            <TextInput
                style={styles.TextInput}
                placeholder='First Name'
                onChangeText={(firstname) => setFirstname(firstname)}
                autoCorrect={false}
            />
            <TextInput
                style={styles.TextInput}
                placeholder='Last Name'
                onChangeText={(lastname) => setLastname(lastname)}
                autoCorrect={false}
            />
            <TextInput
                style={styles.TextInput}
                placeholder='Email'
                onChangeText={(email) => setEmail(email)}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'

            />

            <TextInput
                style={styles.TextInput}
                placeholder='password'
                onChangeText={(password) => setPassword(password)}
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
            />

        </View>
        <TouchableOpacity
            onPress={() => registerUser(email, password ,firstname, lastname, )}
            style={styles.button}
        >
            <Text style={{fontWeight:'bold', fontSize:22}}>Register</Text>
        </TouchableOpacity>
    </View>
  )
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop: 100,
    },
    TextInput: {
        paddingTop:20,
        paddingBottom:10,
        width: 400,
        fontSize: 20,
        borderBottomWidth:1,
        borderBottomColor:'#000',
        marginBottom:10,
        textAlign: 'center'
    },
    button:{
        marginTop:50,
        height:70,
        width:250,
        backgroundColor:'#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:50,

    }
})
