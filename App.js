/* eslint-disable prettier/prettier */
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './src/navigation/Routes/Routes';

const App = () => {
  return (
    <SafeAreaProvider>
      <Routes/>
    </SafeAreaProvider>
  );
};

export default App;