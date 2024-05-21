import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UsersProfile = () => {
  return (
    <View style={styles.container}>
      <Text>Users Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UsersProfile;