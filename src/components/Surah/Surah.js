/* eslint-disable prettier/prettier */
import { ActivityIndicator, Dimensions, Linking, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Text } from 'react-native-elements';
import Footer from '../Footer/Footer';
import { SurahNameContext } from '../../navigation/Routes/Routes';

let devcieWidth = Dimensions.get('window').width;
let devciHeight = Dimensions.get('window').height;

const Surah = (props) => {
    const surahNumber = props.route.params.surahNumber;
    const [surah, setSurah] = useState();
    const [isBismillahInclude, setIsBismillahInclude] =useState(false);
    const [isBismillahIncludeBangla, setIsBismillahIncludeBangla] =useState(false);
    const [surahAudio, setSurahAudio] =useState();
    const [surahData, setSurahData] = useState();
    const [Refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const url = `http://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-simple,bn.bengali,en.sahih`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const surahData= data.data;
            const arabic= data.data[0].ayahs;
            const bengali= data.data[1].ayahs;
            const english = data.data[2].ayahs;
            const a ='بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
            const b = 'শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।';
            const e = 'In the name of Allah, the Entirely Merciful, the Especially Merciful.';
            
            
       let text = arabic.map(function(itm,i){
                let number = surahNumber+':'+itm.numberInSurah;
                let arabi = itm.text ;
                let bangla = bengali[i].text;
                let englishLang = english[i].text;
                arabi.includes(a) && setIsBismillahInclude(true) 
                bangla.includes(b) && setIsBismillahIncludeBangla(true) 

                return [

                    (  
                    !bangla.includes(b)?
                    number.replace('1:1','')
                    :  number
                    )
                    +'\n'+  
                    ( 
                    !bangla.includes(b)?   
                    arabi.replace(a,'')
                    : arabi
                    )
                    +'\n\n'+
                    (
                    !bangla.includes(b)?
                    bangla.replace(b,'')
                    : bangla
                    )
                    +'\n\n'+
                    (
                    !bangla.includes(b)?
                    englishLang.replace(e,'')
                    : englishLang
                    )

            ]                
                
           }).join('\n\n')

           setSurah(text)
           setSurahData(surahData[0]);
           
        
        }) 
        
      },[surahNumber]);

      useEffect(() => {
        const url = `https://api.quran.com/api/v4/chapter_recitations/7/${surahNumber}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setSurahAudio(data.audio_file)) 
        
      },[surahNumber]);
      const pullPage = () =>{
            
        setRefreshing(true);
        setTimeout(()=>{
        setRefreshing(false);
        },1000)
    }
    
  return (
    <View style={styles.container}>

        <Text style={{color:'black', fontSize:18, fontWeight:'bold', textAlign:'center', marginBottom:8,marginTop:8}}>
            <Text style={{color:'#01AD69'}} onPress={() => Linking.openURL(surahAudio?.audio_url)}>Download </Text> Recitation of Mishary Al Afasy
        </Text>

        { 
            surah?
            <ScrollView
            refreshControl={
                <RefreshControl
                refreshing={Refreshing}
                onRefresh={pullPage}
                />
              }
            >
                <View style={{display:'flex', flexDirection:'row', justifyContent:'center', backgroundColor:'#ddddff', padding:5}}>
                    <Text style={{color:'blue'}}>{surahData?.number} </Text>
                    <Text style={{color:'blue'}}>{surahData?.englishName} - {surahData?.englishNameTranslation} </Text>
                    <Text style={{color:'blue'}}>({surahData?.revelationType}, Ayah {surahData?.numberOfAyahs})</Text>
                </View>
                {
                (isBismillahInclude && !isBismillahIncludeBangla) &&
                <View style={{ backgroundColor:'#01AD69', padding:5, marginTop:5}}>
                    <Text style={{color:'white',fontSize:18, fontWeight:'900', textAlign:'center'}}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
                    <Text style={{color:'white',fontSize:15, fontWeight:'900',textAlign:'center'}}>শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।</Text>
                    <Text style={{color:'white',fontSize:15, fontWeight:'900',textAlign:'center'}}>In the name of Allah, the Entirely Merciful, the Especially Merciful.</Text>
                </View>
                }
                <View style={styles.surah}>
                    <View>
                        <Text style={{fontSize:20, color:'#093334', fontWeight:'600'}}>{surah}</Text>
                    </View>
                    <Footer/>
                </View>
               
            </ScrollView>
            :
            <View style={{justifyContent: "center"}}>
                <ActivityIndicator size="large" color="#01AD69" />
            </View>
        }
        
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex:1, 
    },
    surah: {
        flex:1,
        margin:15
    },
   
  });

export default Surah;