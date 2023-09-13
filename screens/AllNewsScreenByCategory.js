import React, {Component, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import ItemNewsCategory from "../components/ItemNewsCategory";
import axios from "../Config/Axios";
import {useRoute} from "@react-navigation/native";

function AllNewsScreenByCategory() {
    const route = useRoute();
    const[items, setItems] = useState([])
    const categoryId = route.params.categoryId;
    useEffect(()=>{
        axios.get(`/api/v1/Items/KeyCategory/${categoryId}`)
            .then(data=>{
                setItems(data.productsInCategory)
            })
    }, [categoryId])
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
