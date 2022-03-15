/* eslint-disable prettier/prettier */
import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const SearchResults = (props) => {
    const [searchResult, setSearchResult] = useState([]);
    const [Refreshing, setRefreshing] = useState(false);
    const searchValue = props.route.params.value;
    const searchValueBangla = searchValue;
    const searchValueEnglish = searchValue;
    const searchValueArabic = searchValue;



    const search = (url)=> {
        fetch(url)
        .then(res => res.json())
        .then(data => setSearchResult(data?.data.matches)) 
    }

    useEffect(() => {
        let url = `http://api.alquran.cloud/v1/search/${searchValueEnglish}/all/en.sahih`;
        search(url)
      },[searchValueEnglish]);

      useEffect(() => {
        let url = `http://api.alquran.cloud/v1/search/${searchValueBangla}/all/bn.bengali`;
        search(url)
      },[searchValueBangla]);

      useEffect(() => {
        let url = `http://api.alquran.cloud/v1/search/${searchValueArabic}/all/quran-simple`;
        search(url)
      },[searchValueArabic]);

      const pullPage = () =>{
            
        setRefreshing(true);
        setTimeout(()=>{
        setRefreshing(false);
        },1000)
    }
  return (
    <>
        <Header/>
        {searchResult?
            <ScrollView
            refreshControl={
                <RefreshControl
                refreshing={Refreshing}
                onRefresh={pullPage}
                />
            }
            >
             
                {
                    searchResult.map(search => 
                        <View style={{margin:15, flex:1}}>
                            <Text style={{fontSize:20, color:'#093334', fontWeight:'600'}}>{search.surah.number}:{search.numberInSurah}</Text>
                            <Text style={{fontSize:20, color:'#093334', fontWeight:'600'}}>{search.text}</Text>
                        </View>
                    )
                }
                
                <Footer />
            </ScrollView>
        :
        <View style={{justifyContent: "center"}}>
            <ActivityIndicator size="large" color="#01AD69" />
        </View>
        }
    </>
  );
};

export default SearchResults;