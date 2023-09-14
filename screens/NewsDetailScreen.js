import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios from '../Config/Axios';
import {BaseUrl} from '../Config';
import HTML from 'react-native-render-html';
import {useDispatch} from 'react-redux';
import {Button} from 'react-native';
function NewsDetailScreen() {
  
  const openWebPage = url => {
    console.log(url)
    if (url) {
      Linking.openURL("https://google.com");
    }
  };
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const route = useRoute();
  const newsId = route.params.newsId;
  const [title, setTitle] = useState();
  const [src, setSrc] = useState();
  const [srcData, setSrcData] = useState();
  const [mainImg, setMainImg] = useState();
  const [des, setDes] = useState('');
  useEffect(() => {
    fetch(`https://devtest.ink/api/v1/Items/KeyProducts/${newsId}`, {
      method: 'GET',
      timeout: 60000,
    })
      .then(res => res.json())
      .then(data => {
        setTitle(data.newsData.title);
        setMainImg(data.newsData.mainImg);
        setDes(data.newsData.description);
        setSrcData(data.newsData.src);
        setSrc(
          `Nguồn ${
            data.newsData.src.startsWith('https://www.')
              ? data.newsData.src.replace(/^https:\/\/www\.|\/$/g, '')
              : data.newsData.src.replace(/^https:\/\//, '').replace(/\/$/, '')
          }`,
        );
      });
  }, [newsId]);
  return (
    <ScrollView>
      <View className="flex-1 mt-3 mx-2">
        <Text className="break-words text-3xl font-bold">{title}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text style={{flex: 1, opacity: 0.5}}>{src}</Text>
          <TouchableOpacity onPress={openWebPage}>
            <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
              Mở trang web
            </Text>
          </TouchableOpacity>
        </View>

        <Image
          className="w-full h-72 object-contain"
          source={{uri: `${BaseUrl}${mainImg}`}}
        />
        <HTML source={{html: des}} contentWidth={width} />
        
      </View>
    </ScrollView>
  );
}
export default NewsDetailScreen;
