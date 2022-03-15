/* eslint-disable prettier/prettier */
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
let devcieWidth = Dimensions.get('window').width;
let devciHeight = Dimensions.get('window').height;

const Header = () => {
  const navigation = useNavigation();
    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
      setSearch(search);
    };
  
  return (
    <View>
      <SearchBar
      onBlur={()=>navigation.navigate('SearchResults', {value:search} )}
        placeholder="Search with text..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        round 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor:'#edf1f4',
    borderBottomColor:'#edf1f4'
  },
  inputContainerStyle: {
    backgroundColor:'#ffffff'
  },
});


export default Header;
