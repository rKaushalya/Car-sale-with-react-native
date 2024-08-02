import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoadCars from '../screens/LoadCars';
import SaveCarScreen from '../screens/SaveCarScreen';
import Account from '../screens/Account';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function BottomNavigationScreen(props) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Save') {
                        iconName = 'car';
                    } else if (route.name === 'Account') {
                        iconName = 'account';
                    }

                    return (
                        <MaterialCommunityIcons
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    );
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={LoadCars}
                options={{
                    tabBarLabel: 'Home',
                }}
            />
            <Tab.Screen
                name="Save"
                component={SaveCarScreen}
                options={{
                    tabBarLabel: 'Add Car',
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarLabel: 'Account',
                }}
            />
        </Tab.Navigator>
    );
}
