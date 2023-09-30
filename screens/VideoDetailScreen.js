import React, { Component } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import RenderHTML from "react-native-render-html";
import {
  BannerAd,
  TestIds,
  InterstitialAd,
  BannerAdSize,
  AdEventType,
} from "react-native-google-mobile-ads";
import Video from "react-native-video";
import axios from "../Config/Axios";
import { products, category, BaseUrl, AdsAndroidKeyBanner, AdsAndroidKeyVideo } from "../Config";

function VideoDetailScreen() {
  const VideoId = useRoute().params.videoId;
  let video = `https://tintuc.devtest.ink/upload/admin.mp4`;
  console.log(VideoId);
  return (
    <ScrollView className="bg-black">
      <View className="flex flex-row justify-items-center px-1">
        <Video
          className="w-screen h-72"
          source={{ uri: video }}
          controls={true}
          paused={false}
        />
      </View>
      <View className="py-2 flex-row justify-center py-1 bg-rose-400">
        <BannerAd size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} unitId={AdsAndroidKeyBanner} />
      </View>
      <View className="px-1.5">
        <Text className="text-white text-lg">Bắt tại trận đối tượng cướp giật ở ngã 4</Text>
        <View className="flex flex-row">
          <Text className="opacity-75 text-white border-2 border-cyan-50 rounded-xl p-1">Nguồn: baomoi.com</Text>
        </View>
        <Text className="text-white pt-2">asdadakdfhafahdkaghajdhgahgajhas,nádadasdlasdjaldadlad</Text>
      </View>
    </ScrollView>
  );
}


export default VideoDetailScreen;
