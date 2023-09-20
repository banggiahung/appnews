import React, {Component, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import ItemNewsCategory from '../components/ItemNewsCategory';
import axios from '../Config/Axios';
import {useRoute} from '@react-navigation/native';
import {TestIds, InterstitialAd, AdEventType} from 'react-native-google-mobile-ads'

function AllNewsScreenByCategory() {
  const route = useRoute();
  const [items, setItems] = useState([]);
  const categoryId = route.params.categoryId;
  useEffect(() => {
    //create ads
    const appOpenAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
      requestNonPersonalizedAdsOnly: true,
    });

    appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
        appOpenAd.show();
      });

    axios.get(`/api/v1/Items/KeyCategory/${categoryId}`).then(data => {
      //load ads
      
      appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
        setItems(data.productsInCategory);
      });
      
    });
    appOpenAd.load();
  }, [categoryId]);

  return (
    <ScrollView>
      <ScrollView>
        {items.map((item, index) => (
          <ItemNewsCategory key={index} data={item} />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

export default AllNewsScreenByCategory;
