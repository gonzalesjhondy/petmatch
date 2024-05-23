import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { firestore } from '../Config';
import moment from 'moment';


const Petsection = () => {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      const petDocs = await firestore.collection('pets').orderBy('createdAt', 'desc').get();
      const userPromises = petDocs.docs.map(async petDoc => {
        const petData = petDoc.data();
        const userDoc = await firestore.collection('users').doc(petData.userId).get();;
        const userData = userDoc.data();
        console.log("Pet data", userDoc);

        return {
          id:petDoc.id,
          user: userData.firstname,
          timestamp: moment(petData.createdAt.toDate()).fromNow(),
          about: petData.aboutPet,
          image: petData.petImage,
          location: petData.LocationFound
        };
      });
      const postsData = await Promise.all(userPromises);
      setPosts(postsData);
    }
    fetchPets();

    
  }, []);

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    // update state with new posts array
    setPosts(updatedPosts);
  };

  const handleComment = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    
    <View style={styles.postContainer}>
      <Text style={styles.userName}>{item.user}</Text>
      {/* <Text style={styles.location}>{item.location}</Text> */}
      <Text style={styles.timestamp}>{item.timestamp}</Text>
      <Text style={styles.caption}>{item.about}, location found at <strong>{item.location}</strong></Text>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.actionButton}>
          <Icon name="heart" size={20} color="#e91e63" />
          <Text style={styles.actionText}>{item.likes || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleComment(item)} style={styles.actionButton}>
          <Icon name="comment" size={20} color="#3b5998" />
          <Text style={styles.actionText}>{item.comments ? item.comments.length : 0}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <FlatList
            data={selectedPost ? selectedPost.comments : []}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Text style={styles.commentUser}>{item.user}</Text>
                <Text style={styles.commentText}>{item.text}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
          />
          <Button title="Post Comment" onPress={() => { /* Add comment post functionality */ }} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  location: {
    fontSize: 14,
    color: 'gray',
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
  },
  caption: {
    marginVertical: 10,
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  actions: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  commentContainer: {
    marginBottom: 10,
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Petsection;
