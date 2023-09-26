import {
  View,
  StyleSheet,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  BannerAd,
  TestIds,
  InterstitialAd,
  BannerAdSize,
  AdEventType,
} from 'react-native-google-mobile-ads';
import Video from 'react-native-video';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from '../Config/Axios';
import {products, category, BaseUrl, AdsAndroidKeyBanner, AdsAndroidKeyVideo} from '../Config';

function VideoNewsScreen() {
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

  useEffect(() => {
    //create ads
    const appOpenAd = InterstitialAd.createForAdRequest(AdsAndroidKeyVideo, {
      requestNonPersonalizedAdsOnly: true,
    });
    //load ads
    appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
      appOpenAd.show()
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
      setLoading(false);
      
    });
  }, []);

  return (
    <ScrollView>
      <View className="pt-2 flex-row justify-center">
        <BannerAd size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} unitId={AdsAndroidKeyBanner} />
      </View>
      {news.map((item, index) => {
        if (item.videoPath != 'https://devtest.ink') {
          return (
            <View key={index}>
              <View
                className="flex-col"
                style={[styles.card, styles.shadowProp]}
                key={index}
              >
                <Video
                  className="w-full h-64"
                  source={{uri: item.videoPath}}
                  ref={ref => {
                    this.player = ref;
                  }}
                  onBuffer={this.onBuffer}
                  onError={this.videoError}
                  controls={true}
                  paused={false}
                />

                <View>
                  <Text className="text-2xl text-center" style={styles.heading}>
                    {item.title}
                  </Text>
                </View>
              </View>
              <View className="py-2 flex-row justify-center">
                <BannerAd
                  size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                  unitId={AdsAndroidKeyBanner}
                />
              </View>
            </View>
          );
        }
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '100%',
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
export default VideoNewsScreen;
