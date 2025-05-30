import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TokenContext, UsernameContext } from './Contexte/Context';
import Navigation from './navigation/Navigation'

const Tab = createBottomTabNavigator();

export default function App () {
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState(null)
  
  return (
    <UsernameContext.Provider value={[username, setUsername]}>
      <TokenContext.Provider value={[token, setToken]}>
        <Navigation />
      </TokenContext.Provider>
    </UsernameContext.Provider>
  )
}