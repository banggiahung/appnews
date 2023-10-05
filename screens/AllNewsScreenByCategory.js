import React, {Component, useEffect, useState} from 'react';
import {ScrollView, Text, View, RefreshControl} from 'react-native';
import ItemNewsCategory from '../components/ItemNewsCategory';
import axios from '../Config/Axios';
import {useRoute} from '@react-navigation/native';
import {
  TestIds,
  InterstitialAd,
  AdEventType,
  BannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
import {AdsAndroidKeyBanner, AdsAndroidKeyVideo} from "../Config"

function AllNewsScreenByCategory() {
  const route = useRoute();
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false)
  const categoryId = route.params.categoryId;
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios.get(`/api/v1/Items/KeyCategory/${categoryId}`).then(data => {
      setItems(data.productsInCategory);
      setRefreshing(false);
    });
  }, []);


  useEffect(() => {
    axios.get(`/api/v1/Items/KeyCategory/${categoryId}`).then(data => {
      setItems(data.productsInCategory);
    });
  }, [categoryId]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <ScrollView>
        <View className="flex flex-row justify-center">
          <BannerAd
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            unitId={AdsAndroidKeyBanner}
          />
        </View>
        {items.map((item, index) => (
          <View key={index}>
            <ItemNewsCategory data={item} />
          </View>
        ))}
        <View className="flex flex-row justify-center">
          <BannerAd
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            unitId={AdsAndroidKeyBanner}
          />
        </View>
      </ScrollView>
    </ScrollView>
  );
}

export default AllNewsScreenByCategory;
