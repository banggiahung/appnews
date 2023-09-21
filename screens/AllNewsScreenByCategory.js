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
import {AdsAndroidKeyBanner, AdsAndroidKeyVideo} from "../Config"

function AllNewsScreenByCategory() {
  const route = useRoute();
  const [items, setItems] = useState([]);
  const categoryId = route.params.categoryId;
  useEffect(() => {
    //create ads
    const appOpenAd = InterstitialAd.createForAdRequest(AdsAndroidKeyVideo, {
      requestNonPersonalizedAdsOnly: true,
    });
    //load ads
    appOpenAd.load();
    appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
      appOpenAd.show();
    });

    axios.get(`/api/v1/Items/KeyCategory/${categoryId}`).then(data => {
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
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                unitId={AdsAndroidKeyBanner}
              />
              <BannerAd
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                unitId={AdsAndroidKeyBanner}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

export default AllNewsScreenByCategory;
