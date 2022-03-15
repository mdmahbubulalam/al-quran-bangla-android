/* eslint-disable prettier/prettier */
import { View, StyleSheet, Linking } from 'react-native';
import React from 'react';
import { Text } from 'react-native-elements';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={{color:'#01ad69', fontSize:18, fontWeight:'bold'}}>
        For web version, click <Text style={{color:'blue'}} onPress={() => Linking.openURL('https://al-quran-ul-kareem-25673.web.app/')}>here</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      alignItems:'center',
      borderBottomColor: 'black',
      borderTopWidth: 1,
      marginTop:15
    },
  });

export default Footer;