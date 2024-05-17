import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState} from 'react';
import { useNavigation } from "@react-navigation/native";
import { firebase } from '../Config';
const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    loginUser = async (email, password) => {
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password)
        }catch (error){
            alert(error.message);
        }
    }

    // forget password
    const forgetpassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Password Reset email sent")
        }).catch((error) => {
            alert(error)
        })
    }

    return (
        <View>
            {/* <Text style={{fontWeight: 'bold', fontSize:26 }}>Login</Text> */}
            <View style={styles.container}>
                <TextInput
                    style={styles.inputContainer}
                    placeholder='Email'
                    onChangeText={(email) => setEmail(email)}
                    autoComplete='none'
                    autoCorrect={false}
                />
                <TextInput
                    style={StyleSheet.inputContainer}
                    placeholder='Password'
                    onChangeText={(password) => setPassword(password)}
                    autoComplete='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                onPress={() => loginUser(email, password)}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={{marginTop:20}}
            >
                <Text style={{fontWeight:'bold', fontSize:14}}>
                    Don't have an account? Sign Up here
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                onPress={() => {forgetpassword()}}
                style={styles.link}
            >
                <Text style={styles.linkText}>
                    Forget Password?
                </Text>
            </TouchableOpacity>

        </View>
       
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        marginBottom: 40,
        width: '80%',
    },
    textInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: '100%',
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        height: 50,
        width: 250,
        backgroundColor: '#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginBottom: 20,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#fff',
    },
    link: {
        marginTop: 20,
    },
    linkText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#026efd',
    },
});