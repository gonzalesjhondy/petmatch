import 'react-native-gesture-handler';
import { Text, StyleSheet, SafeAreaView, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase, firestore } from '../Config';
import { useNavigation } from '@react-navigation/native';


const Dashboard = () => {

    const [petData, setPetData] = useState([]);
    const [petcategory, setPetCategory] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigation = useNavigation();
    useEffect(() => {
        fetchPetsData();
    }, [petcategory, searchKeyword]);
    
    const fetchPetsData = async () => {
        try{
            const PetsRef = firestore.collection('pets')
            console.log('PetsRef', PetsRef);
            let query = PetsRef;
            if(petcategory){
                if(petcategory === 'All'){
                    query = query.where('category', 'in', ['Dog', 'Cat']);
                }else{
                    query = query.where('category', '==', petcategory);
                }
            }
            
            const snapshot = await query.get();
            // const data = snapshot.docs.map(doc => doc.data());
            let data = await Promise.all(snapshot.docs.map(async (doc) => {
                const pet = doc.data();
                const userRef = firestore.collection('users').doc(pet.userId);
                const userSnapshot = await userRef.get();
                const userData = userSnapshot.data();
                console.log('userdata', userData);
                return { ...pet, userName: userData ? userData.firstname : 'Unknown' }
            }));

            if(searchKeyword){
                const keywordlower = searchKeyword.toLowerCase();
                data = data.filter(pet =>
                    pet.petName.toLowerCase().includes(keywordlower) ||
                    pet.breed.toLowerCase().includes(keywordlower) ||
                    pet.userName.toLowerCase().includes(keywordlower) ||
                    pet.category.toLowerCase().includes(keywordlower)
                );
            }

            setPetData(data);
        } catch (error){
            console.error('Error fetching data:', error);
        }

    };

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
                    value={searchKeyword}
                    onChangeText={text => setSearchKeyword(text)}
                />
            </View>

            <Text style={styles.categoryTitle}>Categories</Text>
            <View style={styles.categories}>
                <TouchableOpacity style={[styles.categoryItem, petcategory === 'Dog' && { backgroundColor: '#E0F7FA' }]}
                    onPress={() => setPetCategory('Dog')}    
                >

                    <Text>Dogs</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.categoryItem, petcategory === 'Cat' && { backgroundColor: '#FFEBEE' }]}
                    onPress={() => setPetCategory('Cat')}
                >
                    <Text>Cats</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.categoryItem, petcategory === 'All' && { backgroundColor: '#D3D3D3' }]}
                    onPress={() => setPetCategory('All')}
                >
                    <Text>All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.petList}>
                {petData.map((pet, index) =>(

                    // <View key={index} style={styles.petCard}>
                    <TouchableOpacity key={index}
                    style={styles.petCard}
                    onPress={() => navigation.navigate('PetDetails', { pet } )}
                    >
                        <Image
                            source={{ uri: pet.petImage}} // replace with your pet image URL
                            style={styles.petImage}
                        />
                        <Text style={styles.petName}>{pet.petName}</Text>
                        <Text style={styles.petDistance}>Age: {pet.age}</Text>
                        <Text style={styles.petDistance}>Posted by: {pet.userName}</Text>
                        <Text style={styles.petDistance}>Location Found: {pet.LocationFound}</Text>
                    </TouchableOpacity>
                    // </View>

                ))}
               
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
        alignItems: 'center',
        padding: 16,
    },
    petCard: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
        width: 350,
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

// const [name, setName] = useState('');
    //change the password
    // const changePassword = () => {
    //     firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
    //         .then(() => {
    //             alert("Password Reset email sent");
    //         }).catch((error) => {
    //             alert(error);
    //         });
    // }

    // useEffect(() => {
    //     firebase.firestore().collection('users')
    //         .doc(firebase.auth().currentUser.uid).get()
    //         .then((snapshot) => {
    //             if (snapshot.exists) {
    //                 setName(snapshot.data());
    //             } else {
    //                 console.log('user does not exist');
    //             }
    //         });
    // }, []);
 {/* <View style={styles.petCard}>
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
                </View> */}
                {/* Add more pet cards as needed */}