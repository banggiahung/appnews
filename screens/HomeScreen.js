import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  StyleSheet,
  Button,
  RefreshControl
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from '../Config/Axios';
import {products, category, BaseUrl, AdsAndroidKeyVideo, AdsAndroidKeyBanner} from '../Config';
import Axios from '../Config/Axios';
import {useNavigation} from '@react-navigation/native';
import GroupNewsCategory from '../components/GroupNewsCategory';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
  BannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
import messaging from "@react-native-firebase/messaging";
import { Notifications } from 'react-native-notifications';
import { createLocalNotification } from "../Config/Notifications";

function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);
  const [news, setNews] = useState([]);
  const navigation = useNavigation();

  const getRandomElementsFromArray = (array, numberOfElements) => {
    if (numberOfElements > array.length) {
      return [];
    }
    const copyArray = [...array];
    const randomElements = [];
    for (let i = 0; i < numberOfElements; i++) {
      const randomIndex = Math.floor(Math.random() * copyArray.length);
      randomElements.push(copyArray.splice(randomIndex, 1)[0]);
    }
    return randomElements;
  };

  const getCategoryData = () => {
    return axios
      .get('/api/v1/Items/GetAllCategoryMobile')
      .then(data => {
        let count = data.category.length;
        for (let i = 0; i < count; i++) {
          list.push(data.category[i]);
        }
        return list;
      })
      .catch(err => {
        let list = [];
        for (let i = 0; i < 3; i++) {
          list.push(category[i]);
        }
        return list;
      });
  };

  const getProductData = () => {
    return axios
      .get('/api/v1/Items/GetAllProductMobie')
      .then(data => {
        let count = data.products.length;
        let list = [];
        for (let i = 0; i < count; i++) {
          list.push(data.products[i]);
        }
        return list;
      })
      .catch(err => {
        setLoading(false);
        let list = [];
        for (let i = 0; i < 21; i++) {
          list.push(products[i]);
        }
        return list;
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Promise.all([getCategoryData(), getProductData()]).then(results => {
      const [categoryData, productData] = results;
      let temp = [];
      for (let i = 0; i < categoryData.length; i++) {
        let cate = categoryData[i];
        let news = productData
          .filter(k => k.cateID.includes(cate.id))
          .splice(0, 5);
        temp.push({cate, news});
      }
      setNewsData(temp);
      setNews(productData);

      setRefreshing(false);

    });
  }, []);

  useEffect(() => {

    //create ads
    const appOpenAd = InterstitialAd.createForAdRequest(AdsAndroidKeyVideo, {
      requestNonPersonalizedAdsOnly: true,
    });
    Promise.all([getCategoryData(), getProductData()]).then(results => {
      const [categoryData, productData] = results;
      let temp = [];
      for (let i = 0; i < categoryData.length; i++) {
        let cate = categoryData[i];
        let news = productData
          .filter(k => k.cateID.includes(cate.id))
          .splice(0, 5);
        temp.push({cate, news});
      }
      setNewsData(temp);
      setNews(productData);

      //load ads
      appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
        //appOpenAd.show()
      });
      setLoading(false);
      appOpenAd.load();
    });

  }, []);

  if (loading) {
    return (
      <View className="w-full h-screen flex-1 p-20 align-middle justify-center">
        <View className=""></View>
      </View>
    );
  } else {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View className="pt-2 flex flex-row justify-center ">
          <BannerAd size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} unitId={AdsAndroidKeyBanner} />
        </View>
        {newsData.map((item, index) => {
          if (index % 3 === 1) {
            return (
              <View className="flex-col" key={index}>
                {getRandomElementsFromArray(news, 5).map((is, k) => {
                  return (
                    <View className="w-full px-3 my-2" key={k}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('DetailNews', {newsId: is.id});
                        }}
                      >
                        <Text className="px-3 opacity-75">• {is.title}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
                <GroupNewsCategory
                  category={item.cate}
                  data={item.news}
                  key={index}
                />
              </View>
            );
          } else {
            return (
              <GroupNewsCategory
                category={item.cate}
                data={item.news}
                key={index}
              />
            );
          }
        })}
      </ScrollView>
    );
  }
}

export default HomeScreen;
