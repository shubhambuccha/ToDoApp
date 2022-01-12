import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, []);

  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://clickup.com/blog/wp-content/uploads/2019/01/to-do-list-apps.png',
        }}
      />
      <Text style={styles.text}>Mash To-Do List</Text>
      <FontAwesome5 name={'tasks'} size={80} color={'black'} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DD62FF',
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
