import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {setTasks} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

export default function Task({navigation}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    if (Task) {
      setTitle(Task.Title);
      setDesc(Task.Desc);
    }
  };

  const setTask = () => {
    if (title.length == 0) {
      Alert.alert('Warning!', 'Title is a required field.');
    } else {
      try {
        var Task = {
          ID: taskID,
          Title: title,
          Desc: desc,
        };
        let newTask = [...tasks, Task];
        AsyncStorage.setItem('Tasks', JSON.stringify(newTask))
          .then(() => {
            dispatch(setTasks(newTask));
            Alert.alert('Success', 'Task was created successfully.');
            navigation.goBack();
          })
          .catch(err => console.log(err));
        console.log(tasks[0]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Text style={[styles.text, {fontSize: 30}]}> Task !!!</Text>
      <TextInput
        value={title}
        placeholder="Title"
        style={styles.input}
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        value={desc}
        placeholder="Description"
        style={styles.input}
        multiline
        numberOfLines={4}
        onChangeText={value => setDesc(value)}
      />
      <Pressable
        onPress={setTask}
        hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
        android_ripple={{color: '#00000050'}}
        style={({pressed}) => [
          {backgroundColor: pressed ? '#dddddd' : '#1eb900'},
          styles.button,
        ]}>
        <Text style={styles.text1}>Save Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff0ff',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },
  input: {
    width: '100%',
    borderWidth: 3,
    borderColor: 'grey',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    textAlign: 'left',
    margin: 10,
    fontSize: 20,
    paddingHorizontal: 20,
  },
  text1: {
    color: '#ffffff',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  button: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
  },
});