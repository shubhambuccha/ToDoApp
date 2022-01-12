import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

export default function ToDo(navigation) {
  return (
    <View style={styles.body}>
      <Text style={styles.text}>To-Do</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0080ff',
  },
  logo: {
    width: 150,
    height: 150,
    margin: 20,
  },
  text: {
    fontSize: 40,
    color: '#ffffff',
  },
});
