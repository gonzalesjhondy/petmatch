import React from 'react';
import { Text, StyleSheet, SafeAreaView, View, Image, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PetDetails = ({ route }) => {
    const { pet } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>Pet Details</Text>
                <Image source={{ uri: pet.petImage }} style={styles.petImage} />
                <Text style={styles.petName}>{pet.petName}</Text>
                <Text style={styles.address}>{pet.completeAddress}</Text>
                
                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailTitle}>Sex</Text>
                        <Text style={styles.detailText}>{pet.sex}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailTitle}>Age</Text>
                        <Text style={styles.detailText}>{pet.age} year</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailTitle}>Breed</Text>
                        <Text style={styles.detailText}>{pet.breed}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailTitle}>Weight</Text>
                        <Text style={styles.detailText}>{pet.weight}</Text>
                    </View>
                </View>
                
                <View style={styles.ownerContainer}>
                    <Image source={{ uri: pet.ownerImage }} style={styles.ownerImage} />
                    <View>
                        <Text style={styles.ownerName}>{pet.ownerName}</Text>
                        <Text style={styles.ownerRole}>Author:</Text>
                    </View>
                </View>

                <Text style={styles.aboutTitle}>About Pet</Text>
                <Text style={styles.aboutText}>{pet.aboutPet}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContainer: { alignItems: 'center', padding: 16 },
    header: { fontSize: 24, fontWeight: 'bold', marginVertical: 16 },
    petImage: {
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        marginBottom: 20,
    },
    petName: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
    address: { fontSize: 16, color: '#777', textAlign: 'center', marginBottom: 16 },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    detailItem: { alignItems: 'center' },
    detailTitle: { fontSize: 16, color: '#777' },
    detailText: { fontSize: 18, fontWeight: 'bold' },
    ownerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    ownerImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    ownerName: { fontSize: 18, fontWeight: 'bold' },
    ownerRole: { fontSize: 16, color: '#777' },
    aboutTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
    aboutText: { fontSize: 16, textAlign: 'center' },
});

export default PetDetails;
