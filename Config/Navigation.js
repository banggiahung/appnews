import 'react-native-gesture-handler';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import AllNewsScreenByCategory from '../screens/AllNewsScreenByCategory';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import {ColorCustom} from './index.js';
import {useSelector} from 'react-redux';
import {getTitle} from '../slices/HeaderTitleSlice';
import VideoNewsScreen from '../screens/VideoNewsScreen';
import {Button, Image, TouchableOpacity, View} from 'react-native';
import {AddCate, EmptyCate, getCate} from '../slices/CategorySlice';

import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function Navigation() {
  let title = useSelector(getTitle);
  let cate = useSelector(getCate);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            headerTitle: 'Home',
            headerRight: () => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      marginLeft: 4,
                      paddingLeft: 8,
                      borderLeftWidth: 1,
                      borderLeftColor: 'white',
                    }}
                    onPress={() => navigation.navigate('VideoNewsScreen')}>
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
        {cate.map((category, index) => (
          <Drawer.Screen
            key={index}
            name={category.nameCate}
            component={AllNewsScreenByCategory}
            initialParams={{categoryId: category.id}}
            options={{
              headerStyle: {backgroundColor: ColorCustom.headerColor},
              headerTintColor: 'white',
              headerTitle: category.nameCate,
            }}
          />
        ))}
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
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
