import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Petsection = () => {
  return (
    <View style={styles.container}>
      <Text>Pet Section</Text>
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

export default Petsection;