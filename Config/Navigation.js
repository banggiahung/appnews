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
  const [cate, setCate] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const response = await axios.get('/api/v1/Items/GetAllCategoryMobile');
        list = response.category || [];
      } catch (error) {
        console.log(error); 
        list = []
      }
      setCate(list);
      setLoading(false);
    };
    fetchData();
  }, []);
 
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
                        uri: 'https://tintuc.devtest.ink/upload/video_icon.png',
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
        
        
        {cate.map((category, index) => {
  try {
    if (category && category.id && category.nameCate) {
      return (
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
      );
    }
    // Trả về null nếu dữ liệu không hợp lệ
    return null;
  } catch (error) {
    console.error("Error in cate.map:", error);
  }
})}
        <Drawer.Screen
          name="DetailNews"
          component={NewsDetailScreen}
          options={{
            headerStyle: {backgroundColor: ColorCustom.headerColor},
            headerTintColor: 'white',
            headerTitle: 'Chi tiết tin tức',
          
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
