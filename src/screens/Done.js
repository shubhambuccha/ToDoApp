import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

export default function Done({navigation}) {
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Done</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 150,
    height: 150,
    margin: 20,
  },
  text: {
    fontSize: 40,
    color: 'black',
  },
});
