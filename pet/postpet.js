import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Picker } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PostPet = () => {
  const [petName, setPetName] = useState('');
  const [petImage, setPetImage] = useState(null);
  const [completeAddress, setCompleteAddress] = useState('');
  const [LocationFound, setLocationFound] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
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

    if (!result.cancelled) {
      setPetImage(result.uri);
    }
  };

  const handlePostPet = () => {
    console.log({
      petName,
      petImage,
      completeAddress,
      LocationFound,
      sex,
      age,
      breed,
      weight,
      aboutPet,
    });
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

      <TextInput
        style={styles.input}
        placeholder="Age (in years)"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
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
