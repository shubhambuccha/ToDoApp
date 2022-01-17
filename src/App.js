/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Splash from './screens/Splash';
import ToDo from './screens/ToDo';
import Done from './screens/Done';
import Task from './screens/Task';

import { Provider } from 'react-redux';
import { Store } from './redux/store';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const stack = createNativeStackNavigator();
const bottomNav = createBottomTabNavigator();

function Home() {
  return (
    <bottomNav.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'To-Do') {
            iconName = 'tasks';
            size = focused ? 25 : 20;
            color = focused? 'blue':'black';
          } else if (route.name === 'Done') {
            iconName = 'clipboard-check';
            size = focused ? 25 : 20;
            color = focused? 'blue':'black';
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}>
      <bottomNav.Screen
        options={{
          headerShown: false,
        }}
        name="To-Do"
        component={ToDo}
      />
      <bottomNav.Screen
        options={{
          headerShown: false,
        }}
        name="Done"
        component={Done}
      />
    </bottomNav.Navigator>
  );
}

function App() {
  return (
    <Provider store={Store}>
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#0080ff',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
        }}>
        <stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
         <stack.Screen
          options={{headerShown: false}}
          name="Task"
          component={Task}
        />
      </stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});

export default App;
