/* eslint-disable prettier/prettier */
import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../components/Home/Home';
import Surah from '../../components/Surah/Surah';
import SearchResults from '../../components/SearchResults/SearchResults';

const Stack = createNativeStackNavigator();

export const SurahNameContext = createContext();

const Routes = () => {
  const [surahName, setSurahName] = useState('') 

  return (
   <SurahNameContext.Provider value={[surahName, setSurahName]}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Surah List" component={Home} options={{headerTitleAlign:'center'}}/>
        <Stack.Screen name='Surah' component={Surah} options={{headerTitleAlign:'center',title:'Surah '+surahName}}/>
        <Stack.Screen name='SearchResults' component={SearchResults} options={{headerTitleAlign:'center',title:'Search Results'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </SurahNameContext.Provider>
  )
}

export default Routes;