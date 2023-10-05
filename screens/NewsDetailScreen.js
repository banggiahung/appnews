import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  BannerAd,
  TestIds,
  InterstitialAd,
  AdEventType,
  BannerAdSize,
} from "react-native-google-mobile-ads";
import { useRoute } from "@react-navigation/native";
import axios from "../Config/Axios";
import { BaseUrl, AdsAndroidKeyBanner, AdsAndroidKeyVideo } from "../Config";
import HTML from "react-native-render-html";
import ItemMoreBellow from "../components/ItemMoreBellow";

function NewsDetailScreen() {
  const openWebPage = url => {
    console.log("url", url);
    if (url) {
      Linking.openURL(url);
    }
  };
  const openWebPage2 = url => {
    console.log("url", url);
    if (url) {
      Linking.openURL(url);
    }
  };
  const scrollViewRef = useRef(null);
  const { width } = useWindowDimensions();
  const route = useRoute();
  const newsId = route.params.newsId;
  const [title, setTitle] = useState();
  const [srcMain, setSrcMain] = useState();
  const [contentDetails, setContentDetails] = useState();
  const [src, setSrc] = useState();
  const [srcClick, setSrcCLick] = useState();
  const [srcUrlOpenWeb, setSrcUrlOpenWeb] = useState("https://www.google.com/");
  const [mainImg, setMainImg] = useState();
  const [des, setDes] = useState("");
  const [date, setDate] = useState("");
  const [showMore, setShowMore] = useState(false);
  // const partialDes = des.substring(0, Math.floor(des.length / 2));
  // const displayDes = showMore ? des : partialDes;
  const [news, setNews] = useState([]);
  const getRandomElementsFromArray = (array, numberOfElements) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numberOfElements);
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes} ${day}-${month}-${year}`;
  };


  const getProductData = async () => {
    return axios
      .get("/api/v1/Items/KeyProductLastest")
      .then(data => {
        const allProducts = data.products;
        const allProductsFiltered = allProducts.filter(
          product => product.id !== newsId,
        );
        // Lấy 4 bài viết ngẫu nhiên
        setNews(allProductsFiltered);
        return allProducts;
      })
      .catch(err => {
        setLoading(false);
        const fallbackData = products.slice(0, 21);
        const randomNews = getRandomElementsFromArray(fallbackData, 4);
        setNews(randomNews);
        return fallbackData;
      });
  };
  const screenWidth = Dimensions.get("window").width;
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

    axios.get(`/api/v1/Items/KeyProducts/${newsId}`).then(data => {
      setTitle(data.newsData.title);
      setMainImg(data.newsData.mainImg);
      setContentDetails(data.newsData.contentDetails);
      setDes(data.newsData.description);
      setDate(formatDate(data.newsData.createDate));
      setSrc(
        `Nguồn ${
          data.newsData.src.startsWith("https://www.")
            ? data.newsData.src.replace(/^https:\/\/www\.|\/$/g, "")
            : data.newsData.src.replace(/^https:\/\//, "").replace(/\/$/, "")
        }`,
      );
      if (data.newsData.srcMain != null) {
        setSrcMain(
          `Nguồn ${
            data.newsData.srcMain.startsWith("https://www.")
              ? data.newsData.srcMain.replace(/^https:\/\/www\.|\/$/g, "")
              : data.newsData.srcMain
                .replace(/^https:\/\//, "")
                .replace(/\/$/, "")
          }`,
        );
      } else {
        setSrcMain("Chưa có nguồn");
      }

      setSrcUrlOpenWeb(data.newsData.src);
      setSrcCLick(data.newsData.srcMain);
    });
    getProductData();
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, [newsId]);

  return (
    <ScrollView ref={scrollViewRef}>
      <View className="flex-1 mt-3 mx-2">
        <Text className="break-words text-3xl font-bold text-black">
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            justifyContent: "flex-start",
          }}
        >
          <Text style={{ opacity: 0.5 }}>{date} - </Text>
          <Text style={{ opacity: 0.5 }}>{src} / </Text>
          <TouchableOpacity onPress={() => openWebPage(srcUrlOpenWeb)}>
            <Text style={{ color: "blue", textDecorationLine: "underline" }}>
              Xem trang gốc
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            className="w-full h-72 object-contain"
            source={{ uri: `${BaseUrl}${mainImg}` }}
          />
        </View>
        <HTML
          source={{ html: des }}
          contentWidth={width}
          tagsStyles={{ p: { color: "black" }, span: { color: "black" } }}
        />
        {/*<TouchableOpacity*/}
        {/*  onPress={() => {*/}
        {/*    setShowMore(!showMore);*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Text style={{ color: "black", fontSize: 18 }}>*/}
        {/*    {showMore ? "Thu gọn" : "Đọc tiếp..."}*/}
        {/*  </Text>*/}
        {/*</TouchableOpacity>*/}
        <View className="flex-row mt-2">
          <Text
            style={{ color: "black" }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            *{srcMain} /
          </Text>
          <TouchableOpacity onPress={() => openWebPage2(srcClick)}>
            <Text style={{ color: "blue", textDecorationLine: "underline" }}>
              Nguồn dẫn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row align-middle mt-6">
        <Image

          className="w-6 h-6 mr-2 ml-1"
          source={{
            uri: "https://tintuc.devtest.ink/upload/sao.png",
          }}
        />
        <Text style={{ color: "#BB0000", fontSize: 18, fontWeight: "500" }}>
          Lời hay ý đẹp
        </Text>
      </View>
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Image
          style={{ width: screenWidth, borderRadius: 12, aspectRatio: 1 }}
          resizeMode="stretch"
          source={{
            uri:
              contentDetails != null
                ? `${BaseUrl}${contentDetails}`
                : "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/03/tong-hop-nhung-cau-noi-hay-nhat-ve-cuoc-song.jpg",
          }}
        />
      </View>

      <View className="flex-row align-middle mt-6">
        <Image
          className="w-6 h-6 mr-2 ml-1"
          source={{
            uri: "https://tintuc.devtest.ink/upload/sao.png",
          }}
        />
        <Text style={{ color: "#BB0000", fontSize: 18, fontWeight: "500" }}>
          Bài viết xem nhiều:
        </Text>
      </View>

      {news.map((dataMore, index) => (
        <View key={index}>
          <ItemMoreBellow dataMore={dataMore} />

        </View>
      ))}

      <View
        className="h-fit mr-2 ml-2"
        style={{
          borderRadius: 12,
          borderColor: "#C0C0C0",
          borderWidth: 1,
          marginTop: 12,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
      </View>
    </ScrollView>
  );
}

export default NewsDetailScreen;
