/* eslint-disable prettier/prettier */
import { View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useContext, useState } from 'react';
import { Dimensions } from 'react-native';
import Footer from '../Footer/Footer';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { SurahNameContext } from '../../navigation/Routes/Routes';

let devcieWidth = Dimensions.get('window').width;
let devciHeight = Dimensions.get('window').height;


const SurahList = (props) => {
    const navigation = useNavigation();
    const surahList = props.surahList;
    const [surahName, setSurahName] = useContext(SurahNameContext); 
    const [Refreshing, setRefreshing] = useState(false);
    const pullPage = () =>{
            
        setRefreshing(true);
        setTimeout(()=>{
        setRefreshing(false);
        },1000)
    }
  return (
    <ScrollView
    refreshControl={
        <RefreshControl
        refreshing={Refreshing}
        onRefresh={pullPage}
        />
      }
    >
        {surahList?
        <View style={styles.container}>
            {
                surahList?.data.map(list => 
                    <TouchableOpacity
                        onPress={() => {
                        navigation.navigate('Surah', {surahNumber:list.number} )
                        setSurahName(list.englishName)
                    }
                    }
                    >
                        <View style={styles.singleCard}>
                            <View style={styles.singleCardContent}>
                                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                    <View style={{marginRight:20, backgroundColor:'#DCF2EC', height:40, width:40, borderRadius:50, justifyContent: "center",}}>
                                        <Text style={{alignSelf:'center', color:'#01AD69', fontSize:15, fontWeight:'900'}}>{list.number}</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize:16, fontWeight:'900'}}>{list.englishName}</Text>
                                        <Text style={{color:'#A3B1BE',fontWeight:'900'}}>{list.englishNameTranslation}</Text>
                                        <Text style={{color:'#01AD69',fontWeight:'500'}}>{list.revelationType}</Text>   
                                    </View>
                                </View>
                                
                                <View>
                                    <Text style={{fontSize:18, fontWeight:'900'}}>{list.name}</Text>
                                </View>
                                
                            </View>   
                        </View>           
                    </TouchableOpacity>
                   
                )
            }

            <Footer/>       
        </View>
        :
        <View style={{justifyContent: "center"}}>
            <ActivityIndicator size="large" color="#01AD69" />
        </View>
        }

    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      marginBottom:15
    },
    singleCard:{
        backgroundColor:'#ffffff',
        margin:7,
        borderRadius:10
        
    },

    singleCardContent:{
        margin:20,  
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center'
    }
  });

export default SurahList;