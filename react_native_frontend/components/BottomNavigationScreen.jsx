import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoadCars from '../screens/LoadCars';
import SaveCarScreen from '../screens/SaveCarScreen';
import Account from '../screens/Account';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export default function BottomNavigationScreen(props) {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                // tabBarIcon: ({ focused, color, size }) => {
                //     let iconName;
                //
                //     if (route.name === 'Home') {
                //         iconName = focused ? 'home' : 'home-outline';
                //     } else if (route.name === 'Account') {
                //         iconName = focused ? 'person' : 'person-outline';
                //     } else if (route.name === 'Save') {
                //         iconName = focused ? 'car' : 'car-outline';
                //     }
                //
                //     console.log(iconName,size,color);
                //     return <Ionicons name={iconName} size={size} color={color} />;
                // },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
                name="Home" component={LoadCars} />
            <Tab.Screen name="Save" component={SaveCarScreen} />
            <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
    )
}
