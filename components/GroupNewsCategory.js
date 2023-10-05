import React, {Component} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from "react-native-google-mobile-ads"
import {AdsAndroidKeyBanner} from "../Config"
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setTitle} from '../slices/HeaderTitleSlice';
import RenderHTML from 'react-native-render-html';
import HTML from 'react-native-render-html';

function GroupNewsCategory({data, category}) {
  const item2 = [];
  const item1 = [];

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();

  const ChangeScreen = () => {
    console.log(category.nameCate);
    dispatch(setTitle(category.nameCate));
    navigation.navigate('AllNewsScreenByCategory', {categoryId: category.id});
  };
  for (let i = 1; i < 3; i++) {
    item1.push(
      <View
        className="flex-1 rounded-2xl  drop-shadow-3xl bg-gray-200/95 px-3 mt-3 mb-3"
        key={i}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DetailNews', {newsId: data[i].id});
          }}
        >
          <Image
            source={{uri: data[i].mainImg}}
            className="w-full h-32 object-cover m-auto mt-2"
          />
          <Text
            className="text-lg m-auto break-words  overflow-hidden"
            numberOfLines={3}
          >
            {data[i].title}
          </Text>
        </TouchableOpacity>
      </View>,
    );
  }

  for (let i = 3; i < 5; i++) {
    item2.push(
      <View
        className="flex-1  rounded-2xl overflow-hidden px-3 drop-shadow-3xl bg-gray-200/95 mt-4"
        key={i}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DetailNews', {newsId: data[i].id});
          }}
        >
          <Image
            source={{uri: data[i].mainImg}}
            className="w-full h-32 object-cover m-auto mt-2"
          />
          <Text className="text-lg m-auto" numberOfLines={3}>
            {data[i].title}
          </Text>
        </TouchableOpacity>
      </View>,
    );
  }

  return (
    <View>
      <View className="rounded-2xl mt-1 overflow-hidden ">
        <View className="bg-red-600 h-12 justify-center">
          <Text className="text-2xl font-bold text-white mx-2">
            {category.nameCate}
          </Text>
        </View>

        <View className="flex-col">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailNews', {newsId: data[0].id});
            }}
          >
            <View className="columns-12 ">
              <Image
                source={{uri: data[0].mainImg}}
                className="w-full h-80 object-cover rounded"
              />
              <View className="px-2">
                <Text className="text-xl font-bold px-1.5" numberOfLines={2}>
                  {data[0].title}
                </Text>
                <View
                  style={{
                    borderRadius: 5,
                    alignSelf: 'flex-start',
                    borderColor: '#C0C0C0',
                    borderWidth: 1,
                  }}
                >
                  <Text className="opacity-50 p-1.5 " style={{fontSize: 12}}>
                    Nguồn{' '}
                    {data[0].src.startsWith('https://www.')
                      ? data[0].src.replace(/^https:\/\/www\.|\/$/g, '')
                      : data[0].src
                          .replace(/^https:\/\//, '')
                          .replace(/\/$/, '')}
                  </Text>
                </View>
              </View>

              <View className="m-2 p-2 bg-gray-200">
                <Text className="text-xl font-bold " numberOfLines={4}>
                  {data[0].shortDes}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View>
            <View className="flex flex-row">{item1}</View>
            <View className="flex flex-row">{item2}</View>
          </View>
        </View>

        <View className="w-full flex-row align-middle justify-center mt-3">
          <TouchableOpacity
            className="bg-red-500 h-10 justify-center w-36 rounded-3xl mt-2.5"
            onPress={ChangeScreen}
          >
            <Text className="font-bold text-sm text-white text-center">
              Xem thêm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default GroupNewsCategory;
