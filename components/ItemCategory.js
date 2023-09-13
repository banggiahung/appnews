import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {setSelectedCategory, getSelectedCategory} from "../slices/SelectedCategorySlice";

function ItemCategory({data}) {
    let categorySelected = useSelector(getSelectedCategory);
    const dispatch = useDispatch()
    const ChangeCategory = ()=>{
        dispatch(setSelectedCategory(data.id))
    }

    if (categorySelected === data.id) {
        return (
            <TouchableOpacity className="p-1 justify-center w-fit" onPress={ChangeCategory}>
                <Text className="text-lg text-red-600">{data.nameCate}</Text>
                <View className="w-full bg-red-500 h-0.5"></View>
            </TouchableOpacity>
        );
    }
    return (
        <TouchableOpacity className="p-1 justify-center w-fit" onPress={ChangeCategory}>
            <Text className="text-lg">{data.nameCate}</Text>
        </TouchableOpacity>
    );
}

export default ItemCategory;
