import {View, Text, Image} from 'react-native'
import {Tabs, Redirect} from 'expo-router'
import React from 'react'

import {icons} from '../../constants';

const TabIcon = ({icon, color, name, focused} ) => {
    return (
        <View className="justify-center items-center gap-2">
            <Image
                source={icon}
                resizeMode="contain" // This props makes it contained
                tintColor={color}
                className="w-6 h-6"
            />
            <Text className={`${focused ? 'font-psemibold' : `font-pregular`}`} style={{color: color}}>
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
<>
    <Tabs
        screenOptions={{
            tabBarShowLabel:false,
            tabBarActiveTintColor: '#FFA001',
            tabBarInactiveColor: "#CDCDE0",
            tabBarStyle: {
                backgroundColor: '#161622',
                borderTopWidth: 1,
                borderTopColor: '#232533',
                height: 100,
            },
        }}
        options={{headerShown: false}}
        >
        <Tabs.Screen 
            name="home"
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                    icon={icons.home}
                    color={color}
                    name={'Home'}
                    focused={focused}
                    />
                ) 
            }}
        />
                         <Tabs.Screen 
            name="bookmarks"
            options={{
                title: 'Bookmarks',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                    icon={icons.bookmark}
                    color={color}
                    name={'Bookmarks'}
                    focused={focused}
                    />
                ) 
            }}
        />
                 <Tabs.Screen 
            name="create"
            options={{
                title: 'Create',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                    icon={icons.plus}
                    color={color}
                    name={'Create'}
                    focused={focused}
                    />
                ) 
            }}
        />
             <Tabs.Screen 
            name="profile"
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                    icon={icons.profile}
                    color={color}
                    name={'Profile'}
                    focused={focused}
                    />
                ) 
            }}
        />
    </Tabs>
</>
  )
}

export default TabsLayout