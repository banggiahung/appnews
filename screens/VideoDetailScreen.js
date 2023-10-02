import React, {useEffect, useState, useRef} from 'react';

import {Image, ScrollView, Text, View, Dimensions,TouchableOpacity,Linking } from 'react-native';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RenderHTML from 'react-native-render-html';
import {
  BannerAd,
  TestIds,
  InterstitialAd,
  BannerAdSize,
  AdEventType,
} from 'react-native-google-mobile-ads';
import Video from 'react-native-video';
import axios from '../Config/Axios';
import {
  products,
  category,
  BaseUrl,
  AdsAndroidKeyBanner,
  AdsAndroidKeyVideo,
} from '../Config';

function VideoDetailScreen() {
  const VideoId = useRoute().params.videoId;
  const openWebPage = url => {
    console.log('url', url);
    if (url) {
      Linking.openURL(url);
    }
  };
  const screenWidth = Dimensions.get('window').width;
  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes} ${day}-${month}-${year}`;
  };
  const [srcUrlOpenWeb, setSrcUrlOpenWeb] = useState('https://www.google.com/');
  let video = `https://tintuc.devtest.ink`;
  const [title, setTitle] = useState();
  const [mainVideo, setMainVideo] = useState();
  const [shortDes, setShortDes] = useState();
  const [src, setSrc] = useState();
  const [createDate, setCreateDate] = useState();
  const [srcMain, setSrcMain] = useState();
  useEffect(() => {
    axios.get(`/api/v1/Items/KeyVideo/${VideoId}`).then(data => {
      setTitle(data.newsData.titile);
      setMainVideo(data.newsData.mainVideo);
      setShortDes(data.newsData.shortDes);
      setCreateDate(formatDate(data.newsData.createDate));
      setSrc(
        `Nguồn ${
          data.newsData.src.startsWith('https://www.')
            ? data.newsData.src.replace(/^https:\/\/www\.|\/$/g, '')
            : data.newsData.src.replace(/^https:\/\//, '').replace(/\/$/, '')
        }`,
      );
      setSrcMain(
        `Nguồn ${
          data.newsData.srcMain.startsWith('https://www.')
            ? data.newsData.srcMain.replace(/^https:\/\/www\.|\/$/g, '')
            : data.newsData.srcMain
                .replace(/^https:\/\//, '')
                .replace(/\/$/, '')
        }`,
      );
      setSrcUrlOpenWeb(data.newsData.src);
    });
  }, [VideoId]);
  return (
    <ScrollView className="bg-black">
      <View className="">
        <Video
          source={{uri: `${video}${mainVideo}`}}
          controls={true}
          paused={false}
          resizeMode="contain"
          style={{width: screenWidth, height: 400}}
        />
      </View>
      <View className="py-2 flex-row justify-center bg-rose-400">
        <BannerAd
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          unitId={AdsAndroidKeyBanner}
        />
      </View>
      <View className="px-1.5">
        <Text className="text-white text-lg">{title}</Text>
        <TouchableOpacity onPress={() => openWebPage(srcUrlOpenWeb)}>
          <View className="flex flex-row">
            <Text className="opacity-75 text-white border-2 border-cyan-50 rounded-xl p-1">
              {src}
            </Text>
          </View>
        </TouchableOpacity>

        <Text className="text-white pt-2">{shortDes}</Text>
      </View>
    </ScrollView>
  );
}

export default VideoDetailScreen;
