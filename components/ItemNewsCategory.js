import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ImgTestPath} from "../Config/ImgTestPath";
import {useNavigation} from "@react-navigation/native";

function ItemNewsCategory({data}) {
    if(data.mainImg == null){
        data.mainImg = "https://i1-vnexpress.vnecdn.net/2023/09/06/5072937599714c2f1560-169398398-7818-8802-1693984415.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=BmqGixalJBBwPhydFY9xYQ"
    }
    const navigation = useNavigation();
    const ChangeScreen = ()=>{
        navigation.navigate("DetailNews", {newsId: data.id})
    }
    return (
        <TouchableOpacity onPress={ChangeScreen} className="my-0.5">
            <View className="w-full flex-row h-36 p-1 shadow-amber-100">
                <View className="w-2/3 h-full px-2 relative">
                    <Text className="text-lg font-bold mt-0.5">{data.title}</Text>
                    <Text className="text-sm opacity-50 absolute bottom-0">Nguồn {data.src}</Text>
                </View>
                <View className="w-1/3 h-full">
                    <Image className="w-full h-full rounded" source={{uri:data.mainImg}} />
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default ItemNewsCategory;
