import React, {Component, useEffect, useState} from 'react';
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
  RefreshControl, Animated, Easing,
} from "react-native";
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
import {AdsAndroidKeyBanner, AdsAndroidKeyVideo} from '../Config';

function AllNewsScreenByCategory() {
  const route = useRoute();
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rotation] = useState(new Animated.Value(0))
  const rotateImage = () => {
    Animated.timing(rotation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      rotation.setValue(0); // Reset giá trị về 0 để tạo hiệu ứng xoay liên tục
      rotateImage(); // Gọi lại hàm rotateImage
    });
  };
  //load thêm
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [noDataMessage, setNoDataMessage] = useState('');
  const categoryId = route.params.categoryId;
  //create ads
  const appOpenAd = InterstitialAd.createForAdRequest(AdsAndroidKeyVideo, {
    requestNonPersonalizedAdsOnly: true,
  });
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setPageNumber(1);
    setHasMoreData(true);

    axios
      .get(`/api/v1/Items/KeyCategoryWithLoad/${categoryId}/1`)
      .then(data => {
        setItems(data.productsInCategory);
        setRefreshing(false);
      });
  }, [categoryId]);

  const loadMoreData = () => {
    if (!hasMoreData) return;

    axios
      .get(`/api/v1/Items/KeyCategoryWithLoad/${categoryId}/${pageNumber + 1}`)
      .then(data => {
        const newItems = data.productsInCategory;
        if (newItems.length > 0) {
          setItems([...items, ...newItems]);
          setPageNumber(pageNumber + 1);
          setLoading(false);
        } else {
          setHasMoreData(false);

          setNoDataMessage('Không còn dữ liệu để hiển thị.');
        }
      });
  };
  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

    if (offsetY + scrollViewHeight >= contentHeight - 10) {
      loadMoreData();
    }
  };
  useEffect(() => {

    axios
      .get(`/api/v1/Items/KeyCategoryWithLoad/${categoryId}/1`)
      .then(data => {
        const newItems = data.productsInCategory;
        if (newItems.length === 0) {
          setNoDataMessage('Không có dữ liệu để hiển thị.');
        } else {
          setNoDataMessage('');
        }

        setItems(newItems);
      });
  }, [categoryId]);

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <ScrollView>
          <View className="flex flex-row justify-center">
            <BannerAd
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              unitId={AdsAndroidKeyBanner}
            />
          </View>
          {items.length === 0 && <Text>{noDataMessage}</Text>}
          {items.map((item, index) => (
            <View key={index}>
              <ItemNewsCategory data={item}/>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    );

}

export default AllNewsScreenByCategory;
