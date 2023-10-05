import {
  View,
  StyleSheet,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl
} from "react-native";
import {
  BannerAd,
  TestIds,
  InterstitialAd,
  BannerAdSize,
  AdEventType,
} from "react-native-google-mobile-ads";
import Video from "react-native-video";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "../Config/Axios";
import {
  products,
  category,
  BaseUrl,
  AdsAndroidKeyBanner,
  AdsAndroidKeyVideo,
} from "../Config";

function VideoNewsScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);
  const [news, setNews] = useState([]);
  const navigation = useNavigation();
  //create ads
  const appOpenAd = InterstitialAd.createForAdRequest(AdsAndroidKeyVideo, {
    requestNonPersonalizedAdsOnly: true,
  });

  const getCategoryData = () => {
    return axios
      .get("/api/v1/Items/GetAllCategoryMobile")
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
      .get("/api/v1/Items/GetAllVideoMobie")
      .then(data => {
        let count = data.video.length;
        let list = [];
        for (let i = 0; i < count; i++) {
          list.push(data.video[i]);
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
      setNews(productData);
      setRefreshing(false);
    })
  }, []);


  useEffect(() => {
    Promise.all([getCategoryData(), getProductData()]).then(results => {
      const [categoryData, productData] = results;
      console.log(productData);
      setNews(productData);
      setLoading(false);
    });
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View className="pt-2 flex-row justify-center">
        <BannerAd
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          unitId={AdsAndroidKeyBanner}
        />
      </View>
      {news.map((item, index) => {
        return (
          <View key={index} className="">
            <TouchableOpacity
              className="flex-col"
              style={[styles.card, styles.shadowProp]}
              onPress={() => {
                appOpenAd.load()
                appOpenAd.addAdEventListener(AdEventType.LOADED, ()=>{
                  appOpenAd.show();
                  navigation.navigate("VideoDetailScreen", { videoId: item.id });
                })
              }}
            >
              <Image className="w-full h-60 relative" source={{ uri: item.mainPathImg }} />
              <View
                style={{
                  position: "absolute",
                  top: "30%",
                  left: "45%",
                  transform: [{ translateX: -15 }, { translateY: -15 }],
                  zIndex: 2,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/SystemImg/play_video.png")}
                    style={{ width: 100, height: 100 }}
                  />
                </View>
              </View>
              <View>
                <Text className="text-2xl text-center" style={styles.heading}>
                  {item.titile}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
      <View className="py-2 flex-row justify-center">
        <BannerAd
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          unitId={AdsAndroidKeyBanner}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "100%",
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
export default VideoNewsScreen;
