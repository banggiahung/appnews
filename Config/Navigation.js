import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {lazy, useEffect, useState} from 'react';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import {category, ColorCustom} from './index.js';
import {useSelector} from 'react-redux';
import {getTitle} from '../slices/HeaderTitleSlice';
import VideoNewsScreen from '../screens/VideoNewsScreen';
import AllNewsScreenByCategory from '../screens/AllNewsScreenByCategory';
import HomeScreen from '../screens/HomeScreen';
import axios from './Axios';

const Drawer = createDrawerNavigator();

function Navigation() {
  let title = useSelector(getTitle);
  const getCategoryData = () => {

    return axios.get("/api/v1/Items/GetAllCategoryMobile")
    
        .then((data) => {
    let list = [];

          console.log("data",data)
            let count = data.category;
            for (let i = 0; i < count; i++) {
                list.push(data.category[i]);
            }
            return list;
        })
        .catch((err) => {
            let list = [];
            for (let i = 0; i < 3; i++) {
                list.push(category[i]);
            }
            return list;
        });
}

let cate = [...getCategoryData()];
console.log("cate", cate);
 
  let [loading, setLoading] = useState(false);
  // let [cate, setCate] = useState([]);

  // useEffect(() => {
  //   Promise.all([getCategoryData()]).then(data => {
  //     console.log(data);
  //     cate = setCate(data[0]);
  //     setLoading(false);
  //   });
  // }, []);

  if (loading) {
    return (
      <View className="w-full h-screen flex flex-row justify-center items-center">
        <View className="h-fit">
          <Image source={require('../assets/animation/loader.gif')} />
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            headerTitle: 'Trang chủ',
            drawerLabel: 'Trang chủ',
            headerRight: () => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      marginLeft: 4,
                      paddingLeft: 8,
                      borderLeftWidth: 1,
                      borderLeftColor: 'white',
                    }}
                    onPress={() => navigation.navigate('VideoNewsScreen')}
                  >
                    <Image
                      className="w-10 h-10 mr-4"
                      source={{
                        uri: 'https://devtest.ink/upload/video_icon.png',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            },
            headerStyle: {
              backgroundColor: ColorCustom.headerColor,
            },
          })}
        />
        
        
        {/* {cate.map((category, index) => (
          <Drawer.Screen
            key={category.id}
            name={category.nameCate}
            component={AllNewsScreenByCategory}
            initialParams={{categoryId: category.id}}
            options={{
              headerStyle: {backgroundColor: ColorCustom.headerColor},
              headerTintColor: 'white',
              headerTitle: category.nameCate,
            }}
          />
        ))} */}
        <Drawer.Screen
          name="DetailNews"
          component={NewsDetailScreen}
          options={{
            headerStyle: {backgroundColor: ColorCustom.headerColor},
            headerTintColor: 'white',
            headerTitle: '',
          
            drawerLabel: '',
          }}
        />
        <Drawer.Screen
          name="VideoNewsScreen"
          component={VideoNewsScreen}
          options={{
            headerStyle: {backgroundColor: ColorCustom.headerColor},
            headerTintColor: 'white',
            headerTitle: 'Video',
      
            drawerLabel: '',
          }}
        />
        <Drawer.Screen
          name="AllNewsScreenByCategory"
          component={AllNewsScreenByCategory}
          options={{
            headerStyle: {backgroundColor: ColorCustom.headerColor},
            headerTintColor: 'white',
             headerTitle: title,
            drawerLabel: '',
          }}
        />


      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
