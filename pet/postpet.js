import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Picker, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { firestore, storage, firebase } from '../Config';
import { useNavigation } from '@react-navigation/native';

const PostPet = () => {
  const navigation = useNavigation();

  const [petName, setPetName] = useState('');
  const [petImage, setPetImage] = useState(null);
  const [completeAddress, setCompleteAddress] = useState('');
  const [LocationFound, setLocationFound] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [category, setcategory] = useState('');
  const [color, setcolor] = useState('');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [aboutPet, setAboutPet] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {

      const uri = result.assets[0].uri;
      // console.log('Image URI:', result.assets);
      // const localUri = await saveImageLocally(uri);
      setPetImage(uri);
    }
  };

  // const saveImageLocally = async (uri) => {
  //   const filename = uri.split('/').pop();
  //   const newPath = `${FileSystem.documentDirectory}${filename}`;
  //   await FileSystem.copyAsync({ from: uri, to: newPath});
  //   return newPath;
  // }

  const uploadImage = async (uri) => {

    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage.ref().child(`images/${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
    const snapshot = await ref.put(blob);
    const downloadURL = await snapshot.ref.getDownloadURL();
    return downloadURL;  

  };

  const handlePostPet = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }
      const userId = user.uid;
      console.log('user', user.uid);
      const imageURL = await uploadImage(petImage)

      await firestore.collection('pets').add({
        userId,
        petName,
        completeAddress,
        LocationFound,
        sex,
        age,
        category,
        color,
        breed,
        weight,
        aboutPet,
        petImage: imageURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Success', 'Pet posted for adoption');
      // Clear state after successful post
      setPetName('');
      setPetImage(null);
      setCompleteAddress('');
      setLocationFound('');
      setSex('');
      setAge('');
      setcolor('');
      setBreed('');
      setWeight('');
      setAboutPet('');

      navigation.navigate('Petsection');
    } catch (error) {
      Alert.alert('Error', 'Failed to post pet for adoption');
      console.error(error);
    }
    
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Post a Pet for Adoption</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Pet Name"
        value={petName}
        onChangeText={setPetName}
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={completeAddress}
        onChangeText={setCompleteAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Location Found"
        value={LocationFound}
        onChangeText={setLocationFound}
      />

      <Picker
        selectedValue={sex}
        style={styles.input}
        onValueChange={(itemValue) => setSex(itemValue)}
      >
        <Picker.Item label="Select Sex" value="" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>
      <Picker
        selectedValue={category}
        style={styles.input}
        onValueChange={(itemValue) => setcategory(itemValue)}
      >
        <Picker.Item label="Select Category" value="" />
        <Picker.Item label="Dog" value="Dog" />
        <Picker.Item label="Cat" value="Cat" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Age (in years)"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Color"
        value={color}
        onChangeText={setcolor}
      />


      <TextInput
        style={styles.input}
        placeholder="Breed"
        value={breed}
        onChangeText={setBreed}
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (in kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.textArea}
        placeholder="About Pet"
        value={aboutPet}
        onChangeText={setAboutPet}
        multiline={true}
        numberOfLines={4}
      />

      <Button title="Pick an image from gallery" onPress={pickImage} />
      {petImage && <Image source={{ uri: petImage }} style={styles.image} />}
      
      <Button title="Post Pet" onPress={handlePostPet} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  textArea: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
    textAlignVertical: 'top',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 16,
    alignSelf: 'center',
  },
});

export default PostPet;
