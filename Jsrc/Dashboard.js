import 'react-native-gesture-handler';
import { Text, StyleSheet, SafeAreaView, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../Config';



const Dashboard = () => {
    const [name, setName] = useState('');

    //change the password
    const changePassword = () => {
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
            .then(() => {
                alert("Password Reset email sent");
            }).catch((error) => {
                alert(error);
            });
    }

    useEffect(() => {
        firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid).get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setName(snapshot.data());
                } else {
                    console.log('user does not exist');
                }
            });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {/* <Image
                    source={require('../images/profile.png')} // replace with your profile image URL
                    style={styles.profileImage}
                /> */}
                {/* <Ionicons name="menu" size={24} color="black" style={styles.sidebarIcon} onPress={() => navigation.openDrawer()} /> */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search your favorite pet..."
                />
            </View>

            <Text style={styles.categoryTitle}>Categories</Text>
            <View style={styles.categories}>
                <TouchableOpacity style={[styles.categoryItem, { backgroundColor: '#E0F7FA' }]}>
                    <Text>Dogs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.categoryItem, { backgroundColor: '#FFEBEE' }]}>
                    <Text>Cats</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.petList}>
                <View style={styles.petCard}>
                    <Image
                        source={require('../images/dog1.jpg')} // replace with your pet image URL
                        style={styles.petImage}
                    />
                    <Text style={styles.petName}>Moni Charlie</Text>
                    <Text style={styles.petDistance}>Distance (Near 4km)</Text>
                </View>
                <View style={styles.petCard}>
                    <Image
                        source={require('../images/dog2.jpg')}  // replace with your pet image URL
                        style={styles.petImage}
                    />
                    <Text style={styles.petName}>Jhon Doe</Text>
                    <Text style={styles.petDistance}>Distance (Near 5km)</Text>
                </View>
                <View style={styles.petCard}>
                    <Image
                        source={require('../images/dog2.jpg')}  // replace with your pet image URL
                        style={styles.petImage}
                    />
                    <Text style={styles.petName}>Jhon Doe</Text>
                    <Text style={styles.petDistance}>Distance (Near 5km)</Text>
                </View>
                {/* Add more pet cards as needed */}
            </ScrollView>
        </SafeAreaView>
    );
};
 

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    sidebarIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        // paddingHorizontal: 10,
        // backgroundColor: '#F0F0F0',
        paddingLeft: 10,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 16,
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    categoryItem: {
        padding: 16,
        borderRadius: 8,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    petList: {
        // alignItems: 'center',
        padding: 16,
    },
    petCard: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    petImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    petName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    petDistance: {
        fontSize: 14,
        color: '#888',
    },

});