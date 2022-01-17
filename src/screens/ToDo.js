import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {setTaskID, setTasks} from '../redux/actions';

export default function ToDo({navigation}) {
  const {tasks} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getTask();
  }, []);

  const getTask =() => {
    try {
      console.log('in get task');
      AsyncStorage.getItem('Tasks')
        .then(tasks => {
          const parsedTasks = JSON.parse(tasks);
          if (parsedTasks && typeof parsedTasks === 'Object') {
            console.log(parsedTasks);
            dispatch(setTasks(parsedTasks));
          }
        })
        .catch(err => console.log(err));
      console.log(tasks[0]);
    } catch {
      err => console.log(err);
    }
  };

  return (
    <View style={styles.body}>
      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(setTaskID(item.ID));
              console.log('reached');
              navigation.navigate('Task');
            }}
            style={styles.item}>
            <Text numberOfLines={1} style={styles.title}>
              {item.Title}
            </Text>
            <Text numberOfLines={4} style={styles.subtitle}>
              {item.Desc}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(setTaskID(tasks.length + 1));
          navigation.navigate('Task');
        }}>
        <FontAwesome5 name={'plus'} size={20} color={'#ffffff'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff0ff',
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
  button: {
    backgroundColor: '#0080ff',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingRight: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    color: '#000000',
    fontSize: 30,
    margin: 5,
  },
  subtitle: {
    color: '#999999',
    fontSize: 20,
    margin: 5,
  },
});
