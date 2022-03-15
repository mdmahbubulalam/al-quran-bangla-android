/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SurahList from '../SurahList/SurahList';
import { ScrollView } from 'react-native';
let devcieWidth = Dimensions.get('window').width;
let devciHeight = Dimensions.get('window').height;

const Home = () => {
  const [surahList, setSurahList] = useState();

  useEffect(() => {
    const url = `http://api.alquran.cloud/v1/surah`;
    fetch(url)
    .then(res => res.json())
    .then(data => setSurahList(data))
  },[]);
  return (
    
      <View style={styles.container}>
          <Header/>
          <SurahList surahList={surahList}/>
      </View>
    
   
  );
};

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#edf1f4',
    },
  });

export default Home;