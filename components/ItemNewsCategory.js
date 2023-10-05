import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { AdEventType } from "react-native-google-mobile-ads";


function ItemNewsCategory({data, ads}) {
  if (data.mainImg == null) {
    data.mainImg =
      'https://i1-vnexpress.vnecdn.net/2023/09/06/5072937599714c2f1560-169398398-7818-8802-1693984415.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=BmqGixalJBBwPhydFY9xYQ';
  }
  const navigation = useNavigation();
  const ChangeScreen = () => {
    ads.load()
    ads.addAdEventListener(AdEventType.LOADED, ()=>{
      ads.show()
      navigation.navigate('DetailNews', {newsId: data.id});
    })
  };
  return (
    <View
      style={{
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 12,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        marginTop: 12,
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <TouchableOpacity onPress={ChangeScreen} className="">
        <View>
          <View style={{overflow: 'hidden'}}>
            <Image
              style={{height: 200,  borderTopLeftRadius: 12,borderTopRightRadius: 12}}
              source={{uri: data.mainImg}}
            />
          </View>
          <View className="w-full px-2 ">
            <Text
              className="text-lg font-bold mt-0.5 w-full"
              style={{color: '#000', marginTop: 12}}
              numberOfLines={2}
            >
              {data.title}
            </Text>
            <Text
              className="text-sm opacity-50 bottom-0"
              style={{fontStyle: 'italic', marginBottom: 20}}
            >
              {' '}
              Nguồn{' '}
              {data.src.startsWith('https://www.')
                ? data.src.replace(/^https:\/\/www\.|\/$/g, '')
                : data.src.replace(/^https:\/\//, '').replace(/\/$/, '')}
            </Text>
            <Text style={{padding: 4, fontSize: 18, fontWeight: '500', color: '#000', backgroundColor: "#DDDDDD", borderRadius: 12, marginBottom: 12}}  numberOfLines={4}>
            {data.shortDes}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default ItemNewsCategory;
