import React, {Component, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
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
import {AdsAndroidKey} from "../Config"

function AllNewsScreenByCategory() {
  const route = useRoute();
  const [items, setItems] = useState([]);
  const categoryId = route.params.categoryId;
  useEffect(() => {
    //create ads
    const appOpenAd = InterstitialAd.createForAdRequest(AdsAndroidKey, {
      requestNonPersonalizedAdsOnly: true,
    });
    //load ads
    appOpenAd.load();
    appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
      appOpenAd.show();
    });

    axios.get(`/api/v1/Items/KeyCategory/${categoryId}`).then(data => {
      appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
        setItems(data.productsInCategory);
      });
      setItems(data.productsInCategory);
    });
  }, [categoryId]);

  return (
    <ScrollView>
      <ScrollView>
        {items.map((item, index) => (
          <View key={index}>
            <ItemNewsCategory data={item} />
            <View className="pt-2 flex flex-col">
              <BannerAd
                size={BannerAdSize.FULL_BANNER}
                unitId={AdsAndroidKey}
              />
              <BannerAd
                size={BannerAdSize.FULL_BANNER}
                unitId={AdsAndroidKey}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

export default AllNewsScreenByCategory;
