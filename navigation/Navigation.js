import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import SignUpScreen from '../screens/SignUpScreen'
import HomeScreen from '../screens/HomeScreen'
import SignInScreen from '../screens/SignInScreen'
import SignOutScreen from '../screens/SignOutScreen'
import TodoListItems from '../screens/TodoListItems'
import { TokenContext, UsernameContext } from '../Contexte/Context';
import TodoListsScreen from '../screens/TodoListsScreen'

const Tab = createBottomTabNavigator()

export default function Navigation () {
    return (
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <NavigationContainer>
            {token == null ? (
              <Tab.Navigator>
                <Tab.Screen name='SignIn' component={SignInScreen} />
                <Tab.Screen name='SignUp' component={SignUpScreen} />
              </Tab.Navigator>
            ) : (
              <Tab.Navigator>
                <Tab.Screen name='Home' component={HomeScreen} />
                <Tab.Screen name='TodoList' component={TodoListsScreen} />
                <Tab.Screen name='SignOut' component={SignOutScreen} />
                <Tab.Screen name='TodoListItems' component={TodoListItems} options={{ tabBarButton: () => null}} />
              </Tab.Navigator>
            )}
          </NavigationContainer>
        )}
      </TokenContext.Consumer>
    )
  }